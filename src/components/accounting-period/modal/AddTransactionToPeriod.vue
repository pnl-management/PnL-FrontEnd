<template>
  <div>
    <el-table v-loading="loading" :data="listTransaction">
      <el-table-column prop="id" label="ID" width="50"></el-table-column>
      <el-table-column
        prop="date"
        label="Ngày tạo"
        width="100"
      ></el-table-column>
      <el-table-column prop="time" label="Giờ tạo" width="90"></el-table-column>
      <el-table-column
        prop="store"
        label="Cửa hàng"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="Tên giao dịch"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="type"
        label="Loại giao dịch"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="value"
        label="Số tiền (VNĐ)"
        width="120"
      ></el-table-column>
      <el-table-column label="Trạng thái" width="180">
        <template slot-scope="scope">
          <el-tag :type="scope.row.color" disable-transitions>{{
            scope.row.status
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Trạng thái" width="110">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="addToPeriod(scope.row.id)"
            >Thêm</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { status } from "../../../enum/TransactionStatusEnum";
import { type } from "../../../enum/TypeEnum";
import { addTransactionToPeriod } from "../../../api/AccPeriodApi";
export default {
  props: ["id"],
  name: "AddTransactionToPeriod",
  data() {
    return {
      listTransaction: [],
      dialogVisible: false,
      loading: false
    };
  },
  computed: {
    ...mapGetters("user", ["user"]),
    ...mapGetters("transaction", ["allTransaction", "transactionLength"]),
    getUser() {
      let user = localStorage.getItem("user");
      return JSON.parse(user);
    },
    getAllTransactionFromStore() {
      return this.allTransaction;
    }
  },
  methods: {
    ...mapActions("transaction", ["getAvailableTransaction"]),

    goToDetail(id) {
      this.dialogVisible = true;
      this.id = id;
    },

    getTableData(list) {
      this.listTransaction = [];
      list.forEach(data => {
        let transaction = {
          id: data.id,
          name: data.name,
          value: data.value,
          type: type.get(data.category.type),
          date: this.getDateCreate(data.createdTime),
          time: this.getTimeCreate(data.createdTime),
          store: data.store.name,
          creator: data.createBy.username,
          status: data.lastestStatus
            ? status.get(data.lastestStatus.status).name
            : status.get(0).name,
          color: data.lastestStatus
            ? status.get(data.lastestStatus.status).color
            : status.get(0).color
        };
        this.listTransaction.push(transaction);
      });
    },

    getDateCreate(createdDate) {
      let date = new Date(createdDate);
      let mm = date.getMonth() + 1;
      let dd = date.getDate();
      return (
        date.getFullYear() +
        "-" +
        (mm > 9 ? "" : "0") +
        mm +
        "-" +
        (dd > 9 ? "" : "0") +
        dd
      );
    },

    getTimeCreate(createdDate) {
      let date = new Date(createdDate);
      let hh = date.getHours();
      let mm = date.getMinutes();
      let ss = date.getSeconds();
      return (
        (hh > 9 ? "" : "0") +
        hh +
        ":" +
        (mm > 9 ? "" : "0") +
        mm +
        ":" +
        (ss > 9 ? "" : "0") +
        ss
      );
    },

    addToPeriod(idTrans) {
      this.loading = true;
      addTransactionToPeriod(this.getUser.token, this.id, idTrans).then(
        response => {
          if (response.status == 200) {
            this.loading = false;
            this.$message({
              message: "Update thành công",
              type: "success"
            });
            this.getTransactions();
          }
        }
      );
    },

    async getTransactions() {
      await this.getAvailableTransaction(this.getUser.token);
      this.getTableData(
        JSON.parse(JSON.stringify(this.getAllTransactionFromStore))
      );
    }
  },
  created() {
    this.loading = true;
    this.getTransactions();
    this.loading = false;
  }
};
</script>
