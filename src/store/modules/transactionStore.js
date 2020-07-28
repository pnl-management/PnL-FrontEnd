import Vue from "vue";
import Vuex from "vuex";
import {
  getWaitingTransactions,
  getAllTransactions,
  getTransactionLength,
  getAvailableTransaction,
  getDetailTransaction,
  getTransactionCategory
} from "../../api/transactionApi";

Vue.use(Vuex);
export default {
  namespaced: true,
  state: {
    waitingTransactions: [],
    allTransaction: [],
    transactionLength: 0,
    transaction: {
      name: null,
      id: null,
      type: null,
      state: null,
      date: null,
      desc: null,
      value: null,
      receipt: []
    },
    category: []
  },
  getters: {
    waitingTransactions(state) {
      return state.waitingTransactions;
    },
    allTransaction(state) {
      return state.allTransaction;
    },
    transactionLength(state) {
      return state.transactionLength;
    },
    transaction(state) {
      return state.transaction;
    },
    category(state) {
      return state.category;
    }
  },
  mutations: {
    SET_WAITING_TRANSACTIONS(state, data) {
      state.waitingTransactions = data;
    },
    SET_ALL_TRANSACTIONS(state, data) {
      state.allTransaction = data;
    },
    SET_TRANSACTION_LENGTH(state, data) {
      state.transactionLength = data;
    },
    SET_AVAL_TRANSACTIONS(state, data) {
      state.allTransaction = data;
    },
    SET_TRANSACTIONS_DETAIL(state, data) {
      state.transaction = data;
    },
    SET_CATEGORY(state, data) {
      state.category = data;
    }
  },
  actions: {
    async getWaitingTransactions({ commit }, idToken) {
      await getWaitingTransactions(idToken).then(response => {
        if (response.status === 200) {
          commit("SET_WAITING_TRANSACTIONS", response.data);
        } else {
          commit("SET_WAITING_TRANSACTIONS", null);
        }
      });
    },

    async getAvailableTransaction({ commit }, idToken) {
      await getAvailableTransaction(idToken).then(response => {
        if (response.status === 200) {
          commit("SET_AVAL_TRANSACTIONS", response.data);
        } else {
          commit("SET_AVAL_TRANSACTIONS", 0);
        }
      });
    },

    async getAllTransactions({ commit }, params) {
      await getAllTransactions(params).then(response => {
        if (response.status === 200) {
          commit("SET_ALL_TRANSACTIONS", response.data);
        } else {
          commit("SET_ALL_TRANSACTIONS", 0);
        }
      });
    },

    async getTransactionLength({ commit }, idToken) {
      await getTransactionLength(idToken).then(response => {
        if (response.status === 200) {
          commit("SET_TRANSACTION_LENGTH", response.data);
        } else {
          commit("SET_TRANSACTION_LENGTH", null);
        }
      });
    },

    async getTransactionDetail({ commit }, data) {
      let transaction = {
        name: null,
        id: null,
        type: null,
        state: null,
        date: null,
        desc: null,
        value: null,
        receipt: []
      };
      await getDetailTransaction(data.idToken, data.id).then(response => {
        if (response.status === 200) {
          let data = response.data;
          transaction = {
            name: data.name,
            id: data.id,
            type: data.category.id,
            state: data.lastestStatus ? data.lastestStatus.status : 0,
            date: data.lastestStatus
              ? data.lastestStatus.createTime
              : "01-01-2020",
            desc: data.description,
            value: data.value,
            receipt: data.listReceipt
          };
        }
      });
      commit("SET_TRANSACTIONS_DETAIL", transaction);
    },

    async getTransCategory({ commit }, idToken) {
      await getTransactionCategory(idToken).then(response => {
        if (response.status === 200) {
          commit("SET_CATEGORY", response.data);
        } else {
          commit("SET_CATEGORY", null);
        }
      });
    }
  }
};
