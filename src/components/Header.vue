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
      return this.user;
    }
  },
  methods: {
    ...mapActions("user", ["logout"]),
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(async () => {
          let user = {
            fullname: null,
            role: null,
            username: null,
            token: null
          };
          await this.logout(user);
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
