import Vue from "vue";
import Vuex from "vuex";
import loginStore from "./modules/loginStore";
import transactionStore from "./modules/transactionStore";
import accPeriodStore from "./modules/accPeriodStore";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user: loginStore,
    transaction: transactionStore,
    accPeriod: accPeriodStore
  }
});
