import Vue from "vue";
import Vuex from "vuex";
import {
  getAllReceipt,
  getDetailReceipt,
  getReceiptEvidences,
  getReceiptByStore
} from "../../api/receiptApi";
Vue.use(Vuex);
export default {
  namespaced: true,
  state: {
    listReceitp: [],
    receipt: {
      name: null,
      id: null,
      type: null,
      state: null,
      date: null,
      desc: null,
      value: null,
      img: null,
      storeId: null
    }
  },
  getters: {
    getListReceipt(state) {
      return state.listReceitp;
    },

    receipt(state) {
      return state.receipt;
    }
  },
  mutations: {
    SET_LIST_RECEIPT(state, data) {
      state.listReceitp = data;
    },
    SET_RECEIPT_DETAIL(state, data) {
      state.receipt = data;
    }
  },
  actions: {
    async getReceiptByBrand({ commit }, params) {
      await getAllReceipt(params.IdToken, params.brandId).then(response => {
        if (response.status === 200) {
          commit("SET_LIST_RECEIPT", response.data);
        } else {
          commit("SET_LIST_RECEIPT", 0);
        }
      });
    },

    async getReceiptDetail({ commit }, data) {
      let receipt = {
        name: null,
        id: null,
        type: null,
        state: null,
        date: null,
        desc: null,
        value: null,
        img: null,
        storeId: null
      };
      await getDetailReceipt(data.idToken, data.id).then(response => {
        if (response.status === 200) {
          let data = response.data;
          receipt = {
            name: data.name,
            id: data.id,
            type: data.category.name,
            state: data.status,
            date: data.createdTime,
            desc: data.description,
            value: data.value,
            storeId: data.store.id
          };
        }
      });

      await getReceiptEvidences(data.idToken, data.id).then(response => {
        if (response.status == 200) {
          if (response.data.length != 0) receipt.img = response.data[0].url;
        }
      });

      commit("SET_RECEIPT_DETAIL", receipt);
    },

    async getReceiptByStore({ commit }, params) {
      await getReceiptByStore(params.IdToken, params.storeId).then(response => {
        if (response.status === 200) {
          commit("SET_LIST_RECEIPT", response.data);
        } else {
          commit("SET_LIST_RECEIPT", 0);
        }
      });
    }
  }
};
