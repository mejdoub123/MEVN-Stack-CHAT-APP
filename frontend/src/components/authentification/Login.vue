<template>
  <div class="border-top-wide border-primary d-flex flex-column">
    <div class="page page-center">
      <div class="container-tight py-4">
        <div class="text-center mb-4">
          <router-link to="/" class="navbar-brand navbar-brand-autodark"
            ><img
              src="../../assets/Logo-removebg-preview.png"
              height="36"
              alt=""
          /></router-link>
        </div>
        <form @submit="onSubmit" class="card card-md">
          <div class="card-body">
            <h2 class="card-title text-center mb-4">Login to your account</h2>
            <div class="mb-3">
              <label for="email" class="form-label required"
                >Email address</label
              >
              <input
                id="email"
                type="email"
                v-model="user.email"
                class="form-control"
                placeholder="Enter email..."
              />
            </div>
            <div class="mb-2">
              <label for="password" class="form-label required">
                Password
                <span class="form-label-description">
                  <router-link to="/forgetpassword"
                    >I forgot password</router-link
                  >
                </span>
              </label>
              <div class="input-group input-group-flat">
                <input
                  id="password"
                  :type="show ? 'text' : 'password'"
                  v-model="user.password"
                  class="form-control"
                  placeholder="Password"
                />
                <span class="input-group-text">
                  <input
                    type="button"
                    :value="show ? 'Hide' : 'Show'"
                    @click="onClick"
                    class="btn btn-ghost-info"
                  />
                </span>
              </div>
            </div>
            <div class="mb-2">
              <label for="remember" class="form-check">
                <input id="remember" type="checkbox" class="form-check-input" />
                <span class="form-check-label">Remember me on this device</span>
              </label>
            </div>
            <div class="form-footer">
              <button
                @click="onSubmit"
                type="button"
                :class="
                  loadingStatus
                    ? 'btn btn-primary w-100 btn-loading'
                    : 'btn btn-primary w-100'
                "
              >
                Login
              </button>
            </div>
          </div>
        </form>
        <div class="text-center text-muted mt-3">
          Don't have account yet?
          <router-link to="/signup" tabindex="-1">Sign up</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "login-component",
  data() {
    return {
      user: { email: "", password: "" },
      show: false,
    };
  },
  computed: mapGetters(["loadingStatus"]),
  methods: {
    ...mapActions(["loginUser"]),
    onClick() {
      this.show = !this.show;
    },
    async onSubmit(e) {
      e.preventDefault();
      await this.loginUser(this.user);
    },
  },
};
</script>
