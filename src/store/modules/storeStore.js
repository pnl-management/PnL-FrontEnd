import Vue from "vue";
import Vuex from "vuex";
import { getAllStoreByBrand, getStoreByID } from "../../api/storeApi";
Vue.use(Vuex);
export default {
  namespaced: true,
  state: {
    listStore: [],
    store: {
      id: null,
      name: null,
      phone: null,
      address: null
    }
  },
  getters: {
    getListStore(state) {
      return state.listStore;
    },
    getStore(state) {
      return state.store;
    }
  },
  mutations: {
    SET_LIST_STORE(state, data) {
      state.listStore = data;
    },
    SET_STORE(state, data) {
      state.store = data;
    }
  },
  actions: {
    async getStoreByBrand({ commit }, IdToken) {
      await getAllStoreByBrand(IdToken).then(response => {
        if (response.status === 200) {
          commit("SET_LIST_STORE", response.data);
        } else {
          commit("SET_LIST_STORE", 0);
        }
      });
    },

    async getStoreById({ commit }, params) {
      await getStoreByID(params.idToken, params.id).then(response => {
        if (response.status === 200) {
          let data = response.data;
          let store = {
            id: data.id,
            name: data.name,
            phone: data.phone,
            address: data.address
          };
          commit("SET_STORE", store);
        } else {
          commit("SET_STORE", 0);
        }
      });
    }
  }
};
