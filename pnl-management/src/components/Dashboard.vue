<template>
  <div>
    <el-main>
      <div style="text-align:left">
        <span class="title">Tổng quan</span>
        <!-- <el-button style="float: right" size="small" icon="el-icon-date">Năm nay</el-button> -->
      </div>
      <div style="small">
        <!-- <line-chart :data="data" :options="this.options"></line-chart> -->
        <iframe width="100%" height="450" src="https://datastudio.google.com/embed/reporting/f38dc23e-311c-47c1-872f-a06306172e97/page/T8pXB" frameborder="0" style="border:0" allowfullscreen></iframe>
      </div>
      <div style="text-align:left;padding: 20px 0px;">
        <span class="title">Yêu cầu xác nhận</span>
      </div>
      <div>
        <el-table :data="listWaitTransaction">
          <el-table-column prop="brand" label="Nhãn hiệu" width="150"></el-table-column>
          <el-table-column prop="store" label="Cửa hàng" width="150"></el-table-column>
          <el-table-column prop="name" label="Tên giao dịch" width="250"></el-table-column>
          <el-table-column prop="type" label="Loại giao dịch" width="120"></el-table-column>
          <el-table-column prop="value" label="Số tiền (VNĐ)" width="150"></el-table-column>
          <el-table-column label="Chi tiết" width="120">
            <el-button type="text" size="small" >Chi tiết</el-button>
          </el-table-column>
          <el-table-column label="Trạng thái" width="150">
            <template slot-scope="scope">
              <el-tag :type="scope.row.color" disable-transitions>{{scope.row.status}}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-main>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
// import LineChart from "../chart/LineChart";
import { status } from "../enum/TransactionStatusEnum";
import {type} from "../enum/TransactionTypeEnum";
export default {
  components: {
    // LineChart
  },
  data() {
    return {
      data: {
        labels: [
          "Quý 1 / 2020",
          "Quý 2 / 2020",
          "Quý 3 / 2020",
          "Quý 4 / 2020"
        ],
        datasets: [
          {
            label: "Lợi nhuận",
            backgroundColor: "#f87979",
            data: [10, 30, 20, 40]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      },
      listWaitTransaction: []
    };
  },
  computed: {
    ...mapGetters("user", ["user"]),
    ...mapGetters("transaction", ["waitingTransactions"]),
    getUser() {
      return this.user;
    },
    getWaitingTransactionFromStore() {
      return this.waitingTransactions;
    }
  },

  methods: {
    ...mapActions("transaction", ["getWaitingTransactions"]),
    getTableData(list) {
      list.forEach(data => {
        let transaction = {
          id : name.id,
          name: data.name,
          value: data.value,
          type: type.get(data.category.type),
          createBy: data.createByParticipant.username,
          brand: data.brand.name,
          store: data.store.name,
          status: status.get(data.lastestStatus.status).name,
          color: status.get(data.lastestStatus.status).color,
        };
        this.listWaitTransaction.push(transaction);
      });
    },

    goToDetail(){
       this.$router.replace({name: "transactionDetail"})
    },
  },

  async created() {
    await this.getWaitingTransactions(this.user.token);
    this.getTableData(
      JSON.parse(JSON.stringify(this.getWaitingTransactionFromStore))
    );
    console.log(this.waitTrasactionList);
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
</style>