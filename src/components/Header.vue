<template>
  <el-header style="text-align: right; font-size: 12px">
    <template>
      <span style="padding-right:30px">{{ getUser.username }}</span>
      <el-button size="mini" type="info" @click="signOut()">Thoát</el-button>
    </template>
  </el-header>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import firebase from "firebase";
export default {
  name: "Navbar",
  computed: {
    ...mapGetters("user", ["user"]),

    getUser() {
      let user = localStorage.getItem("user");
      console.log(JSON.parse(user));
      return JSON.parse(user);
    }
  },
  methods: {
    ...mapActions("user", ["logout"]),
    signOut() {
      console.log("ahihi");
      firebase
        .auth()
        .signOut()
        .then(async () => {
          await this.logout();
          this.$router.push({
            name: "login"
          });
        });
    }
  }
};
</script>
<style scoped>
.el-header {
  background-color: #343a40;
  color: #f4f4f4;
  line-height: 60px;
  width: 100%;
}
</style>
