// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Store {
    address public owner;
    uint public itemPrice;
    uint public stock;
    uint public buyerCount;

    mapping(uint => address) public buyers;

    constructor(uint _itemPrice, uint _stock) {
        owner = msg.sender;
        itemPrice = _itemPrice;
        stock = _stock;
        buyerCount = 0;
    }

    // Add Item
    function addItem(uint amount) public {
        // require(msg.sender == owner, "Only owner can add items");
        require(amount > 0, "Amount must be greater than 0");

        stock += amount;
    }

    // Buy Item
    function buyItem() public payable {
        require(stock > 0, "No Item");
        require(msg.value == itemPrice, "Money doesn't match");

        stock -= 1;
        buyerCount += 1;
        buyers[buyerCount] = msg.sender;
    }

    // View Contract Balance
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    // View Buyer
    function getBuyer(uint buyerId) public view returns (address) {
        return buyers[buyerId];
    }
}
