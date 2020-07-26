<template>
  <div id="app">
    <div id="nav">
      <router-link to="/login"></router-link>
      <!-- <router-link v-else to="/main/dashboard"></router-link> -->
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
      let user = localStorage.getItem("user");
      return JSON.parse(user);
    }
  },
  mounted() {
    console.log(this.$router.history.current.fullPath);
    if (localStorage.getItem("user") == null) {
      this.$router.replace({ name: "login" });
    } else {
      if (this.$router.history.current.fullPath == "")
        this.$router.replace({ name: "dashboard" });
    }
  }
};
</script>
