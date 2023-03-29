// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract RenewableEnergyCredit {

    address public owner;
    uint public energyCredits;

    constructor() {
        owner = msg.sender;
        energyCredits = 0;
    }

    function buyCredits(uint credits) public payable {
        require(msg.value >= credits * 1 ether, "Insufficient payment for credits");
        energyCredits += credits;
    }

    function sellCredits(uint credits) public {
        require(msg.sender == owner, "Only the owner can sell credits");
        require(credits <= energyCredits, "Insufficient credits available for sale");
        energyCredits -= credits;
        payable(msg.sender).transfer(credits * 1 ether);
    }
}
