import { ethers } from "hardhat";

import { deployContract } from "../src/deployment";

const main = async () => {
  const [deployer] = await ethers.getSigners();

  const contract = await deployContract({
    name: "GreatLoot",
    from: deployer,
  });

  console.log(`Deployed at ${contract.address}`);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
