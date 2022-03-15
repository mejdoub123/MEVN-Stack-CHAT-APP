<template>
  <div class="page-wrapper">
    <div class="container-xl">
      <!-- Page title -->
      <div class="page-header d-print-none">
        <div class="row align-items-center">
          <div class="col">
            <!-- Page pre-title -->
            <div class="page-pretitle">Overview</div>
            <h2 class="page-title">Home</h2>
          </div>
          <!-- Page title actions -->
          <div class="col-auto ms-auto d-print-none">
            <div class="btn-list">
              <span class="d-none d-sm-inline">
                <router-link
                  to="/chat"
                  :class="
                    loginStatus ? 'btn btn-white' : 'btn btn-white disabled'
                  "
                >
                  New conversation
                </router-link>
              </span>
              <router-link
                to="/chat"
                :class="
                  loginStatus
                    ? 'btn btn-primary d-none d-sm-inline-block'
                    : 'btn btn-primary d-none d-sm-inline-block disabled'
                "
              >
                <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Create new Group Chat
              </router-link>
              <a
                href="#"
                class="btn btn-primary d-sm-none btn-icon"
                data-bs-toggle="modal"
                data-bs-target="#modal-report"
                aria-label="Create new report"
              >
                <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="page-body">
      <div class="container-xl">
        <div class="row row-deck row-cards">
          <div class="col-12">
            <img
              src="../assets/wallpaperflare.com_wallpaper.jpg"
              width="100%"
              height="100%"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Login from "../components/authentification/Login.vue";
import Register from "../components/authentification/Register.vue";
import { mapGetters, mapActions } from "vuex";
import router from "@/router";
export default {
  name: "HomeView",
  components: {
    Login,
    Register,
  },
  computed: mapGetters(["loginStatus", "currentUser"]),
  methods: mapActions(["loginUser"]),
  created() {
    if (!this.loginStatus) {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      if (user) {
        this.$store.commit("setCurrentUser", user);
        this.$store.commit("setLoginStatus", true);
      }
    } else {
      return;
    }
  },
};
</script>
