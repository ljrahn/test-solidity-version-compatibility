// SPDX-License-Identifier: MIT
pragma solidity ^0.4.24;

import "./IERC20Mock.sol";

contract InteractERC20 {
  IERC20 public erc20;

  constructor(address _erc20Address) {
    erc20 = IERC20(_erc20Address);
  }

  function transfer(
    address from,
    address to,
    uint256 amount
  ) external returns (bool) {
    erc20.transferFrom(from, to, amount);
  }
}
