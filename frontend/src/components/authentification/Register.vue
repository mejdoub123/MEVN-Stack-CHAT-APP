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
        <form class="card card-md" action="." method="get">
          <div class="card-body">
            <h2 class="card-title text-center mb-4">Create new account</h2>
            <div class="mb-3">
              <label for="name" class="form-label required">Name</label>
              <input
                id="name"
                v-model="user.name"
                type="text"
                class="form-control"
                placeholder="Enter name"
              />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label required"
                >Email address</label
              >
              <input
                id="email"
                v-model="user.email"
                type="email"
                class="form-control"
                placeholder="Enter email"
              />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label required">Password</label>
              <div class="input-group input-group-flat">
                <input
                  id="password"
                  v-model="user.password"
                  :type="show ? 'text' : 'password'"
                  class="form-control"
                  placeholder="Password"
                  autocomplete="off"
                />
                <span class="input-group-text">
                  <input
                    type="button"
                    @click="onClick"
                    :value="show ? 'Hide' : 'Show'"
                    class="btn btn-ghost-info"
                  />
                </span>
              </div>
            </div>
            <div class="mb-3">
              <label for="confirmPassword" class="form-label required"
                >Confirm Password</label
              >
              <div class="input-group input-group-flat">
                <input
                  id="confirmPassword"
                  type="password"
                  v-model="user.confirmPassword"
                  class="form-control"
                  placeholder="Confirm Password"
                  autocomplete="off"
                />
              </div>
            </div>
            <div class="mb-3">
              <div class="form-label">Import Your Picture</div>
              <input
                @change="(e) => uploadPicture(e.target.files[0])"
                type="file"
                accept="image/*"
                class="form-control"
              />
            </div>
            <div class="mb-3">
              <label class="form-check">
                <input type="checkbox" class="form-check-input" />
                <span class="form-check-label"
                  >Agree the
                  <a href="./terms-of-service.html" tabindex="-1"
                    >terms and policy</a
                  >.</span
                >
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
                Create new account
              </button>
            </div>
          </div>
        </form>
        <div class="text-center text-muted mt-3">
          Already have account?
          <router-link to="/signin" tabindex="-1">Sign in</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import router from "@/router";
export default {
  name: "register-component",

  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        pic: null,
      },
      show: false,
    };
  },
  computed: mapGetters(["loadingStatus", "loginStatus"]),
  methods: {
    ...mapActions(["registerUser"]),
    async uploadPicture(pic) {
      if (pic === undefined) {
        this.$toast.warning(`Please Select an Image!`);
        return;
      }
      if (pic.type === "image/jpeg" || pic.type === "image/png") {
        const data = new FormData();
        data.append("file", pic);
        data.append("upload_preset", "chat-app");
        data.append("cloud_name", "mejdoub");
        fetch("https://api.cloudinary.com/v1_1/mejdoub/image/upload", {
          method: "POST",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            this.user.pic = data.url.toString();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$toast.warning(`Please Select an Image!`);

        return;
      }
    },
    async onSubmit() {
      await this.registerUser(this.user);
    },
    onClick() {
      this.show = !this.show;
    },
  },
  created() {
    if (this.loginStatus) {
      router.push("/signin");
    }
  },
};
</script>
