<template>
  <span class="badge bg-indigo-lt w-100"
    >{{ user.name
    }}<svg
      @click="onClick"
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-user-x"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      style="cursor: pointer"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
      <path d="M17 9l4 4m0 -4l-4 4"></path>
    </svg>
  </span>
</template>
<script>
export default {
  name: "user-badge-item",
  props: {
    user: Object,
  },
  methods: {
    onClick() {
      this.$emit("handle-delete");
    },
  },
};
</script>
<style scoped></style>
