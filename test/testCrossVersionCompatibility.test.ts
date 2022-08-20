import { assert, expect } from "chai";
import { network, deployments, ethers } from "hardhat";
import { developmentChains, networkConfig } from "../helper-hardhat-config";
import { InteractERC20, ERC20Mock } from "../typechain-types";
import { BigNumber, ContractReceipt, ContractTransaction } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Test version compatibility", async function () {
      let version08ERC20Contract: ERC20Mock,
        version04InteractERC20Contract: InteractERC20,
        deployer: SignerWithAddress,
        receiver: SignerWithAddress;

      beforeEach(async () => {
        [deployer, receiver] = await ethers.getSigners();

        await deployments.fixture("mock");

        version04InteractERC20Contract = await ethers.getContract(
          "InteractERC20"
        );
        version08ERC20Contract = await ethers.getContract("ERC20Mock");
      });

      describe("Test Version Compatibility", async () => {
        it("version04InteractERC20Contract version 0.4 should be able to call transfer() to interact with version08ERC20Contract version 0.8 ERC20 Contract", async () => {
          // event Approval(address indexed owner, address indexed spender, uint256 value);

          const transactionValue = ethers.utils.parseEther("100");
          await expect(
            version08ERC20Contract.approve(
              version04InteractERC20Contract.address,
              transactionValue
            )
          )
            .to.emit(version08ERC20Contract, "Approval")
            .withArgs(
              deployer.address,
              version04InteractERC20Contract.address,
              transactionValue.toString()
            );

          // event Transfer(address indexed from, address indexed to, uint256 value);
          await expect(
            version04InteractERC20Contract.transfer(
              deployer.address,
              receiver.address,
              transactionValue
            )
          ).to.emit(version08ERC20Contract, "Transfer");

          const currenctBalance = await version08ERC20Contract.balanceOf(
            receiver.address
          );
          assert(
            currenctBalance.toString() == transactionValue.toString(),
            `expected balance of receiver to equal: ${transactionValue.toString()} \neven though the current balance is: ${currenctBalance}`
          );
        });
      });
    });
