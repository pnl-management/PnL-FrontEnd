<template>
  <div>
    <el-main>
      <div style="text-align:left;padding: 20px 0px;">
        <span class="title">Báo cáo lợi nhuận</span>
      </div>
      <div>
        <el-table :data="tableData" :row-class-name="this.tableRowClassName">
          <el-table-column
            prop="date"
            label="Thời gian"
            width="200px"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="Tên giao dịch"
            width="350px"
          ></el-table-column>
          <el-table-column
            prop="value"
            label="Số tiền (VNĐ)"
            width="300px"
          ></el-table-column>
          <el-table-column label="Chi tiết" width="250px">
            <el-button type="text" size="small" @click="goToDetail()"
              >Chi tiết</el-button
            >
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="50"
        ></el-pagination>
      </div>
    </el-main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "01/04/2020",
          name: "Lợi nhuận quý 1 năm 2020",
          value: "+10.000.000"
        },
        {
          date: "01/04/2020",
          name: "Lợi nhuận quý 2 năm 2020",
          value: "+1.000.000"
        },
        {
          date: "02/04/2020",
          name: "Lợi nhuận quý 3 năm 2020",
          value: "-10.000.000"
        },
        {
          date: "02/04/2020",
          name: "Lợi nhuận quý 4 năm 2020",
          value: "+1.000.000"
        }
      ]
    };
  },
  methods: {
    tableRowClassName({ row }) {
      let str = row.value;
      console.log(str);
      if (str.includes("-")) {
        return "danger-row";
      } else if (str.includes("+")) {
        return "success-row";
      }
      return "";
    },

    goToDetail() {
      this.$router.replace({ name: "reportDetail" });
    }
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
.el-table .danger-row {
  background-color: #fef0f0;
}

.el-table .success-row {
  background-color: #f0f9eb;
}
</style>
