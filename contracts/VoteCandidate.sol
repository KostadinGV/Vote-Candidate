// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "hardhat/console.sol";

contract VoteCandidate is Ownable {
    using SafeMath for uint256;

    struct Vote {
        uint256 participantCnt;
        mapping(uint256 => address) participant;
        mapping(address => address) voting;
        mapping(address => bool) isCandidate;
        mapping(address => uint256) voteCnt;
        address payable maxVoteAddr;
        uint256 endTime;
    }

    uint256 voteId;
    mapping(uint256 => Vote) votes;

    uint256 votePrice = 1e16;

    function addVoting(address[] memory _candidates)
        public
        onlyOwner
        returns (uint256)
    {
        require(_candidates.length > 0, "No candidates!");
        console.log("candidates %s", _candidates[0]);
        Vote storage v = votes[voteId++];
        for (uint256 i = 0; i < _candidates.length; i++) {
            v.isCandidate[_candidates[i]] = true;
        }

        v.endTime = block.timestamp + 5 seconds;
        console.log("add voting %s ending %s", voteId - 1, v.endTime);
        return voteId - 1;
    }

    function vote(uint256 _voteId, address payable _to) external payable {
        require(_voteId < voteId, "Vote not added yet!");
        require(_to != msg.sender, "Can't vote self");
        Vote storage v = votes[_voteId];
        console.log(
            "vote to %s, from %s to %s",
            _to,
            v.endTime,
            block.timestamp
        );
        require(v.endTime != 0, "Vote not started!");
        require(v.endTime >= block.timestamp, "Vote already finished!");
        require(v.voting[msg.sender] == address(0), "You already voted!");
        require(v.isCandidate[_to] == true, "Not a valid candiate!");
        require(msg.value >= votePrice, "Not enough funds!");

        console.log("msg.value %s, %s", msg.value, votePrice);

        v.participant[v.participantCnt++] = msg.sender;
        v.voting[msg.sender] = _to;
        v.voteCnt[_to]++;
        if (v.voteCnt[_to] > v.voteCnt[v.maxVoteAddr]) v.maxVoteAddr = _to;
    }

    function finish(uint256 _voteId) external {
        console.log("finish voting %s", _voteId);
        Vote storage v = votes[_voteId];
        require(v.endTime != 0, "Vote not started!");
        require(v.endTime <= block.timestamp, "Vote not finished yet!");

        v.maxVoteAddr.transfer(
            votePrice.mul(v.participantCnt).mul(90).div(100)
        );
    }

    function withdraw() external onlyOwner returns (uint256) {
        uint256 bal = address(this).balance;
        console.log("withdraw fund from contract %s", bal);
        payable(msg.sender).transfer(bal);
        return bal;
    }

    function participantCount(uint256 _voteId) external view returns (uint256) {
        return votes[_voteId].participantCnt;
    }

    function isCandidate(uint256 _voteId, address _addr)
        external
        view
        returns (bool)
    {
        return votes[_voteId].isCandidate[_addr] == true;
    }

    function voteCount(uint256 _voteId, address _candidate)
        external
        view
        returns (uint256)
    {
        return votes[_voteId].voteCnt[_candidate];
    }

    function voteInfo(uint256 _voteId, address _addr)
        external
        view
        returns (address)
    {
        return votes[_voteId].voting[_addr];
    }
}
