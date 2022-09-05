//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./LW3NFT.sol";

contract LW3NFT2 is LW3NFT {
   uint256 public ownerX;

   function test() public pure virtual returns (string memory) {
      return "upgraded 2";
   }

   function version() public pure virtual override returns (string memory) {
      return "v2";
   }
}

// contract LW3NFT3 is LW3NFT {
//    uint256 public ownerX;
//    uint256 public ownerXY;

//    function test() public pure virtual returns (string memory) {
//       return "upgraded 3";
//    }

//    function version() public pure virtual override returns (string memory) {
//       return "v4";
//    }
// }
