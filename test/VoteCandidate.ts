import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";
import { experimentalAddHardhatNetworkMessageTraceHook } from "hardhat/config";

describe("Vote", () => {
    let Token: ContractFactory;
    let hardhatToken: Contract;
    let owner: SignerWithAddress;
    let addr1: SignerWithAddress;
    let addr2: SignerWithAddress;
    let addrs: SignerWithAddress[];

    beforeEach(async function () {
        Token = await ethers.getContractFactory("VoteCandidate");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        hardhatToken = await Token.deploy();
    });
    // describe("Full test", () => {
    //     it("Check reward to candidate", async function(){
            
    //         await hardhatContract.addVoting([addr1.address, addr2.address]);
    //         await hardhatContract.addVoting([addr2.address, addr3.address, addr4.address]);
            
    //         await hardhatContract.connect(addr3).vote(0, addr1.address,{value:ethers.utils.parseEther("0.01")});
    //         await hardhatContract.connect(addr4).vote(0, addr2.address,{value:ethers.utils.parseEther("0.01")});
    //         await hardhatContract.connect(addr5).vote(0, addr2.address,{value:ethers.utils.parseEther("0.01")});

    //         await hardhatContract.connect(addr4).vote(1, addr3.address,{value:ethers.utils.parseEther("0.01")});
    //         await hardhatContract.connect(addr5).vote(1, addr3.address,{value:ethers.utils.parseEther("0.01")});
    //         await new Promise(resolve => setTimeout(resolve, 5000));

    //         const addr2Balance = await addr2.getBalance();
    //         await hardhatContract.connect(addr5).finish(0);
    //         const rewardBal1 = (await addr2.getBalance()).sub(addr2Balance);

    //         const addr3Balance = await addr3.getBalance();
    //         await hardhatContract.finish(1);
    //         const rewardBal2 = (await addr3.getBalance()).sub(addr3Balance);

    //         const withdrawFund = (await hardhatContract.withdraw());
    //         // const t = ethers.utils.parseEther("0.01").mul(5).mul(10).div(100);
    //         // console.log("w:%s, %s",withdrawFund,t);

    //         expect(rewardBal1).to.equal(ethers.utils.parseEther("0.01").mul(3).mul(90).div(100));
    //         expect(rewardBal2).to.equal(ethers.utils.parseEther("0.01").mul(2).mul(90).div(100));
    //         // expect(withdrawFund).to.equal(t);
    //     });
    describe("addVoting", async () => {
        it ("should to candidate", async ()=>{
            await hardhatToken.addVoting([addr1.address]);
            expect (await hardhatToken.isCandidate(0,addr1.address)).to.eq(true);
            //expect(await hardhatToken.addVoting([addr1.address,addr2.address])).equal(1);
        });
        it ("should be more than one candidate", async ()=>{
            await expect(hardhatToken.addVoting([])).to.be.revertedWith(
                "No candidates!",
              );
        });
    });
    describe("vote", async () => {
        it ("should be added before", async () => {
            await expect(hardhatToken.vote(0,addr1.address)).to.be.revertedWith(
                "Vote not added yet!",
              );
        });
        it ("should send ether", async () => {
            await hardhatToken.addVoting([addr1.address]);
            await expect(hardhatToken.vote(0,addr1.address)).to.be.revertedWith("Not enough funds!");
        });
        it ("can't vote self", async () => {
            await hardhatToken.addVoting([addr1.address]);
            await expect(hardhatToken.vote(0,addr1.address,{value:ethers.utils.parseEther("0.01")})).to.be.revertedWith("Can't vote self!");
        });
        it ("should vote to valid candidate", async () => {
            await hardhatToken.addVoting([addr1.address]);
            await expect(hardhatToken.vote(0,addr2.address,{value:ethers.utils.parseEther("0.01")})).to.be.revertedWith("Not a valid candiate!");
        });
        it ("can't vote twice", async () => {
            await hardhatToken.addVoting([addr1.address]);
            await hardhatToken.vote(0,addr1.address,{value:ethers.utils.parseEther("0.01")});
            await expect(hardhatToken.vote(0,addr1.address,{value:ethers.utils.parseEther("0.01")})).to.be.revertedWith("You already voted!");
        });
    });
    describe("finish", async () => {
        it ("should be started before", async () => {
            await expect(hardhatToken.finish(0)).to.be.revertedWith("Vote not started!");
        });
        it ("should be finished", async () => {
            await hardhatToken.addVoting([addr1.address]);
            await expect(hardhatToken.finish(0)).to.be.revertedWith("Vote not finished yet!");
        });
        it ("should take right reward", async () => {
            await hardhatToken.addVoting([addr1.address, addr2.address]);
            
            await hardhatToken.connect(addrs[1]).vote(0, addr1.address,{value:ethers.utils.parseEther("0.01")});
            await hardhatToken.connect(addrs[2]).vote(0, addr2.address,{value:ethers.utils.parseEther("0.01")});
            await hardhatToken.connect(addrs[0]).vote(0, addr2.address,{value:ethers.utils.parseEther("0.01")});

            await new Promise(resolve => setTimeout(resolve, 5000));

            const addr2Balance = await addr2.getBalance();
            await hardhatToken.connect(addrs[1]).finish(0);
            expect(await addr2.getBalance()).to.eq(ethers.utils.parseEther("0.01").mul(3).mul(90).div(100).add(addr2Balance));
        });
    });
    describe("withdraw", async () => {
        it("should be owner", async () => {
            await expect(hardhatToken.connect(addr1).withdraw()).to.be.revertedWith("Ownable: caller is not the owner");
        });
        it ("should withdraw to owner", async () => {
            await hardhatToken.addVoting([addr1.address, addr2.address]);
            
            await hardhatToken.connect(addrs[1]).vote(0, addr1.address,{value:ethers.utils.parseEther("0.01")});
            await hardhatToken.connect(addrs[2]).vote(0, addr2.address,{value:ethers.utils.parseEther("0.01")});
            await hardhatToken.connect(addrs[0]).vote(0, addr2.address,{value:ethers.utils.parseEther("0.01")});

            await new Promise(resolve => setTimeout(resolve, 5000));
            await hardhatToken.withdraw();
        });
    });
    describe("participantCount", async () => {
        it("should return participant count", async () => {
            await hardhatToken.addVoting([addr1.address, addr2.address]);
            await hardhatToken.connect(addr2).vote(0, addr1.address,{value:ethers.utils.parseEther("0.01")});
            expect(await hardhatToken.connect(addr1).participantCount(0)).to.eq(1);
        });
    }); 
    describe("isCandidate", async () => {
        it("is candidate", async () => {
            await hardhatToken.addVoting([addr1.address, addr2.address]);
            expect(await hardhatToken.connect(addr1).isCandidate(0, addr1.address)).to.eq(true);
            expect(await hardhatToken.connect(addr1).isCandidate(0, addrs[1].address)).to.eq(false);
        });
    });
    describe("voteCount", async () => {
        it("should return vote count", async () => {
            await hardhatToken.addVoting([addr1.address, addr2.address]);
            await hardhatToken.connect(addr2).vote(0, addr1.address,{value: ethers.utils.parseEther("0.01")});
            expect(await hardhatToken.connect(addrs[0]).voteCount(0, addr1.address)).to.eq(1);
            expect(await hardhatToken.connect(addrs[1]).voteCount(0, addr2.address)).to.eq(0);
        });
    });
    describe("voteInfo", async () => {
        it("vote info", async () => {
            await hardhatToken.addVoting([addr1.address, addr2.address]);
            await hardhatToken.connect(addr2).vote(0, addr1.address,{value: ethers.utils.parseEther("0.01")});
            expect(await hardhatToken.connect(addrs[0]).voteInfo(0, addr2.address)).to.eq(addr1.address);
        });
    });
});