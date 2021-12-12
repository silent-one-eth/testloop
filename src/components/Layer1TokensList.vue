<template>
  <section>
    <h2>Layer 1 Assets</h2>
    <token-balance
      :token="token"
      :account="account"
      v-for="token in layer1Tokens"
      :key="token.address"
    />
  </section>
</template>


<script>
import TokenBalance from "./TokenBalance.vue";
export default {
  components: {  TokenBalance },
  data: () => ({
    layer1Tokens: [
      {
        token: "ETH",
      },
      {
        address: "0xbbbbca6a901c926f240b89eacb641d8aec7aeafd",
        token: "LRC",
      },
    ],
  }),
  computed:{
    account(){
      return this.$state.account;
    }
  }
};
</script>