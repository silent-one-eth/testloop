<template>
  <section style="font-size: 2rem">
    <layer1-tokens-list />

    <div v-if="!loopringEnabled">
      <h2>Layer 2 Assets</h2>
      <div>Looking for a Loopring wallet...</div>
    </div>
    <layer2-tokens-list v-else/>
  </section>
</template>

<script>
import Layer1TokensList from "../components/Layer1TokensList.vue";
import Layer2TokensList from "../components/Layer2TokensList.vue";
export default {
  components: { Layer1TokensList,Layer2TokensList },
  computed:{
    loopringEnabled(){
      return this.$state.loopringAccountId != null
      && this.$state.loopringApiKey != null;
    }
  }
};
</script>
