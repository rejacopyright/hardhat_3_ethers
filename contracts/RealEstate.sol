// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract RealEstate is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    uint public itemPrice;
    uint public stock;
    uint public buyerCount;
    mapping(uint => address) public buyers;

    function initialize(uint _itemPrice, uint _stock) public initializer {
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();

        itemPrice = _itemPrice;
        stock = _stock;
        buyerCount = 0;
    }

    function addItem(uint amount) public onlyOwner {
        require(amount > 0, "Amount must be greater than 0");
        stock += amount;
    }

    function buyItem(uint price) public payable {
        require(stock > 0, "No Item");
        require(msg.value == price, "Money doesn't match");

        stock -= 1;
        buyerCount += 1;
        buyers[buyerCount] = msg.sender;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getBuyer(uint buyerId) public view returns (address) {
        return buyers[buyerId];
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}
}
