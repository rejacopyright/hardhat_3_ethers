// import abi from '../artifacts/contracts/Store.sol/Store.json'
import { network } from "hardhat";
import { connection } from "./config.js";

const { ethers } = await network.connect(connection);

async function main() {

  const itemPrice = ethers.parseEther("0.01");
  const stock = 1_000_000;

  // 1. Deploy Contract
  // const factory = new ethers.ContractFactory(abi.abi, abi.bytecode, deployer)
  const factory = await ethers.getContractFactory("Store");
  const contract = await factory.deploy();
  await contract.waitForDeployment();

  // 2. Deploy Proxy
  const Proxy = await ethers.getContractFactory("UpgradeProxy");
  const initCalldata = factory.interface.encodeFunctionData("initialize", [
    itemPrice,
    stock,
  ]);
  const proxy = await Proxy.deploy(contract.target, initCalldata);
  await proxy.waitForDeployment();

  // 3. Attach proxy
  const [deployer] = await ethers.getSigners();
  const proxiedContract = factory.attach(proxy.target);

  console.info(`👤 Deployer Account: ${deployer.address}`);
  console.info("💰 Item Price:", await proxiedContract.itemPrice());
  console.info(`✅ Contract deployed at: ${await contract.getAddress()}`);
  console.info(`✅ Proxy deployed at: ${await proxy.getAddress()}`);
}

main().catch((err) => {
  console.error("❌ Deployment failed:", err);
  process.exit(1);
});
