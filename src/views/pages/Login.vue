<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6" lg="6">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form @submit.prevent="doLogin()">
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="icon-user"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      type="text"
                      class="form-control"
                      placeholder="Username"
                      v-model="input.username"
                    />
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="icon-lock"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      type="password"
                      class="form-control"
                      placeholder="Password"
                      v-model="input.password"
                    />
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                      <b-button
                        type="submit"
                        variant="primary"
                        class="px-4"
                        @click="doLogin()"
                        >Login</b-button
                      >
                    </b-col>
                    <!-- <b-col cols="6" class="text-right">
                      <b-button variant="link" class="px-0">Forgot password?</b-button>
                    </b-col>-->
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: () => {
    return {
      input: {},
    };
  },
  methods: {
    doLogin() {
      let input = this.input;
      this.$http
        .post("/login", input)
        .then(async (res) => {
          this.$store.commit("set", ["isLogeddin", true]);
          this.$store.commit("set", ["token", res.token]);
          this.$store.commit("set", ["tasks", res.tasks]);
          this.$router.push({ name: "Dashboard" });
        })
        .catch((err) => {
          this.alert.error(err.message);
        });
    },
  },
};
</script>
