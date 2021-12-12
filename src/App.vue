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
      <multi-wallet />
    </div>

    <section v-if="!connected">
      <h2>Please connect your wallet.</h2>
    </section>

    <router-view v-else />
  </div>
</template>

<script>
import Glitch from "./components/Glitch.vue";
import MultiWallet from "./components/MultiWallet.vue";
export default {
  components: { Glitch, MultiWallet },
  data: () => ({

  }),
  computed:{
    connected(){
      return this.$state.account != null;
    },
    loopringConnected(){
      return this.$state.loopringAccountId != null;
    }
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
