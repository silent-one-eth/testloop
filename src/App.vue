<template>
  <div id="app">
    <div id="nav">
      <div class="logo">
        <h1>
          <glitch text="Silent DAO" />
        </h1>
      </div>
      <div class="menu-items">
        <router-link to="/" class="menu-item">Home</router-link>
        <router-link to="/about" class="menu-item">About</router-link>
      </div>
      <div class="wallet-menu disabled" v-if="web3Working">
        Wallet: {{ web3WorkingMessage }}
      </div>
      <div class="wallet-menu" v-else-if="isConnected">
        {{ hasENSName ? hasENSName : account }}
        <span class="loopring-logo" v-if="isLoopringEnabled">
          <img
            src="./assets/loopring.png"
            title="Loopring connected"
            alt="Loopring"
            width="16"
          />
        </span>
      </div>
      <div class="wallet-menu" v-else-if="isMetaMaskEnable" @click="doInitWallet">Connect wallet</div>
      <div class="wallet-menu" v-else @click="doDisplayWeb3Infos">
        Web3 Not Found (?)
      </div>
    </div>

    <section v-if="isConnected" style="font-size: 2rem;">
      <h2>Layer 1 Assets</h2>
      <token-balance
        :token="token"
        :account="account"
        v-for="token in layer1Tokens"
        :key="token.address"
      />

      <div v-if="!isLoopringEnabled">
        <h2>Layer 2 Assets</h2>
        <div>Looking for a Loopring wallet...</div>
      </div>
      <div v-else>
        <h2>Layer 2 Assets</h2>
        <div v-for="balance in layer2Balances" :key="balance.tokenId">
          {{ loopringTokens[balance.tokenId] }}:
          {{ balance.total / 1000000000000000000 }}
        </div>
      </div>
    </section>

    <router-view />
  </div>
</template>

<script>
import Glitch from "./components/Glitch.vue";
import TokenBalance from "./components/TokenBalance.vue";
import ENS from "ethjs-ens";
import Web3 from "web3";
import {
  // WalletAPI,
  UserAPI,
  ChainId,
  ExchangeAPI,
  //Sign,
  ConnectorNames,
  //sign_tools
  generateKeyPair,
} from "@loopring-web/loopring-sdk";
export default {
  components: { Glitch, TokenBalance },
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
    layer1Tokens: [
      {
        token: "ETH",
      },
      {
        address: "0xbbbbca6a901c926f240b89eacb641d8aec7aeafd",
        token: "LRC",
      },
    ],
    layer2Tokens: null,
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
      return this.layer2Balances != null;
    },
  },
  methods: {
    async doInitWallet() {
      this.web3Working = true;
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      this.account = accounts[0];
      await this.tryDisplayENS();
      window.ethereum.on("accountsChanged", this.onAccountChanged);
      this.initLoopring();
      this.web3Working = false;
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
    doDisplayWeb3Infos() {
      alert(
        "You need a web3 enabled browser (or an extention) and allow this website to connect to your Ethereum wallet."
      );
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
      }
      if (this.loopringExchangeInfo == null) {
        const exchangeInfoResponse = await exchange.getExchangeInfo();
        if (exchangeInfoResponse.error != null) {
          return;
        }
        this.loopringExchangeInfo = exchangeInfoResponse.exchangeInfo;
      }
      if (this.loopringApiKey == null) {
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
        this.loopringApiKey = apiKeyResponse.apiKey;
      }

      const exchangeTokensResponse = await exchange.getTokens();
      if (exchangeTokensResponse.error != null) {
        return;
      }
      this.loopringTokens = exchangeTokensResponse.tokenIdIndex;

      const balancesResponse = await userApi.getUserBalances(
        {
          accountId: this.loopringAccountNb,
          tokens: "0,1", // 💀💢 Crash in splitTokens if there are spaces aroung token strings?
        },
        this.loopringApiKey
      );
      this.layer2Balances = balancesResponse.userBalances;
    },
  },
};
</script>


<style lang="less">
html {
  width: 100vw;
  height: 100vh;
}
body {
  background: #232526; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to bottom,
    #414345,
    #232526
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom,
    #414345,
    #232526
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.menu-items .menu-item {
  margin-right: 1em;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  max-width: 900px;
  margin: auto;
}
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
#nav {
  padding: 16px 30px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .logo {
    margin-right: auto;
  }
  h1 {
    font-family: "Permanent Marker", cursive;
    letter-spacing: 0.09em;
    font-size: 32pt;
    line-height: 32pt;
    font-weight: 800;
    padding: 10pt;
    border-radius: 16pt;
    margin: 0;
    color: #00b7ffda;
    text-shadow: #232526 2px 2px 2px;
  }

  a {
    transition: all 0.1s ease-out;
    font-family: "Permanent Marker", cursive;
    font-size: 16pt;
    line-height: 16pt;
    font-weight: bold;
    color: #098bbe;
    text-decoration: none;
    text-shadow: #232526 2px 2px 2px;

    &.router-link-exact-active {
      color: #63c3ea;
      border-bottom: 2pt solid #63c3ea;
    }
  }
}
</style>
