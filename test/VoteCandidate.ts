import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";
import { experimentalAddHardhatNetworkMessageTraceHook } from "hardhat/config";

describe("Full test", () => {
    it("Check reward to candidate & withdraw funds", async function(){
        const [owner, addr1, addr2, addr3, addr4, addr5] = await ethers.getSigners();
        const voteContract = await ethers.getContractFactory("VoteCandidate");
        const hardhatContract = await voteContract.deploy();
        await hardhatContract.addVoting([addr1.address, addr2.address]);
        await hardhatContract.addVoting([addr2.address, addr3.address, addr4.address]);
        
        await hardhatContract.connect(addr3).vote(0, addr1.address,{value:ethers.BigNumber.from("10000000000000000")});
        await hardhatContract.connect(addr4).vote(0, addr2.address,{value:ethers.BigNumber.from("10000000000000000")});
        await hardhatContract.connect(addr5).vote(0, addr2.address,{value:ethers.BigNumber.from("10000000000000000")});

        await hardhatContract.connect(addr4).vote(1, addr3.address,{value:ethers.BigNumber.from("10000000000000000")});
        await hardhatContract.connect(addr5).vote(1, addr3.address,{value:ethers.BigNumber.from("10000000000000000")});
        await new Promise(resolve => setTimeout(resolve, 5000));

        const addr2Balance = await addr2.getBalance();
        await hardhatContract.connect(addr5).finish(0);
        const rewardBal1 = (await addr2.getBalance()).sub(addr2Balance);

        const addr3Balance = await addr3.getBalance();
        await hardhatContract.finish(1);
        const rewardBal2 = (await addr3.getBalance()).sub(addr3Balance);

        const withdrawFund = (await hardhatContract.withdraw());
        const t = ethers.BigNumber.from("10000000000000000").mul(5).mul(10).div(100);
        console.log("w:%s, %s",withdrawFund,t);

        expect(rewardBal1).to.equal(ethers.BigNumber.from("10000000000000000").mul(3).mul(90).div(100));
        expect(rewardBal2).to.equal(ethers.BigNumber.from("10000000000000000").mul(2).mul(90).div(100));
        expect(withdrawFund).to.equal(t);
    });
//   describe("Transactions", function () {
//     it("Should transfer tokens between accounts", async function () {
//       await hardhatToken.transfer(addr1.address, 50);
//       const addr1Balance = await hardhatToken.balanceOf(addr1.address);
//       expect(addr1Balance).to.equal(50);

//       await hardhatToken.connect(addr1).transfer(addr2.address, 50);
//       const addr2Balance = await hardhatToken.balanceOf(addr2.address);
//       expect(addr2Balance).to.equal(50);
//     });

//     it("Should fail if sender doesn’t have enough tokens", async function () {
//       const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

//       await expect(
//         hardhatToken.connect(addr1).transfer(owner.address, 1)
//       ).to.be.revertedWith("Not enough tokens");

//       expect(await hardhatToken.balanceOf(owner.address)).to.equal(
//         initialOwnerBalance
//       );
//     });

//     it("Should update balances after transfers", async function () {
//       const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

//       await hardhatToken.transfer(addr1.address, 100);

//       await hardhatToken.transfer(addr2.address, 50);

//       const finalOwnerBalance = await hardhatToken.balanceOf(owner.address);
//       expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(150));

//       const addr1Balance = await hardhatToken.balanceOf(addr1.address);
//       expect(addr1Balance).to.equal(100);

//       const addr2Balance = await hardhatToken.balanceOf(addr2.address);
//       expect(addr2Balance).to.equal(50);
//     });
//   });
});