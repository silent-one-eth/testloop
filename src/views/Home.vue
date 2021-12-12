<template>
  <section class="home-page">
    <section v-if="!connected">
      <h2><span class="emoji">🙏</span>Please login / connect your wallet.</h2>
      <div class="bullet">
        <div class="emoji">👉</div>
        <div class="bullet-text">
          Use the "Login" button in the top right corner of this page to trigger
          your browser's web3 extention.
        </div>
      </div>
      <div class="bullet">
        <div class="emoji">👉</div>
        <p class="bullet-text">
          Once a connection to your ethereum wallet is established, a connection
          to your loopring wallet will be initiated. This will trigger a message
          signing request in your ethereum wallet. This operation has no gas fee
          as it is entirely done in your browser. Signing a message with your
          wallet is akin to signing an email with a private key from a PGP pair.
          You are not giving away private information. You are only prooving
          your identity to the Loopring DEX. In fact, if you are an existing
          user of the Loopring DEX, you already are familiar with this process.
        </p>
      </div>
    </section>
    <section v-else>
      <layer1-tokens-list />

      <div v-if="!loopringEnabled">
        <h2>Layer 2 Assets</h2>
        <div>Looking for a Loopring wallet...</div>
      </div>
      <layer2-tokens-list v-else />
    </section>
  </section>
</template>

<style lang="less">
.home-page {
  .emoji {
    font-weight: normal;
    font-size: 2rem;
    margin-right: 0.2em;
  }
  .bullet {
    display: flex;
    align-items: center;
    .bullet-text {
      text-align: justify;
    }
  }
}
</style>

<script>
import Layer1TokensList from "../components/Layer1TokensList.vue";
import Layer2TokensList from "../components/Layer2TokensList.vue";
export default {
  components: { Layer1TokensList, Layer2TokensList },
  computed: {
    connected() {
      return this.$state.account != null;
    },
    loopringConnected() {
      return this.$state.loopringAccountId != null;
    },
    loopringEnabled() {
      return (
        this.$state.loopringAccountId != null &&
        this.$state.loopringApiKey != null
      );
    },
  },
};
</script>
