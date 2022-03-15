<template>
  <div
    class="modal modal-blur fade"
    id="modal-report"
    tabindex="-1"
    style="display: none"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">Create Group Chat</h2>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <input
              v-model="params.groupName"
              type="text"
              class="form-control"
              placeholder="Chat name"
            />
          </div>
          <div class="mb-3">
            <input
              v-model="userToAdd"
              @keypress="handleSearch(userToAdd)"
              type="text"
              class="form-control"
              placeholder="Add users..."
            />
          </div>
          <div class="row g-3">
            <div :key="user.id" v-for="user in params.usersToAdd" class="col-6">
              <UserBadgeItem
                @handle-delete="handleDelete(user)"
                :user="user"
                style="justify-content: space-between"
              />
            </div>
          </div>
          <div :key="user._id" v-for="user in lastSearchResults" class="mt-3">
            <UserListItem
              @click="handleGroup(user)"
              :user="user"
              style="cursor: pointer"
            />
          </div>
        </div>
        <div class="modal-footer">
          <a
            href="#"
            class="btn btn-link link-secondary"
            data-bs-dismiss="modal"
          >
            Cancel
          </a>
          <a
            href="#"
            @click="createGroupChat(params)"
            class="btn btn-primary ms-auto"
            data-bs-dismiss="modal"
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
            Create new group
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UserListItem from "../user/UserListItem.vue";
import UserBadgeItem from "../user/UserBadgeItem.vue";
import { mapActions, mapGetters } from "vuex";
import { createToaster } from "@meforma/vue-toaster";

//Define Toaster
const toaster = createToaster({});
export default {
  name: "create-chat-model",
  data() {
    return {
      params: {
        groupName: "",
        usersToAdd: [],
      },

      userToAdd: "",
    };
  },
  components: {
    UserListItem,
    UserBadgeItem,
  },
  computed: mapGetters(["lastSearchResults"]),
  methods: {
    ...mapActions(["handleSearch", "createGroupChat"]),
    handleGroup(user) {
      if (this.params.usersToAdd.includes(user)) {
        toaster.warning(`User already Added`, { position: "bottom" });
        return;
      }

      this.params.usersToAdd.push(user);
      this.$store.commit("setSearchResults", {});
    },
    handleDelete(user) {
      this.params.usersToAdd = this.params.usersToAdd.filter(
        (userToAdd) => userToAdd._id !== user._id
      );
    },
  },
};
</script>
<style scoped></style>
