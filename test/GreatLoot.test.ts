import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

import { deployContract } from "../src/deployment";
import { getTotalGreatness } from "../src/loot";

describe("Hexo", () => {
  let deployer: SignerWithAddress;
  let alice: SignerWithAddress;

  let greatLoot: Contract;

  beforeEach(async () => {
    // Initialize accounts
    [deployer, alice] = await ethers.getSigners();

    // Deploy GreatLoot contract
    greatLoot = await deployContract({
      name: "GreatLoot",
      from: deployer,
    });
  });

  describe("claim", () => {
    it("claim token", async () => {
      await greatLoot.connect(alice).claim(10_000_001);
      expect(await greatLoot.ownerOf(10_000_001)).to.be.equal(alice.address);
    });

    it("can only claim tokens with id greater than 10.000.000", async () => {
      await expect(greatLoot.connect(alice).claim(10_000)).to.be.revertedWith(
        "Token ID invalid"
      );

      await expect(
        greatLoot.connect(alice).claim(10_000_000)
      ).to.be.revertedWith("Token ID invalid");
    });
  });

  describe("metadata", () => {
    it("valid metadata", async () => {
      await greatLoot.connect(alice).claim(10_000_999);

      const metadata = JSON.parse(
        await greatLoot
          .tokenURI(10_000_999)
          .then((encoded: string) =>
            Buffer.from(encoded.split(",")[1], "base64").toString()
          )
      );

      expect(metadata.name).to.be.equal("Bag #10000999");
      expect(metadata.description).to.be.equal(
        "Loot is randomized adventurer gear generated and stored on chain. Stats, images, and other functionality are intentionally omitted for others to interpret. Feel free to use Loot in any way you want."
      );
      expect(metadata.attributes[0].display_type).to.be.equal("number");
      expect(metadata.attributes[0].trait_type).to.be.equal("Greatness");
      expect(metadata.attributes[0].value).to.be.equal(
        getTotalGreatness(10_000_999)
      );
    });
  });
});
