<template>
  <div
    class="modal modal-blur fade"
    id="modal-update-group-chat"
    tabindex="-1"
    style="display: none"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">{{ currentSelectedChat.chatName }}</h2>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <div class="row g-3">
            <div
              :key="user.id"
              v-for="user in currentSelectedChat.users"
              class="col-6"
            >
              <UserBadgeItem
                v-if="user._id !== currentUser._id"
                @handle-delete="handleRemoveFromGroup(user._id)"
                :user="user"
                style="justify-content: space-between"
              />
            </div>
            <div class="row g-3">
              <div class="col-6">
                <input
                  v-model="groupName"
                  type="text"
                  class="form-control"
                  placeholder="Chat name"
                />
              </div>
              <div class="col-6">
                <button
                  @click="handleUpdateGroupName"
                  type="button"
                  class="btn btn-success"
                >
                  <!-- Download SVG icon from http://tabler-icons.io/i/check -->
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
                    <path d="M5 12l5 5l10 -10"></path>
                  </svg>
                  Update
                </button>
              </div>
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
            <div :key="user._id" v-for="user in lastSearchResults" class="mt-3">
              <UserListItem
                @click="handleGroup(user)"
                :user="user"
                style="cursor: pointer"
              />
            </div>
          </div>
          <div class="mt-3">
            <button
              @click="handleRemoveFromGroup(currentUser._id)"
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
            >
              <!-- Download SVG icon from http://tabler-icons.io/i/trash -->

              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-arrow-narrow-right"
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
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <line x1="15" y1="16" x2="19" y2="12"></line>
                <line x1="15" y1="8" x2="19" y2="12"></line>
              </svg>
              Leave The Group
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UserBadgeItem from "../user/UserBadgeItem.vue";
import UserListItem from "../user/UserListItem.vue";
import { mapActions, mapGetters } from "vuex";
import { createToaster } from "@meforma/vue-toaster";

//Define Toaster
const toaster = createToaster({});
export default {
  name: "update-group-chat-modal",
  data() {
    return {
      groupName: "",
      userToAdd: "",
      params: {
        userId: "",
        chatId: "",
      },
    };
  },
  computed: mapGetters([
    "lastSearchResults",
    "currentSelectedChat",
    "currentUser",
  ]),
  components: {
    UserBadgeItem,
    UserListItem,
  },
  methods: {
    ...mapActions([
      "handleSearch",
      "removeUserFromGroup",
      "addUserToGroup",
      "renameGroupChat",
    ]),
    handleGroup(user) {
      if (this.currentSelectedChat.users.find((u) => u._id === user._id)) {
        toaster.warning(`User already Added`, { position: "bottom" });
        return;
      }
      this.params.userId = user._id;
      this.params.chatId = this.currentSelectedChat._id;
      this.addUserToGroup(this.params);
      this.$store.commit("setSearchResults", {});
    },
    handleRemoveFromGroup(userId) {
      this.params.userId = userId;
      this.params.chatId = this.currentSelectedChat._id;
      this.removeUserFromGroup(this.params);
    },
    handleUpdateGroupName() {
      const params = {
        chatId: this.currentSelectedChat._id,
        chatName: this.groupName,
      };
      this.renameGroupChat(params);
      this.groupName = "";
    },
  },
};
</script>
<style scoped></style>
