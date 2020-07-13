<template>
  <div class="home">
    <div class="limiter">
      <div class="container">
        <div class="wrap-login">
          <form @submit.prevent="submit" class="login100-form">
            <span class="login100-form-title">PnL Quản lý</span>
            <div class="container-login100-form-btn">
              <button
                type="submit"
                class="login100-form-btn"
                v-loading.fullscreen.lock="fullscreenLoading"
              >
                <img src="../assets/icon-google.png" alt="GOOGLE" />
                Đăng nhập với Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapActions } from "vuex";
import { loginAuthen } from "../api/loginApi";
export default {
  data() {
    return {
      src: require("../assets/bg-01.jpg"),
      fullscreenLoading: false
    };
  },
  methods: {
    ...mapActions("user", ["fetchUser"]),
    submit() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => this.login())
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.email;
          const credential = error.credential;
          console.log(errorCode, errorMessage, email, credential);
        });
    },

    async login() {
      this.fullscreenLoading = true;
      let user = firebase.auth().currentUser;
      if (user) {
        let token = await user.getIdToken();
        console.log(token);
        loginAuthen(token).then(response => {
          console.log(response.data);
          if (response.status === 200 && response.data.participant.role === 3) {
            this.fetchUser(response.data);
            this.$message({
              message: "Login thành công",
              type: "success"
            });
            this.$router.push({ name: "dashboard" });
          } else {
            this.$message.error("Login không thành công, bạn không phải là kế toán trưởng");
            this.fullscreenLoading = false;
          }
        });
      }
      this.fullscreenLoading = true;
    }
  }
};
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}
.container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background: linear-gradient(to bottom, #0099ff 0%, #fff 100%);
}
.limiter {
  width: 100%;
  margin: 0 auto;
}
.wrap-login {
  width: 680px;
  background: #e6e6e6;
  border-radius: 10px;
  position: relative;
  padding: 62px 110px 33px 110px;
}
.login100-form-title {
  width: 100%;
  display: block;
  font-size: 39px;
  color: #555555;
  line-height: 1.2;
  text-align: center;
  padding-bottom: 53px;
}
.login100-form {
  width: 100%;
}
.wrap-login100 {
  width: 680px;
  background: #fff;
  border-radius: 10px;
  position: relative;
  height: 300px;
}

.container-login100-form-btn {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.login100-form-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  height: 60px;
  background-color: #f5f0f0;
  border-radius: 10px;
  font-size: 16px;
  color: rgb(19, 18, 18);
  line-height: 1.2;
  transition: all 0.4s;
  position: relative;
  z-index: 1;
}

.login100-form-btn::before {
  content: "";
  display: block;
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  top: 0;
  left: 0;
  background: #a64bf4;
  background: linear-gradient(45deg, #00dbde, #fc00ff);
  opacity: 0;
  transition: all 0.4s;
}

.login100-form-btn:hover:before {
  opacity: 1;
  border: none;
}

.login100-form-btn:hover {
  border: none;
}

.container-login100-form-btn img {
  width: 30px;
  margin-right: 15px;
  padding-bottom: 3px;
}
</style>

