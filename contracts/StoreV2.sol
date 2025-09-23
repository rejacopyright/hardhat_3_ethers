// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./Store.sol";

contract StoreV2 is Store {
    function getAllBuyers() public view returns (address[] memory) {
        address[] memory allBuyers = new address[](buyerCount);
        for (uint i = 1; i <= buyerCount; i++) {
            allBuyers[i - 1] = buyers[i];
        }
        return allBuyers;
    }
}
