import { ethers } from "hardhat";

async function main() {
  const [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
  const vote = await ethers.getContractFactory("VoteCandidate");
  const voteContract = await vote.deploy();
  await voteContract.deployed();
  console.log("VoteCandidate deployed to:", voteContract.address);
  await voteContract.addVoting([addr1.address, addr2.address]);

  await voteContract.connect(addrs[0]).vote(addr1.address);
  await voteContract.connect(addrs[1]).vote(addr2.address);
  await voteContract.connect(addrs[2]).vote(addr2.address);
  await voteContract.connect(addrs[3]).vote(addr2.address);

  await new Promise(resolve => setTimeout(resolve, 5000));

  await voteContract.connect(addrs[5]).finish(0);
  await voteContract.withdraw();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
