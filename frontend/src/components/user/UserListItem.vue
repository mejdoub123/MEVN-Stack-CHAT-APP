<template>
  <div class="list-group-item">
    <div class="row align-items-center">
      <div class="col-auto">
        <span
          class="avatar avatar-sm"
          :style="'background-image: url(' + user.pic + ')'"
        ></span>
      </div>
      <div class="col-7">
        <div class="text-truncate">
          {{ user.name }}
        </div>
        <div class="text-nowrap text-muted">{{ user.email }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "user-list-item",
  props: {
    user: Object,
    // accessChat: Function,
  },
};
</script>
<style scoped></style>
