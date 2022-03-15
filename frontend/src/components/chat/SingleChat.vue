<template>
  <div class="col-md-12 col-lg-8">
    <div class="card">
      <div
        v-show="Object.keys(currentSelectedChat).length != 0"
        class="card-header"
        style="justify-content: space-between"
      >
        <div>
          <h3 class="card-title">
            {{
              Object.keys(currentSelectedChat).length != 0 &&
              currentSelectedChat.isGroupChat
                ? currentSelectedChat.chatName
                : Object.keys(currentSelectedChat).length != 0 &&
                  !currentSelectedChat.isGroupChat &&
                  currentSelectedChat.users.filter(
                    (user) => user.name !== currentUser.name
                  )[0].name
            }}
          </h3>
          <div
            v-if="isTypingStatus"
            style="align-self: flex-start; color: #b1b8b8"
          >
            <h4>write<span class="animated-dots"></span></h4>
          </div>
        </div>
        <button
          v-show="
            Object.keys(currentSelectedChat).length != 0 &&
            currentSelectedChat.isGroupChat &&
            currentSelectedChat.groupAdmin._id === currentUser._id
          "
          class="btn btn-light w-10 btn-icon"
          data-bs-toggle="modal"
          data-bs-target="#modal-update-group-chat"
          aria-label="Vimeo"
        >
          <!-- Download SVG icon from http://tabler-icons.io/i/brand-vimeo -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-settings"
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
              d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"
            ></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </button>
        <button
          v-show="
            Object.keys(currentSelectedChat).length != 0 &&
            currentSelectedChat.isGroupChat &&
            currentSelectedChat.groupAdmin._id !== currentUser._id
          "
          @click="handleRemoveFromGroup"
          type="button"
          class="btn btn-danger"
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

        <button
          v-show="
            Object.keys(currentSelectedChat).length != 0 &&
            !currentSelectedChat.isGroupChat
          "
          class="btn btn-flickr w-10 btn-icon"
          data-bs-toggle="modal"
          data-bs-target="#modal-selected"
          aria-label="Vimeo"
        >
          <!-- Download SVG icon from http://tabler-icons.io/i/brand-vimeo -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-eye"
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
            <circle cx="12" cy="12" r="2"></circle>
            <path
              d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7"
            ></path>
          </svg>
        </button>
      </div>
      <div
        v-if="Object.keys(currentSelectedChat).length == 0"
        class="card-body"
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          background-color: #f1f5f9;
        "
      >
        <p>Click on a user to start chatting</p>
      </div>
      <div
        v-else
        class="card-body"
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          background-color: #f1f5f9;
        "
      >
        <MessageBox />
      </div>
      <!-- <div
      v-else-if="!loadingStatus"
        v-else
        class="spinner-border spinner-border-sm"
        style="height: 100px; width: 100px; align-self: center; margin: auto"
        role="status"
      ></div> -->
    </div>
    <UpdateGroupChatModal
      v-show="
        Object.keys(currentSelectedChat).length != 0 &&
        currentSelectedChat.isGroupChat
      "
    />
    <ModalProfile
      v-show="
        Object.keys(currentSelectedChat).length != 0 &&
        !currentSelectedChat.isGroupChat
      "
      :user="
        Object.keys(currentSelectedChat).length != 0 &&
        !currentSelectedChat.isGroupChat
          ? currentSelectedChat.users.filter(
              (user) => user.name !== currentUser.name
            )[0]
          : {}
      "
      :className="'modal-selected'"
    />
  </div>
</template>
<script>
import ModalProfile from "./ModalProfile.vue";
import UpdateGroupChatModal from "./UpdateGroupChatModal.vue";
import MessageBox from "../message/MessageBox.vue";
import io from "socket.io-client";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "single-chat-component",
  data() {
    return {
      socket: null,
    };
  },
  components: {
    ModalProfile,
    UpdateGroupChatModal,
    MessageBox,
  },
  computed: {
    ...mapGetters([
      "currentSelectedChat",
      "currentUser",
      "loadingStatus",
      "allMessagesForTheSelectedChat",
      "theSocket",
      "isTypingStatus",
    ]),
  },

  methods: {
    ...mapActions(["removeUserFromGroup", "fetchAllMessages", "initialSocket"]),
    handleRemoveFromGroup() {
      const params = {
        userId: this.currentUser._id,
        chatId: this.currentSelectedChat._id,
      };
      this.removeUserFromGroup(params);
    },
  },
  created() {
    // this.socket = io("http://localhost:8080/");
    // this.socket.emit("setup", this.currentUser);
    this.initialSocket();
  },
};
</script>
<style scoped></style>
