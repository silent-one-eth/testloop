<template>
  <div>
    <h2>Layer 2 Assets</h2>
    <div v-for="balance in layer2Balances" :key="balance.tokenId">
      {{ loopringTokens[balance.tokenId] }}:
      {{ balance.total / 1000000000000000000 }}
    </div>
  </div>
</template>


<script>
import {
  UserAPI,
  ChainId,
  ExchangeAPI,
} from "@loopring-web/loopring-sdk";
export default {
  components: {  },
  data: () => ({
    loopringTokens: null,
    layer2Balances : null
  }),
  async mounted() {
    console.log(this.$state);
    const exchange = new ExchangeAPI({ chainId: ChainId.MAINNET }),
      userApi = new UserAPI({ chainId: ChainId.MAINNET }),
      accountId = this.$state.loopringAccountId,
      loopringApiKey = this.$state.loopringApiKey;
    const exchangeTokensResponse = await exchange.getTokens();
    if (exchangeTokensResponse.error != null) {
      return;
    }
    this.loopringTokens = exchangeTokensResponse.tokenIdIndex;
    const balancesResponse = await userApi.getUserBalances(
      {
        accountId,
        tokens: "0,1", // 💀💢 Crash in splitTokens if there are spaces aroung token strings?
      },
      loopringApiKey
    );
    this.layer2Balances = balancesResponse.userBalances;
  },
  computed: {
    account() {
      return this.$state.account;
    },
  },
};
</script>