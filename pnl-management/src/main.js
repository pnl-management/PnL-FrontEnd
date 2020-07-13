import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import * as firebase from "firebase";
import * as ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';

Vue.prototype.$http = axios
Vue.config.productionTip = false;

Vue.use(ElementUI);
var firebaseConfig = {
  apiKey: "AIzaSyCTZzRLdtmzdditdBSa6qqFTCiGKui0E6Y",
  authDomain: "pnlrepoter.firebaseapp.com",
  databaseURL: "https://pnlrepoter.firebaseio.com",
  projectId: "pnlrepoter",
  storageBucket: "pnlrepoter.appspot.com",
  messagingSenderId: "395794764180",
  appId: "1:395794764180:web:22ef83b9ae9869131cff81",
  measurementId: "G-VKC7M9T7QH"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
