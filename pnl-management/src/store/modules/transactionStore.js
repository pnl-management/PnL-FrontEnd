import Vue from "vue";
import Vuex from "vuex";
import {
  getWaitingTransactions,
  getAllTransactions,
  getTransactionLength,
  getAvailableTransaction,
  getDetailTransaction,
  getTransactionEvidences
} from "../../api/transactionApi";

Vue.use(Vuex);
export default ({
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
      img: null,
    }
  },
  getters: {
    waitingTransactions(state) {
      return state.waitingTransactions
    },
    allTransaction(state) {
      return state.allTransaction
    },
    transactionLength(state) {
      return state.transactionLength
    },
    transaction(state){
      return state.transaction
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
  },
  actions: {
    async getWaitingTransactions({ commit }, idToken) {
      await getWaitingTransactions(idToken)
        .then((response) => {
          if (response.status === 200) {
            commit("SET_WAITING_TRANSACTIONS", response.data);
          } else {
            commit("SET_WAITING_TRANSACTIONS", null);
          }
        })
    },

    async getAvailableTransaction({ commit }, idToken) {
      await getAvailableTransaction(idToken)
        .then((response) => {
          if (response.status === 200) {
            commit("SET_AVAL_TRANSACTIONS", response.data);
          } else {
            commit("SET_AVAL_TRANSACTIONS", 0);
          }
        })
    },

    async getAllTransactions({ commit }, params) {
      await getAllTransactions(params)
        .then((response) => {
          if (response.status === 200) {
            commit("SET_ALL_TRANSACTIONS", response.data);
          } else {
            commit("SET_ALL_TRANSACTIONS", 0);
          }
        })
    },

    async getTransactionLength({ commit }, idToken) {
      await getTransactionLength(idToken)
        .then((response) => {
          if (response.status === 200) {
            commit("SET_TRANSACTION_LENGTH", response.data);
          } else {
            commit("SET_TRANSACTION_LENGTH", null);
          }
        })
    },

    async getTransactionDetail({ commit }, data){
      let transaction = {
        name: null,
        id: null,
        type: null,
        state: null,
        date: null,
        desc: null,
        value: null,
        img: null,
      };
      await getDetailTransaction(data.idToken, data.id).then(response =>{
        if (response.status === 200) {
          let data = response.data;
          transaction = {
            name: data.name,
            id: data.id,
            type: data.category.type,
            state: data.lastestStatus
              ? data.lastestStatus.status
              : 0,
            date: data.lastestStatus
              ? data.lastestStatus.createTime
              : "01-01-2020",
            desc: data.description,
            value: data.value
          }
        }
      })

      await getTransactionEvidences(data.idToken,data.id).then(response => {
        if(response.status == 200){
          if(response.data.length != 0)
            transaction.img = response.data[0].url;
        }
      })

      commit("SET_TRANSACTIONS_DETAIL", transaction);
    }
  }
});