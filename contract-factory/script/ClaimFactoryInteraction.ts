import hre from "hardhat";

async function main() {

    const DEPLOYED_FACTORY_CONTRACT = "0x8911c0889252dcf9862256feb89Ed0Fa7d3c1fd4";

    const myAccount = "0x82A326C204e0592457921B60cA2FB1Ec8e340c72"

    const signer = await hre.ethers.getSigner(myAccount);

    const factoryContractInstance = await hre.ethers.getContractAt(
        "ClaimFaucetFactory", DEPLOYED_FACTORY_CONTRACT
    )

    // start scripting

    console.log("############## Deploying Cailm Faucet  ##############");

    const deployClaimFaucetTxn1 = await factoryContractInstance.connect(signer).deployClaimFaucet("Lisk Token", "LSK");

    deployClaimFaucetTxn1.wait();

    console.log({ "Claim Faucet 1 deployed to": deployClaimFaucetTxn1 })


    const deployClaimFaucetTxn2 = await factoryContractInstance.connect(signer).deployClaimFaucet("Starknet Token", "STRK");

    deployClaimFaucetTxn2.wait();

    console.log({ "Claim Faucet 2 deployed to": deployClaimFaucetTxn2 })


    console.log("############## Getting the length & data of deployed claim faucet  ##############");

    const getLengthOfDeployed = await factoryContractInstance.getLengthOfDeployedContracts();

    console.log({ "Length of Claim Faucet": getLengthOfDeployed.toString() })


    const getUserContracts = await factoryContractInstance.connect(signer).getAllDeployedUserContracts()

    console.table(getUserContracts);

    console.log("############## Getting User deployed claim faucet  by Index ##############");
    const { deployer_: deployerA, deployedContract_: deployedContractA } = await factoryContractInstance.connect(signer).getAllDeployedUserContractsByIndex(0)
    console.log([{ "Deployer": deployerA }, { "Deployed Contract Address": deployedContractA }])

    const { deployer_: deployerB, deployedContract_: deployedContractB } = await factoryContractInstance.connect(signer).getAllDeployedUserContractsByIndex(1)

    console.log([{ "Deployer": deployerB }, { "Deployed Contract Address": deployedContractB }])


    console.log("############## Getting deployed contract Info ##############");
    const contractInfo1 = await factoryContractInstance.getInfoFromContract(deployedContractA);
    console.table(contractInfo1)

    const contractInfo2 = await factoryContractInstance.getInfoFromContract(deployedContractB);
    console.table(contractInfo2)

    console.log("############## Claiming token and getting user balance ##############");
    const claimTokenFaucetTxn1 = await factoryContractInstance.connect(signer).claimFaucetFromContract(deployedContractA);

    claimTokenFaucetTxn1.wait()

    const claimTokenFaucetTxn2 = await factoryContractInstance.connect(signer).claimFaucetFromContract(deployedContractB);

    claimTokenFaucetTxn2.wait()


    const checkUserBalForToken1 = await factoryContractInstance.claimFaucetBalance(deployedContractA);
    console.log({ "Faucet 1 Balance": hre.ethers.formatUnits(checkUserBalForToken1, 18) })

    const checkUserBalForToken2 = await factoryContractInstance.claimFaucetBalance(deployedContractB);
    console.log({ "Faucet 2 Balance": hre.ethers.formatUnits(checkUserBalForToken2, 18) })
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1
})