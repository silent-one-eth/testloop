<template>
  <div>
    <div class="wallet-menu disabled" v-if="web3Working">
      Wallet: {{ web3WorkingMessage }}
    </div>
    <div class="wallet-menu" v-else-if="isConnected">
      {{ hasENSName ? hasENSName : account }}
      <span class="loopring-logo" v-if="isLoopringEnabled">
        <img
          src="../assets/loopring.png"
          title="Loopring connected"
          alt="Loopring"
          width="16"
        />
      </span>
    </div>
    <div class="wallet-menu" v-else-if="isMetaMaskEnable" @click="doInitWallet">
      Connect wallet
    </div>
    <div class="wallet-menu" v-else @click="doDisplayWeb3Infos">
      Web3 Not Found (?)
    </div>
  </div>
</template>

<script>
import ENS from "ethjs-ens";
import Web3 from "web3";
import {
  UserAPI,
  ChainId,
  ExchangeAPI,
  ConnectorNames,
  generateKeyPair,
} from "@loopring-web/loopring-sdk";
export default {
  data: () => ({
    account: null,
    ensName: null,
    ens: null,
    loopringAccountInfo: null,
    loopringApiKey: null,
    loopringExchangeInfo: null,
    layer2Balances: null,
    web3Working: false,
    web3WorkingMessage: "Initiating...",
  }),
  computed: {
    isMetaMaskEnable() {
      return typeof window.ethereum !== "undefined";
    },
    isConnected() {
      return this.account != null;
    },
    hasENSName() {
      return this.ensName;
    },
    loopringAccountNb() {
      if (this.loopringAccountInfo == null) return null;
      return this.loopringAccountInfo.accountId;
    },
    isLoopringEnabled() {
      return this.loopringApiKey != null;
    },
  },
  methods: {
    doDisplayWeb3Infos() {
      alert(
        "You need a web3 enabled browser (or an extention) and allow this website to connect to your Ethereum wallet."
      );
    },
    async doInitWallet() {
      this.web3Working = true;
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      this.account = accounts[0];
      this.$state.account = accounts[0];
      await this.tryDisplayENS();
      window.ethereum.on("accountsChanged", this.onAccountChanged);
      this.initLoopring();
      this.web3Working = false;
    },
    async initLoopring() {
      const owner = this.account;
      const exchange = new ExchangeAPI({ chainId: ChainId.MAINNET }),
        userApi = new UserAPI({ chainId: ChainId.MAINNET }),
        web3 = new Web3(window.ethereum);
      if (this.loopringAccountNb == null) {
        const loopAccountInfoResponse = await exchange.getAccount({ owner }),
          loopAccountInfo = loopAccountInfoResponse.accInfo;
        if (loopAccountInfoResponse.error != null) {
          return;
        }
        this.loopringAccountInfo = loopAccountInfo;
        console.log({ t: this, loopAccountInfo });
        this.$state.loopringAccountId = loopAccountInfo.accountId;
      }
      if (this.loopringExchangeInfo == null) {
        const exchangeInfoResponse = await exchange.getExchangeInfo();
        if (exchangeInfoResponse.error != null) {
          return;
        }
        this.loopringExchangeInfo = exchangeInfoResponse.exchangeInfo;
      }
      if (this.$state.loopringApiKey == null) {
        const eddsakey = await generateKeyPair({
          web3,
          address: owner,
          exchangeAddress: this.loopringExchangeInfo.exchangeAddress,
          keyNonce: this.loopringAccountInfo.nonce - 1,
          walletType: ConnectorNames.MetaMask,
        });
        const apiKeyResponse = await userApi.getUserApiKey(
          { accountId: this.loopringAccountNb },
          eddsakey.sk
        );
        if (apiKeyResponse.error != null) {
          return;
        }
        this.$state.loopringApiKey = apiKeyResponse.apiKey;
      }
    },
    async tryDisplayENS() {
      if (this.ens == null) {
        const provider = window.ethereum;
        this.ens = new ENS({ provider, network: "1" });
      }
      this.ensName = await this.ens.reverse(this.account);
    },
    async onAccountChanged() {
      this.ensName = null;
      this.account = null;
    },
  },
};
</script>

<style lang="less">
.wallet-menu {
  display: flex;
  align-items: center;
  position: relative;
  top: 2pt;
  border: 1.2pt solid #00b7ffda;
  border-radius: 8pt;
  padding: 4pt 9pt;
  font-family: "Fira Mono", monospace;
  font-size: 8pt;
  color: #e0f6ff;
  background-color: #0c425748;
  cursor: pointer;
}
.wallet-menu:hover {
  border-color: #63c3ea;
  background-color: #1c709148;
}
.loopring-logo {
  box-shadow: #23252673 1px 1px 1px;
  margin-left: 1em;
  background: #ada996; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to bottom right,
    #eaeaea,
    #dbdbdb,
    #f2f2f2,
    #ada996
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom right,
    #eaeaea,
    #dbdbdb,
    #f2f2f2,
    #ada996
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  img {
    position: relative;
    top: 1px;
    left: 1px;
  }
}
.wallet-menu.disabled {
  cursor: no-drop;
  opacity: 0.5;
}
</style>