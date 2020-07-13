import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default ({
  namespaced: true,
  state: {
    user: {
      fullname: null,
      role: null,
      username: null,
      token: null,
      brand: null,
    }
  },
  getters: {
    user(state) {
      return state.user
    }
  },
  mutations: {
    SET_USER(state, data) {
      state.user = data;
    }
  },
  actions: {
    fetchUser({ commit }, user) {

      if (user) {
        let currentUser = {
          fullname: user.participant.fullname,
          role: user.participant.role,
          username: user.participant.username,
          token: user.token,
          brand : user.participant.brand.id
        }
        commit("SET_USER", currentUser);
      } else {
        commit("SET_USER", null);
      }
    },

    logout({ commit }, user) {
      if (user) {
        let currentUser = {
          fullname: user.fullname,
          role: user.role,
          username: user.username,
          token: user.token,
          brand : user.brand.id
        }
        commit("SET_USER", currentUser);
      } 
    },

  }
});