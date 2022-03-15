<template>
  <div
    class="modal modal-blur fade"
    :id="className"
    tabindex="-1"
    style="display: none"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ user.name }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="card">
          <div class="empty">
            <div class="empty-img">
              <img :src="user.pic" height="128" class="rounded-3" alt="" />
            </div>
            <p class="empty-title">Email</p>
            <p class="empty-subtitle text-muted">
              {{ user.email }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "modalProfile-Component",
  props: {
    user: Object,
    className: String,
  },
};
</script>
<style scoped></style>
