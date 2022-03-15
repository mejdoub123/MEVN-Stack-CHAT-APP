<template>
  <div class="card card-sponsor">
    <div class="row align-items-center p-2" style="cursor: pointer">
      <div v-show="!chat.isGroupChat" class="col-auto">
        <span
          class="avatar avatar-sm"
          :style="
            'background-image: url(' +
            chat.users.filter((user) => user.name !== currentUser.name)[0].pic +
            ')'
          "
        ></span>
      </div>
      <div class="col-7">
        <div class="text-truncate">
          {{
            !chat.isGroupChat
              ? chat.users.filter((user) => user.name !== currentUser.name)[0]
                  .name
              : chat.chatName
          }}
        </div>
        <div class="text-nowrap text-muted">
          {{
            chat.isGroupChat && chat.latestMessage
              ? chat.latestMessage.sender.name +
                ": " +
                chat.latestMessage.content
              : "This is a new conversation"
          }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "chat-list-item",
  props: {
    chat: Object,
    selected: Boolean,
  },
  computed: mapGetters(["currentUser"]),
};
</script>
<style scoped></style>
