<template>
  <div class="border-top-wide border-primary d-flex flex-column">
    <div class="page page-center">
      <div class="container-tight py-4">
        <div class="text-center mb-4">
          <a href="." class="navbar-brand navbar-brand-autodark"
            ><img
              src="../../assets/Logo-removebg-preview.png"
              height="36"
              alt=""
          /></a>
        </div>
        <form class="card card-md" action="." method="get">
          <div class="card-body">
            <h2 class="card-title text-center mb-4">Forgot password</h2>
            <p class="text-muted mb-4">
              Enter your email address and your password will be reset and
              emailed to you.
            </p>
            <div class="mb-3">
              <label class="form-label">Email address</label>
              <input
                type="email"
                class="form-control"
                placeholder="Enter email"
              />
            </div>
            <div class="form-footer">
              <a href="#" class="btn btn-primary w-100">
                <!-- Download SVG icon from http://tabler-icons.io/i/mail -->
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
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <polyline points="3 7 12 13 21 7" />
                </svg>
                Send me new password
              </a>
            </div>
          </div>
        </form>
        <div class="text-center text-muted mt-3">
          Forget it, <router-link to="/signin">send me back</router-link> to the
          sign in screen.
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "forgetpassword-component",
};
</script>
<style scoped></style>
