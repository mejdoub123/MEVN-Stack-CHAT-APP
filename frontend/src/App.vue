<template>
  <div>
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>
<script>
import Footer from "./components/layouts/Footer.vue";
import Navbar from "./components/layouts/Navbar.vue";
export default {
  components: {
    Footer,
    Navbar,
  },
};
</script>
<style></style>
