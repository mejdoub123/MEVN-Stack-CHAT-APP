<template>
  <div class="col-md-6 col-lg-4">
    <div class="card">
      <div class="card-header" style="justify-content: space-between">
        <h3 class="card-title">My Chats</h3>

        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#modal-report"
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
          Add a new group
        </button>
      </div>

      <div
        class="list-group list-group-flush overflow-auto"
        style="max-height: 25rem"
      >
        <div :key="chat._id" v-for="chat in allUserChats" class="m-2">
          <ChatListItem
            :chat="chat"
            @click="onClick(chat)"
            :style="currentSelectedChat === chat && 'background-color:#f1f5f9'"
          />
        </div>
      </div>
    </div>
    <CreateChatModel />
  </div>
</template>
<script>
import ChatListItem from "./ChatListItem.vue";
import CreateChatModel from "./CreateChatModel.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "my-chats-components",
  computed: mapGetters(["allUserChats", "currentSelectedChat"]),
  components: {
    ChatListItem,
    CreateChatModel,
  },
  methods: {
    ...mapActions(["joinRoom"]),
    onClick(chat) {
      if (this.currentSelectedChat !== chat) {
        this.$store.commit("setCurrentSelectedChat", chat);
        this.$store.dispatch("fetchAllMessages");
        this.joinRoom();
        return;
      }
    },
  },
};
</script>
<style scoped></style>
