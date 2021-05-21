<template>
  <v-app>
    <v-app-bar app dense dark v-if="isAuthenticated">
      <v-btn :to="'/users'" left>
        Users
        <v-icon>mdi-account-multiple</v-icon>
      </v-btn>
      <v-btn :to="'/accounts'" left>
        Accounts
        <v-icon>mdi-badge-account-horizontal</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon right @click="logOut">
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
import {mapActions} from "vuex";
// import { mapActions } from "vuex"

export default {
  data() {
    return {
      isAuthenticated: store.getters.isAuthenticated
    }

  },
  methods: {
    ...mapActions(["LogOut"]),
    logOut() {
      this.LogOut()
      this.$router.push("/login")
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
