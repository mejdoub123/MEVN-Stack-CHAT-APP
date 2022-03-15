<template>
  <div
    :class="
      !show ? 'offcanvas offcanvas-start' : 'offcanvas offcanvas-start show'
    "
    tabindex="-1"
    id="offcanvasStart"
    aria-labelledby="offcanvasStartLabel"
    aria-modal="true"
    :role="!show ? '' : 'dialog'"
    :style="!show ? 'visibility: hidden' : 'visibility: visible'"
  >
    <div class="offcanvas-header">
      <h2 class="offcanvas-title" id="offcanvasStartLabel">Search User</h2>
      <button
        type="button"
        class="btn-close text-reset"
        @click="onClick"
        data-bs-dismiss="offcanvas"
      ></button>
    </div>
    <div class="offcanvas-body">
      <div class="input-icon">
        <input
          type="text"
          class="form-control"
          placeholder="Search by name or email..."
          v-model="searchInput"
          aria-label="Search in website"
        />
      </div>

      <div class="mt-3">
        <button
          @click="handleSearch(searchInput)"
          type="button"
          :class="
            !loadingStatus
              ? 'btn btn-info w-100'
              : 'btn btn-info w-100 disabled'
          "
        >
          <div v-show="!loadingStatus">
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
            Go
          </div>
          <div v-show="loadingStatus">
            Loading<span class="animated-dots"></span>
          </div>
        </button>
      </div>
      <div :key="user._id" v-for="user in lastSearchResults" class="mt-3">
        <UserListItem
          @click="onClickChat(user._id)"
          :user="user"
          style="cursor: pointer"
        />
      </div>
    </div>
  </div>
</template>
<script>
import UserListItem from "../user/UserListItem.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "slideDrawer-component",
  data() {
    return {
      searchInput: "",
    };
  },
  components: {
    UserListItem,
  },
  computed: mapGetters(["loadingStatus", "lastSearchResults"]),
  props: {
    show: Boolean,
  },
  methods: {
    ...mapActions(["handleSearch", "accessChat"]),
    onClick() {
      this.$emit("change-show");
    },
    onClickChat(userId) {
      this.$store.commit("setSearchResults", {});
      this.accessChat(userId);
      this.$emit("change-show");
      this.searchInput = "";
    },
  },
};
</script>
<style scoped></style>
