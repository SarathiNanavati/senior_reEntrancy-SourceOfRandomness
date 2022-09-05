//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract GoodDOS2 {
   address public owner;

   constructor() {
      owner = msg.sender;
      console.log("Owner", owner);
   }

   function setOwner(address newOwner) public {
      console.log("msg.sender", msg.sender);
      console.log("tx.origin", tx.origin);
      console.log("This address", address(this));

      require(tx.origin == owner, "Not owner");
      owner = newOwner;
   }
}
