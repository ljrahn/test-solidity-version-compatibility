# Proves solidity version 0.4.24 contract can interact with a version 0.8 contract

Test deploys an ERC20Mock version: 0.8. Test deploys InteractERC20 version: 0.4.24 contract that simply has transfer
functionality to transfer the tokens of ERC20Mock after first approving the InteractERC20 contract to make transfers. The InteractERC20
contract uses IERC20Mock interface which is the interface for ERC20Mock, except the solidity version is changed to 0.4.24 so that
InteractERC20 can use it.

Install dependencies:

```
yarn add
```

Run test:

```
yarn hardhat test
```
