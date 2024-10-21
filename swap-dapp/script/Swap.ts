import hre from "hardhat"
import TOKS from "../ignition/deployments/chain-31337/deployed_addresses.json"

async function main() {
    const DEPLOYED_CONTRACT = TOKS["SwapModule#SwapToken"];
    const BASE_CONTRACT = TOKS["BaseTokenModule#BaseToken"];
    const CELO_CONTRACT = TOKS["CeloTokenModule#CeloToken"];

    const AMOUNT_TO_SWAP = hre.ethers.parseUnits("20", 18);
    const Base_Amount = hre.ethers.parseUnits("100", 18);
    const Celo_Amount = hre.ethers.parseUnits("150", 18);


    // const signer = await hre.ethers.getSigner(myAccount);

    const swapTokenInstance = await hre.ethers.getContractAt(
        "SwapToken", DEPLOYED_CONTRACT
    )

    console.info("############## Swap Base to Celo ##############");

    const swapBTC = await swapTokenInstance.swapBaseToCelo(AMOUNT_TO_SWAP);

    swapBTC.wait();

    console.log({ "Base swapped to Celo via ...": swapBTC })


    console.info("############## Swap Celo to Base ##############");

    const swapCTB = await swapTokenInstance.swapCeloToBase(AMOUNT_TO_SWAP);

    swapCTB.wait();

    console.log({ "Base swapped to Celo via ...": swapCTB })


    console.info("############## Deposit tokens to ensure that contract doesn't run out of tokens ##############");

    const depositLiquid = await swapTokenInstance.depositTokens(Base_Amount, Celo_Amount);

    depositLiquid.wait();

    console.log({ "Liquidity provided ...": depositLiquid })





}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1
})