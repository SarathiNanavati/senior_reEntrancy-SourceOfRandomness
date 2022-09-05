// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract GoodContract {
   mapping(address => uint256) public balances;

   function addBalance() public payable {
      balances[msg.sender] += msg.value;
   }

   function withdraw() public {
      require(balances[msg.sender] > 0, "Not Enough Balance");
      (bool sent, ) = msg.sender.call{value: balances[msg.sender]}("");
      require(sent, "Failed to send ether");
      balances[msg.sender] = 0;
   }
}
