<template>
  <div id="app">
    <div id="nav">
      <router-link v-if="getUser.username == null" to="/login"></router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "App",
  computed: {
    ...mapGetters("user", ["user"]),

    getUser() {
      return this.user;
    }
  },
  mounted() {
    if (this.getUser.username == null) {
      this.$router.replace({ name: "login" });
    }
  }
};
</script>
