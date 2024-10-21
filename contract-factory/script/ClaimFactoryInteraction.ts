import hre from "hardhat";

async function main() {

    const DEPLOYED_FACTORY_CONTRACT = "0x8911c0889252dcf9862256feb89Ed0Fa7d3c1fd4";

    const myAccount = "0x82A326C204e0592457921B60cA2FB1Ec8e340c72"

    const signer = await hre.ethers.getSigner(myAccount);

    const factoryContractInstance = await hre.ethers.getContractAt(
        "ClaimFaucetFactory", DEPLOYED_FACTORY_CONTRACT
    )

    // start scripting

    console.log("############## Deploying Cailm Faucet ##############");

    const deployClaimFaucetTxn1 = await factoryContractInstance.connect(signer).deployClaimFaucet("Lisk Token", "LSK");

    deployClaimFaucetTxn1.wait();
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1
})