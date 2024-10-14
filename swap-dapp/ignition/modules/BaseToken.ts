import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "hardhat";

const BaseTokenModule = buildModule("BaseTokenModule", (m) => {
    const baseToken = m.contract("BaseToken", ["Base Token", "BTK"]);

    return { baseToken };
});

export default BaseTokenModule;


