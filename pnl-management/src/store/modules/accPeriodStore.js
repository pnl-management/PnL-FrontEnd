import Vue from "vue";
import Vuex from "vuex";
import { getAllAccPeriod } from "../../api/AccPeriodApi";
Vue.use(Vuex);
export default {
  namespaced: true,
  state: {
    accPeriod: []
  },
  getters: {
    accPeriod(state) {
      return state.accPeriod;
    }
  },
  mutations: {
    SET_ACC_PERIOD(state, data) {
      state.accPeriod = data;
    }
  },
  actions: {
    async getAllAccPeriod({ commit }, IdToken) {
      await getAllAccPeriod(IdToken).then(response => {
        if (response.status === 200) {
          commit("SET_ACC_PERIOD", response.data);
        } else {
          commit("SET_ACC_PERIOD", 0);
        }
      });
    }
  }
};
