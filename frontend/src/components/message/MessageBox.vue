<template>
  <div
    style="
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    "
  >
    <div
      style="
        height: 90%;
        width: 100%;
        background-color: #e2e8f0;
        border-radius: 10px;
        display: flex;
        flex-direction: row;
      "
    >
      <div
        id="container-messages"
        class="list-group list-group-flush overflow-auto"
        style="
          width: 100%;
          max-height: 650px;
          display: flex;
          align-self: flex-end;
          align-content: flex-end;
          padding: 10px;
        "
      >
        <div
          :key="message._id"
          v-for="message in allMessagesForTheSelectedChat"
          :style="
            message.sender._id === currentUser._id
              ? 'align-self: flex-end; padding:3px 5px; background-color:#ffffff; border-radius:4px; margin-top:5px;'
              : 'align-self: flex-start; padding:3px 5px; background-color:#64748b; color:#ffffff; border-radius:4px; margin-top:5px;'
          "
        >
          <div v-if="message.sender._id === currentUser._id">
            {{ message.content }}
          </div>
          <div v-else-if="currentSelectedChat.isGroupChat">
            {{ message.sender.name + ": " + message.content }}
          </div>
          <div v-else>
            {{ message.content }}
          </div>
        </div>
      </div>
    </div>
    <div
      style="
        width: 100%;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
      "
    >
      <div class="mb-3">
        <input
          @keypress="typingIndicator(messageToSend), theOtherStatus()"
          @change="handleSendMessage"
          v-model="messageToSend"
          type="text"
          class="form-control"
          placeholder="Message..."
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "messagebox-component",
  data() {
    return {
      messageToSend: "",
    };
  },

  computed: mapGetters([
    "currentSelectedChat",
    "allMessagesForTheSelectedChat",
    "currentUser",
    "isTypingStatus",
  ]),
  methods: {
    ...mapActions([
      "sendMessage",
      "updateWhenMessageRecieved",
      "handleTyping",
      "typingIndicator",
      "theOtherStatus",
    ]),
    scrollToBottom() {
      const container = this.$el.querySelector("#container-messages");
      container.scrollTop = container.scrollHeight;
    },
    handleSendMessage() {
      const params = {
        msg: this.messageToSend,
        chatId: this.currentSelectedChat._id,
      };
      this.messageToSend = "";
      this.sendMessage(params);
      this.updateWhenMessageRecieved();
    },
  },
  updated() {
    this.scrollToBottom();
  },
};
</script>
<style scoped></style>
