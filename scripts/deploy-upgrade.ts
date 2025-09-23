// import abi from '../artifacts/contracts/Store.sol/Store.json'
import { network } from "hardhat";
import { connection } from "./config.js";

const { ethers } = await network.connect(connection);

async function main() {
  const proxyAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // ← Upgradable Proxy address

  // 1. Deploy Contract V2
  const contractV2Factory = await ethers.getContractFactory("StoreV2");
  const contractV2 = await contractV2Factory.deploy();
  await contractV2.waitForDeployment();

  // 2. Attach Proxy
  const proxy = await ethers.getContractAt("Store", proxyAddress);

  // 3. Upgrade
  const tx = await proxy.upgradeToAndCall(contractV2.target, "0x");
  await tx.wait();

  console.info(`✅ ContractV2 deployed at: ${await proxy.getAddress()}`);
  console.info("🎉 Proxy upgraded!");
}

main().catch((err) => {
  console.error("❌ Upgrade failed:", err);
  process.exit(1);
});
