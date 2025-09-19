import abi from '../artifacts/contracts/Store.sol/Store.json'
import { connection } from './config.js'
import { network } from 'hardhat'

const { ethers } = await network.connect(connection);

async function main() {
  const [deployer] = await ethers.getSigners()
  console.info(`Deployer Account: ${deployer.address}`)

  const itemPrice = ethers.parseEther('0.01')
  const stock = 1000000

  // const factory = await ethers.getContractFactory('Store')
  const factory = new ethers.ContractFactory(abi.abi, abi.bytecode, deployer)
  const contract = await factory.deploy(itemPrice, stock)

  await contract.waitForDeployment()
  console.info(`Contract Address: ${contract.target}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
