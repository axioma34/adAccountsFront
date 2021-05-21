<template>
  <div id="app">
    <v-app id="inspire">
      <v-app id="inspire">
        <v-main>
          <v-container
              class="fill-height"
              fluid
          >
            <v-row
                align="center"
                justify="center"
            >
              <v-col
                  cols="12"
                  sm="8"
                  md="4"
              >
                <v-card class="elevation-12">
                  <v-toolbar
                      color="primary"
                      dark
                      flat
                  >
                    <v-toolbar-title>Login form</v-toolbar-title>
                    <v-spacer></v-spacer>
                  </v-toolbar>
                  <v-card-text>
                    <v-form>
                      <v-text-field
                          label="Login"
                          name="login"
                          prepend-icon="mdi-account"
                          type="text"
                          v-model="login"
                          :rules="[rules.required, rules.email]"
                      ></v-text-field>

                      <v-text-field
                          id="password"
                          label="Password"
                          name="password"
                          prepend-icon="mdi-lock"
                          type="password"
                          v-model="password"
                          aria-required="true"
                          :rules="[rules.required]"
                      ></v-text-field>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="submit" color="primary">Login</v-btn>
                  </v-card-actions>
                  <v-alert
                      v-if="showError"
                      dense
                      outlined
                      type="error"
                  >
                    Wrong <strong>Login</strong> or <strong>Password</strong>
                  </v-alert>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-main>
      </v-app>
    </v-app>
  </div>
</template>
<script>
import { mapActions } from "vuex"

export default {
  name: "login",
  data () {
  return {
    login: null,
    password: null,
    showError: false,
    rules: {
      required: value => !!value || 'Required.',
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
      }
    }
  }
},
  methods: {
    ...mapActions(["LogIn"]),
    async submit () {
      try {
        await this.LogIn({
          login: this.login,
          password: this.password
        })
        await this.$router.push("/accounts");
        this.showError = false
      } catch (error) {
        console.log(error)
        this.showError = true
      }

    }
  }
}
</script>

<style scoped>

</style>