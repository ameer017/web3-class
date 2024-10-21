import hre from "hardhat"

async function main() {
    const CONTRACT_ADDRESS = "0x5Dd30fC41b049426080235d0d4072b655E5Dfe92"

    const WALLET_ADDRESS = "0x82a326c204e0592457921b60ca2fb1ec8e340c72"

    const signer = await hre.ethers.getSigner(WALLET_ADDRESS);

    const contractInstance = await hre.ethers.getContractAt(
        "ProposalVote", CONTRACT_ADDRESS
    )

    console.info("############## Create Proposal  ##############");

    const createProposal = await contractInstance.connect(signer).createProposal("Eviction Test", "Organize an in-depth eviction test for the web3 class participants", 1);

    createProposal.wait();

    console.log({ "Proposal created to ...": createProposal })


    console.info("############## Vote on a proposal ##############");

    const vote = await contractInstance.connect(signer).voteOnProposal(2);
    vote.wait();
    console.log({ "Vote casted to proposal ": vote });


    console.info("############## Get all proposal details ##############");

    const getProposals = await contractInstance.connect(signer).getAllProposals()

    console.table(getProposals);


    console.info("############## Getting proposal by Index ##############");
    const getSingleProposal = await contractInstance.connect(signer).getProposal(0)
    console.log({ "Getting proposal at index": getSingleProposal })
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1
})