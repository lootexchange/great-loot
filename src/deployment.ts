import { Contract, Signer } from "ethers";
import { ethers } from "hardhat";

type ContractDeploymentParams = {
  name: string;
  from: Signer;
  args?: any[];
};

export const deployContract = async ({
  name,
  from,
  args,
}: ContractDeploymentParams): Promise<Contract> => {
  const contractFactory = await ethers.getContractFactory(name);
  const contractInstance = await contractFactory
    .connect(from)
    .deploy(...(args || []));
  return contractInstance.deployed();
};
