<template>
  <div class="list-group-item">
    <div class="row align-items-center">
      <div class="col-auto">
        <span
          class="avatar avatar-sm"
          :style="'background-image: url(' + message.sender.pic + ')'"
        ></span>
      </div>
      <div class="col-7">
        <div class="text-truncate">
          {{ message.sender.name }}
        </div>
        <div class="text-nowrap text-muted">{{ message.content }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "notification-item",
  props: {
    message: Object,
    // accessChat: Function,
  },
};
</script>
<style scoped></style>
