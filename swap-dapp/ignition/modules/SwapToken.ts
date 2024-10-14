import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { vars } from "hardhat/config";

const BASE_TOKEN_ADDRESS = vars.get("BASE_TOKEN_ADDRESS")
const CELO_TOKEN_ADDRESS = vars.get("CELO_TOKEN_ADDRESS")


const SwapModule = buildModule("SwapModule", (m) => {
  const swapToken = m.contract("SwapToken", [BASE_TOKEN_ADDRESS, CELO_TOKEN_ADDRESS, 2]);

  return { swapToken };
});

export default SwapModule;
