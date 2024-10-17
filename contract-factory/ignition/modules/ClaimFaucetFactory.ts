// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";



const ContractFactory = buildModule("ContractFactoryModule", (m) => {

  const contractFactory = m.contract("ClaimFaucetFactory");

  return { contractFactory };

});

export default ContractFactory;