import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "hardhat";

const CeloTokenModule = buildModule("CeloTokenModule", (m) => {
    const celoToken = m.contract("CeloToken", ["Celo Token", "CTK"]);

    return { celoToken };
});

export default CeloTokenModule;

