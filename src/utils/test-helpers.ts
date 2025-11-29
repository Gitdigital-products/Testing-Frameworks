import { ethers } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

export class TestHelpers {
  static async getTimestamp(): Promise<number> {
    const block = await ethers.provider.getBlock("latest");
    return block.timestamp;
  }

  static async mineBlocks(count: number): Promise<void> {
    for (let i = 0; i < count; i++) {
      await ethers.provider.send("evm_mine", []);
    }
  }

  static async increaseTime(seconds: number): Promise<void> {
    await ethers.provider.send("evm_increaseTime", [seconds]);
    await ethers.provider.send("evm_mine", []);
  }

  static async impersonateAccount(address: string): Promise<SignerWithAddress> {
    await ethers.provider.send("hardhat_impersonateAccount", [address]);
    return await ethers.getSigner(address);
  }

  static async stopImpersonatingAccount(address: string): Promise<void> {
    await ethers.provider.send("hardhat_stopImpersonatingAccount", [address]);
  }
}

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export const MAX_UINT256 = ethers.constants.MaxUint256;
