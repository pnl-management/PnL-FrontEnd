<template>
  <div>
    <el-main>
      <div style="text-align:left">
        <span class="title">Tổng quan</span>
        <!-- <el-button style="float: right" size="small" icon="el-icon-date">Năm nay</el-button> -->
      </div>
      <div style="small">
        <!-- <line-chart :data="data" :options="this.options"></line-chart> -->
        <iframe
          width="100%"
          height="450"
          src="https://datastudio.google.com/embed/reporting/f38dc23e-311c-47c1-872f-a06306172e97/page/T8pXB"
          frameborder="0"
          style="border:0"
          allowfullscreen
        ></iframe>
      </div>
      <div style="text-align:left;padding: 20px 0px;">
        <span class="title">Yêu cầu xác nhận</span>
      </div>
      <div>
        <el-table
          :data="listReceipt"
          :default-sort="{ prop: 'id', order: 'descending' }"
        >
          <el-table-column prop="id" label="ID" width="50"></el-table-column>
          <el-table-column
            prop="date"
            label="Ngày tạo"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="time"
            label="Giờ tạo"
            width="90"
          ></el-table-column>
          <el-table-column
            prop="store"
            label="Cửa hàng"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="Tên giao dịch"
            width="150"
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
          <el-table-column
            prop="creator"
            label="Người tạo"
            width="120"
          ></el-table-column>
          <el-table-column label="Chi tiết" width="70">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="goToDetail(scope.row.id)"
                >Chi tiết</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="Trạng thái" width="180">
            <template slot-scope="scope">
              <el-tag :type="scope.row.color" disable-transitions>
                {{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="Chi Tiết Hoá Đơn" :visible.sync="dialogVisible">
          <ReceiptDetail v-bind:id="id" v-if="dialogVisible" />
        </el-dialog>
      </div>
    </el-main>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
// import LineChart from "../chart/LineChart";
import { status } from "../enum/ReceiptEnum";
import { type } from "../enum/TypeEnum";
import ReceiptDetail from "./receipt/modal/ReceiptDetail";
import EventBus from "../EventBus";
export default {
  components: {
    // LineChart
    ReceiptDetail
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
      listReceipt: [],
      dialogVisible: false
    };
  },
  computed: {
    ...mapGetters("user", ["user"]),
    ...mapGetters("receipt", ["getListReceipt"]),

    getUser() {
      let user = localStorage.getItem("user");
      return JSON.parse(user);
    },
    getAllReceipt() {
      return this.getListReceipt;
    }
  },

  methods: {
    ...mapActions("receipt", ["getReceiptByBrand"]),
    getTableData(list) {
      this.listReceipt = [];
      list.forEach(data => {
        let receipt = {
          id: data.id,
          name: data.name,
          value: data.value,
          type: type.get(data.category.type),
          date: this.getDateCreate(data.createdTime),
          time: this.getTimeCreate(data.createdTime),
          store: data.store.name,
          creator: data.createBy.username,
          status: status.get(data.status).name,
          color: status.get(data.status).color
        };
        if (data.status == 0) {
          this.listReceipt.push(receipt);
        }
      });
    },

    goToDetail(id) {
      this.dialogVisible = true;
      this.id = id;
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

    async getReceipt() {
      let params = {
        IdToken: this.getUser.token,
        brandId: this.getUser.brand
      };
      await this.getReceiptByBrand(params);
      this.getTableData(JSON.parse(JSON.stringify(this.getAllReceipt)));
    }
  },

  async created() {
    this.getReceipt();
  },

  mounted() {
    EventBus.$on("CloseReceiptDetailDialog", value => {
      this.dialogVisible = value;
      this.getReceipt();
    });
  },

  destroyed() {
    EventBus.$off("CloseReceiptDetailDialog");
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
