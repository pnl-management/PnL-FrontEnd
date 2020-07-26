import Vue from "vue";
import Vuex from "vuex";
import loginStore from "./modules/loginStore";
import transactionStore from "./modules/transactionStore";
import accPeriodStore from "./modules/accPeriodStore";
import storeStore from "./modules/storeStore";
import receiptStore from "./modules/receiptStore";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user: loginStore,
    transaction: transactionStore,
    accPeriod: accPeriodStore,
    store: storeStore,
    receipt: receiptStore
  }
});
