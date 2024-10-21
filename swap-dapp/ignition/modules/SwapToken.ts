import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { vars } from "hardhat/config";
import TOKS from "../deployments/chain-31337/deployed_addresses.json"

// const BASE_TOKEN_ADDRESS = vars.get("BASE_TOKEN_ADDRESS")
// const CELO_TOKEN_ADDRESS = vars.get("CELO_TOKEN_ADDRESS")


const SwapModule = buildModule("SwapModule", (m) => {
  const swapToken = m.contract("SwapToken", [TOKS["BaseTokenModule#BaseToken"], TOKS["CeloTokenModule#CeloToken"], 2]);

  return { swapToken };
});

export default SwapModule;
