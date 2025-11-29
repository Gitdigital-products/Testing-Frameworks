import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("SimpleStorage Contract", function () {
  let simpleStorage: any;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    
    const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await SimpleStorage.deploy();
    await simpleStorage.deployed();
  });

  it("Should set and get the stored value", async function () {
    const testValue = 42;
    
    await simpleStorage.set(testValue);
    expect(await simpleStorage.get()).to.equal(testValue);
  });

  it("Should emit ValueChanged event", async function () {
    const testValue = 100;
    
    await expect(simpleStorage.set(testValue))
      .to.emit(simpleStorage, "ValueChanged")
      .withArgs(owner.address, testValue);
  });

  it("Should revert when non-owner tries to set value", async function () {
    const testValue = 42;
    
    await expect(
      simpleStorage.connect(addr1).set(testValue)
    ).to.be.revertedWith("Not the owner");
  });
});
