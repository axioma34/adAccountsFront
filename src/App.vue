<template>
  <v-app>
    <v-app-bar app dense dark v-if="isAuthenticated">
      <v-spacer></v-spacer>
      <v-btn icon right>
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-main>
        <router-view/>
      </v-main>
    </v-main>
  </v-app>
</template>

<script>
import store from "./store"

export default {
  data() {
    return {
      isAuthenticated: store.getters.isAuthenticated
    }

  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
