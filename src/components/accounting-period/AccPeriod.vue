<template>
  <div>
    <el-main>
      <div style="text-align:left;padding: 20px 0px;">
        <span class="title">Báo cáo giao dịch</span>
      </div>
      <div class="select">
        <el-button @click="goToDetail(0)">Tạo mới</el-button>
      </div>
      <div>
        <el-table :data="listAccPeriod">
          <!-- <el-table-column prop="id" label="ID" width="50"></el-table-column> -->
          <el-table-column
            prop="title"
            label="Tiêu đề"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="startDate"
            label="Ngày bắt đầu"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="endDate"
            label="Ngày kết thúc"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="deadline"
            label="Ngày kết sổ"
            width="150"
          ></el-table-column>
          <el-table-column label="Chỉnh sửa" width="150">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="goToDetail(scope.row.id)"
                >Chi tiết</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="Trạng thái" width="150">
            <template slot-scope="scope">
              <el-tag :type="scope.row.color" disable-transitions>{{
                scope.row.status
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="Option" width="200">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="goToAddTransaction(scope.row.id)"
                >Thêm giao dịch</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :total="length"
          layout="prev, pager, next"
        ></el-pagination>-->
      </div>
    </el-main>
    <el-dialog
      :title="id == 0 ? 'Tạo kì kế toán mới' : 'Chi tiết kì kế toán'"
      :visible.sync="dialogVisible"
    >
      <AccPeriodDetail v-bind:id="id" v-if="dialogVisible" />
    </el-dialog>
    <el-dialog
      width="80%"
      title="Thêm giao dịch vào kì kế toán"
      :visible.sync="dialogAddVisible"
    >
      <AddTransactionToPeriodVue v-bind:id="id" v-if="dialogAddVisible" />
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { status } from "../../enum/AccPeriodEnum";
import AccPeriodDetail from "./modal/AccPeriodDetail";
import EventBus from "../../EventBus";
import AddTransactionToPeriodVue from "./modal/AddTransactionToPeriod.vue";
export default {
  components: {
    AccPeriodDetail,
    AddTransactionToPeriodVue
  },
  data() {
    return {
      listAccPeriod: [],
      value: 0,
      dialogVisible: false,
      dialogAddVisible: false,
      id: 0
    };
  },
  computed: {
    ...mapGetters("user", ["user"]),
    ...mapGetters("accPeriod", ["accPeriod"]),
    getUser() {
      return this.user;
    },
    getAllAccPeriodFromStore() {
      return this.accPeriod;
    }
  },
  methods: {
    ...mapActions("accPeriod", ["getAllAccPeriod"]),

    goToDetail(id) {
      // this.$router.push("/main/transactionDetail/" + id);
      this.dialogVisible = true;
      this.id = id;
    },

    goToAddTransaction(id) {
      // this.$router.push("/main/transactionDetail/" + id);
      this.dialogAddVisible = true;
      this.id = id;
    },

    getTableData(list) {
      this.listAccPeriod = [];
      list.forEach(data => {
        let accPeriod = {
          id: data.id,
          title: data.title,
          startDate: this.getDateCreate(data.startDate),
          endDate: this.getDateCreate(data.endDate),
          deadline: this.getDateCreate(data.deadline),
          status: status.get(data.status).name,
          color: status.get(data.status).color
        };
        this.listAccPeriod.push(accPeriod);
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

    async getTransactions() {
      await this.getAllAccPeriod(this.user.token);
      this.getTableData(
        JSON.parse(JSON.stringify(this.getAllAccPeriodFromStore))
      );
    }
  },
  created() {
    this.getTransactions();
  },

  mounted() {
    EventBus.$on("CloseAccPeriodDialog", value => {
      this.dialogVisible = value;
    });
  },

  destroyed() {
    EventBus.$on("CloseAccPeriodDialog", value => {
      this.dialogVisible = value;
    });
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
