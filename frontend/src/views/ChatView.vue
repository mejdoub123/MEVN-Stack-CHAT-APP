<template>
  <div class="page-wrapper">
    <div class="page-body">
      <div class="container-xl">
        <div class="card">
          <div class="card-body">
            <a
              class="btn"
              @click="onClick"
              role="button"
              aria-controls="offcanvasStart"
            >
              <span>
                <!-- Download SVG icon from http://tabler-icons.io/i/search -->
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
                  <circle cx="10" cy="10" r="7"></circle>
                  <line x1="21" y1="21" x2="15" y2="15"></line>
                </svg>
              </span>
              Search User...
            </a>
          </div>
        </div>
        <div class="row row-deck row-cards mt-2" style="height: 700px">
          <MyChats />
          <SingleChat />
        </div>

        <SideDrawer :show="show" @change-show="onClick" />
        <div v-show="show" class="offcanvas-backdrop fade show"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import router from "@/router";
import SideDrawer from "../components/chat/SideDrawer.vue";
import MyChats from "../components/chat/MyChats.vue";
import SingleChat from "../components/chat/SingleChat.vue";
export default {
  name: "chat-view",
  data() {
    return {
      show: false,
    };
  },
  components: {
    SideDrawer,
    MyChats,
    SingleChat,
  },
  computed: mapGetters(["loginStatus", "currentUser"]),
  methods: {
    ...mapActions(["getAllChats"]),
    onClick() {
      this.show = !this.show;
    },
  },
  created() {
    if (localStorage.getItem("userInfo")) {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      if (user) {
        this.$store.commit("setCurrentUser", user);
        this.$store.commit("setLoginStatus", true);
        this.getAllChats();
      }
    } else {
      router.push("/signin");
    }
  },
};
</script>
<style scoped></style>
