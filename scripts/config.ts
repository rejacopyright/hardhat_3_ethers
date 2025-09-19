import { NetworkConnectionParams } from "hardhat/types/network";

export const connection: NetworkConnectionParams<"op"> = {
  // network: "hardhatOp",
  // chainType: "op",
  network: "local",
}
export const connectionOP: NetworkConnectionParams<"op"> = {
  network: "hardhatOp",
  chainType: "op",
}