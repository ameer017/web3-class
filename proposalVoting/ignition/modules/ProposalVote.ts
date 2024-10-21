// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";



const ProposalVoteModule = buildModule("ProposalModule", (m) => {

  const proposalVote = m.contract("ProposalVote");

  return { proposalVote };

});

export default ProposalVoteModule;