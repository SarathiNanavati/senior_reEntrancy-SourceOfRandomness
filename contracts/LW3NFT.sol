//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract LW3NFT is Initializable, ERC721Upgradeable, UUPSUpgradeable, OwnableUpgradeable {
   mapping(address => uint256) public balances;
   uint256 public var1;
   uint256 public var2;
   uint256 public var3;
   uint256 public var4;
   uint256 public var5;
   uint256 public var6;
   uint256 public var7;
   uint256 public var8;
   uint256 public var9;
   uint256 public var10;
   uint256 public var11;
   uint256 public var12;
   uint256 public var13;
   uint256 public var14;
   uint256 public var15;
   uint256 public var16;
   uint256 public var17;
   uint256 public var18;
   uint256 public var19;

   function initialize() public initializer {
      __ERC721_init("LW3NFT", "LW3NFT");
      __Ownable_init();
      _mint(msg.sender, 1);
   }

   function _authorizeUpgrade(address newImplementation) internal virtual override onlyOwner {}

   function version() public pure virtual returns (string memory) {
      return "v1";
   }
}
