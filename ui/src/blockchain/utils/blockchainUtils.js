import Web3 from "web3";
import artifacts from "../artifacts/index.json";

export default class BlockchainUtils {
  web3;
  contract;
  account;

  constructor(_ethAddress) {
    this.account = _ethAddress;

    if (window.ethereum != null) {
      this.web3 = new Web3(window.ethereum);
    } else {
      this.web3 = new Web3(
        new Web3.providers.HttpProvider("http://localhost:7545")
      );
    }

    this.contract = new this.web3.eth.Contract(
      artifacts.abi,
      artifacts.networks[5777].address
    );
  }

  async transfer(listingId, buyerId, receiverAddress) {
    const _web3 = new Web3(
      new Web3.providers.HttpProvider("http://localhost:7545")
    );
    const _contract = new _web3.eth.Contract(
      artifacts.abi,
      artifacts.networks[5777].address
    );

    try {
      await _contract.methods
        .transfer(listingId, buyerId, receiverAddress)
        .send({
          from: "0x50D89B289c953272Cd7B13C9541A0Abf3104fc60",
          gas: 200000,
          value: "0",
        });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /** Send deposit */
  async sendDeposit(ethAmount, buyerId, sellerId, sellerAddress, house) {
    var weiAmount = this.web3.utils.toWei(ethAmount, "ether");

    try {
      await this.contract.methods
        .saveDeposit(house._id, buyerId, sellerId, sellerAddress)
        .send({
          from: this.account,
          gas: 3000000,
          value: weiAmount,
        });

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /** Get user current logged in account*/
  async getCurrentAccount() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    return accounts[0];
  }
}
