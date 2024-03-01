const { loadFixture,
  } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");
  const { ethers, upgrades} = require("hardhat");

describe("Example", function(){
    async function deployFixture(){
        const [owner, otherAccount] = await ethers.getSigners();
        
        const Example1 = await ethers.getContractFactory("ExampleV1");
        const ExampleV1 = await upgrades.deployProxy(Example1, [owner.address, 10], {
            initializer: "initialize",
            kind: 'uups'
        })

        return {owner, otherAccount, ExampleV1};
    }

    it("Should set correct number", async()=>{
        const{owner, otherAccount, ExampleV1} = await loadFixture(deployFixture);
        expect(await ExampleV1.x()).to.eq("10");
        await ExampleV1.setNumber("20");
        expect(await ExampleV1.x()).to.eq("20");

        const Example2 = await ethers.getContrac3tFactory("ExampleV2");
        const ExampleV2 = await upgrades.upgradeProxy(ExampleV1.target, Example2);

        expect(await ExampleV2.x()).to.eq("20");
    })
})