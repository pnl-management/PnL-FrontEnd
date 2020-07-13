<template>
  <div>
    <el-main>
      <div style="text-align:left;padding: 20px 0px;">
        <span class="title">Báo cáo giao dịch</span>
      </div>
      <div class="select">
        <el-select v-model="value">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div>
        <el-table :data="listTransaction">
          <!-- <el-table-column prop="id" label="ID" width="50"></el-table-column> -->
          <el-table-column prop="date" label="Ngày tạo" width="100"></el-table-column>
          <el-table-column prop="time" label="Giờ tạo" width="90"></el-table-column>
          <el-table-column prop="store" label="Cửa hàng" width="150"></el-table-column>
          <el-table-column prop="name" label="Tên giao dịch" width="150"></el-table-column>
          <el-table-column prop="type" label="Loại giao dịch" width="120"></el-table-column>
          <el-table-column prop="value" label="Số tiền (VNĐ)" width="120"></el-table-column>
          <el-table-column prop="creator" label="Người tạo" width="120"></el-table-column>
          <el-table-column label="Chi tiết" width="70">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="goToDetail(scope.row.id)">Chi tiết</el-button>
            </template>
          </el-table-column>
          <el-table-column label="Trạng thái" width="180">
            <template slot-scope="scope">
              <el-tag :type="scope.row.color" disable-transitions>{{scope.row.status}}</el-tag>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :total="length"
          layout="prev, pager, next"
        ></el-pagination>
      </div>
    </el-main>
    <el-dialog title="Chi tiết Giao dịch" :visible.sync="dialogVisible">
        <transaction-detail v-bind:id="id" v-if="dialogVisible"/>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { status } from "../../enum/TransactionStatusEnum";
import { type } from "../../enum/TransactionTypeEnum";
import TransactionDetail from "./modal/TransactionDetail";
import EventBus from '../../EventBus';
export default {
  components: {
    TransactionDetail
  },
  data() {
    return {
      pageOfItems: [],
      listTransaction: [],
      length: 0,
      currentPage: 1,
      options: [
        {
          value: 0,
          label: "Tất Cả"
        },
        {
          value: 1,
          label: "Doanh Thu"
        },
        {
          value: 2,
          label: "Chi Phí"
        }
      ],
      value: 0,
      dialogVisible : false,
      id : 0,
    };
  },
  computed: {
    ...mapGetters("user", ["user"]),
    ...mapGetters("transaction", ["allTransaction", "transactionLength"]),
    getUser() {
      return this.user;
    },
    getAllTransactionFromStore() {
      return this.allTransaction;
    }
  },
  methods: {
    ...mapActions("transaction", [
      "getAllTransactions",
      "getTransactionLength"
    ]),

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
          createBy: data.createByParticipant.username,
          date: this.getDateCreate(data.createdTime),
          time: this.getTimeCreate(data.createdTime),
          store: data.store.name,
          creator: data.createByParticipant.username,
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

    handleCurrentChange(val) {
      let offset = val * 10 - 10;
      this.getTransactions(offset);
    },

    async getTransactions(offset) {
      let params = {
        limit: 10,
        offset,
        token: this.user.token
      };
      await this.getAllTransactions(params);
      this.getTableData(
        JSON.parse(JSON.stringify(this.getAllTransactionFromStore))
      );
    },

    async getLength() {
      await this.getTransactionLength(this.user.token);
      this.length = this.transactionLength;
    },
  },

  mounted() {
      EventBus.$on("CloseTransactionDetailDialog",(value) =>{
      this.dialogVisible = value;
    })
  },

  destroyed() {
    EventBus.$off("CloseTransactionDetailDialog",(value) =>{
      this.dialogVisible = value;
    })
  },
  created() {
    this.getTransactions(0);
    this.getLength();
  }
};
</script>
<style scoped>
.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 89vh;
  width: 85vw;
}
.title {
  font-size: 25px;
}
.small {
  max-width: 500px;
}
.select {
  padding-bottom: 10px;
  text-align: left;
}
</style>