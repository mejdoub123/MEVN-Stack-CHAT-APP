<template>
  <div class="navbar navbar-expand-md navbar-light d-print-none">
    <div class="container-xl">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbar-menu"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <h1
        class="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3"
      >
        <router-link to="/">
          <img
            src="../../assets/Logo-removebg-preview.png"
            width="130"
            height="40"
            alt="Tabler"
            class="navbar-brand-image"
          />
        </router-link>
      </h1>
      <div class="navbar-nav flex-row order-md-last">
        <div class="nav-item d-none d-md-flex me-3">
          <div class="btn-list">
            <div class="col-6 col-sm-4 col-md-2 col-xl-auto mb-3">
              <router-link
                to="/"
                class="btn btn-bitbucket w-100 btn-icon"
                rel="noreferrer"
              >
                <!-- Download SVG icon from http://tabler-icons.io/i/brand-github -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-home"
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
                  <polyline points="5 12 3 12 12 3 21 12 19 12"></polyline>
                  <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
                  <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
                </svg>
              </router-link>
            </div>

            <router-link
              v-show="!loginStatus && this.$route.path !== '/signin'"
              to="/signin"
              class="btn"
              rel="noreferrer"
            >
              <!-- Download SVG icon from http://tabler-icons.io/i/brand-github -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-user-circle"
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
                <circle cx="12" cy="12" r="9"></circle>
                <circle cx="12" cy="10" r="3"></circle>
                <path
                  d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"
                ></path>
              </svg>
              Sign In
            </router-link>
            <router-link
              v-show="!loginStatus && this.$route.path !== '/signup'"
              to="/signup"
              class="btn"
              rel="noreferrer"
            >
              <!-- Download SVG icon from http://tabler-icons.io/i/heart -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-user-plus"
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
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                <path d="M16 11h6m-3 -3v6"></path>
              </svg>
              Sign Up
            </router-link>
            <div class="nav-item dropdown d-none d-md-flex me-3">
              <a
                v-show="loginStatus"
                href="#"
                class="nav-link px-0"
                data-bs-toggle="dropdown"
                tabindex="-1"
                aria-label="Show notifications"
              >
                <!-- Download SVG icon from http://tabler-icons.io/i/bell -->
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
                  <path
                    d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6"
                  ></path>
                  <path d="M9 17v1a3 3 0 0 0 6 0v-1"></path>
                </svg>
                <span
                  v-show="allNotifications.length !== 0"
                  class="badge bg-red"
                ></span>
              </a>
              <div
                class="dropdown-menu dropdown-menu-end dropdown-menu-card"
                style="width: 300px"
              >
                <div class="card">
                  <div v-if="allNotifications.length === 0" class="card-body">
                    No new Messages
                  </div>
                  <div
                    v-else
                    :key="message._id"
                    v-for="message in allNotifications"
                    class="card-body"
                  >
                    <NotificationMessage
                      :message="message"
                      style="cursor: pointer"
                      @click="onClick(message)"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div v-show="loginStatus" class="nav-item dropdown">
              <a
                href="#"
                class="nav-link d-flex lh-1 text-reset p-0"
                data-bs-toggle="dropdown"
                aria-label="Open user menu"
              >
                <span
                  class="avatar avatar-sm"
                  :style="'background-image: url(' + currentUser.pic + ')'"
                ></span>
                <div class="d-none d-xl-block ps-2">
                  <div>{{ currentUser.name }}</div>
                  <div class="mt-1 small text-muted">
                    {{ currentUser.email }}
                  </div>
                </div>
              </a>
              <div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <a
                  href="#"
                  class="dropdown-item"
                  data-bs-toggle="modal"
                  data-bs-target="#modal-simple"
                  >Profile &amp; account</a
                >

                <div class="dropdown-divider"></div>

                <button @click="logoutUser" class="dropdown-item">
                  Logout
                </button>
              </div>
            </div>
            <div
              v-show="!loginStatus"
              class="col-6 col-sm-4 col-md-2 col-xl-auto mb-3"
            >
              <a
                href="https://github.com/mejdoub123"
                target="_blank"
                class="btn btn-github w-100"
              >
                <!-- Download SVG icon from http://tabler-icons.io/i/brand-github -->
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
                  <path
                    d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"
                  ></path>
                </svg>
                Github
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ModalProfile :user="currentUser" :className="'modal-simple'" />
  </div>
</template>
<script>
import ModalProfile from "../chat/ModalProfile.vue";
import NotificationMessage from "../message/NotificationMessage.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "navbar-component",
  components: {
    ModalProfile,
    NotificationMessage,
  },
  methods: {
    ...mapActions(["logoutUser", "joinRoom"]),
    onClick(message) {
      if (this.currentSelectedChat !== message.chat) {
        this.$store.commit("setCurrentSelectedChat", message.chat);
        this.$store.commit("deleteNotification", message);
        this.$store.dispatch("fetchAllMessages");
        this.joinRoom();
        return;
      }
    },
  },
  computed: mapGetters([
    "loginStatus",
    "currentUser",
    "allNotifications",
    "setCurrentSelectedChat",
  ]),
};
</script>
<style scoped></style>
