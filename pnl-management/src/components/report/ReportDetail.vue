<template>
  <div>
    <el-main>
      <div style="text-align:left;padding: 20px 0px;">
        <span class="title">Chi tiết lợi nhuận Quí 1 năm 2020</span>
      </div>
      <div style="small">
        <pie-chart :data="data" :options="this.options"></pie-chart>
      </div>
      <div style="text-align:left;padding: 20px 0px;">
        <span class="title">Chi tiết doanh thu</span>
      </div>
      <el-table :data="tableData1" border show-summary style="width: 100%">
        <el-table-column label="Tổng doanh thu" class-name="titleTblRevenue">
          <el-table-column prop="no" label="STT" width="180"></el-table-column>
          <el-table-column prop="name" label="Name"></el-table-column>
          <el-table-column prop="value" label="Số tiền (VNĐ)"></el-table-column>
        </el-table-column>
      </el-table>

      <div style="text-align:left;padding: 20px 0px;">
        <span class="title">Chi tiết chi phí</span>
      </div>
      <el-table :data="tableData2" border show-summary style="width: 100%">
        <el-table-column label="Tổng chi phí" class-name="titleTblExpenses">
          <el-table-column prop="no" label="STT" width="180"></el-table-column>
          <el-table-column prop="name" label="Name"></el-table-column>
          <el-table-column prop="value" label="Số tiền (VNĐ)"></el-table-column>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>
<script>
import PieChart from "../../chart/PieChart";
export default {
  components: {
    PieChart
  },
  data() {
    return {
      data: {
        labels: ["Doanh Thu", "Chi phí"],
        datasets: [
          {
            label: ["Doanh Thu", "Chi phí"],
            backgroundColor: ["#AEC63A", "#F56C96"],
            data: [100, 31]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      },
      tableData1: [
        {
          no: "1",
          name: "Doanh thu cửa hàng",
          value: "101000000"
        },
        {
          no: "2",
          name: "Giảm giá, khuyến mãi",
          value: "-1000000"
        }
      ],
    tableData2: [
        {
          no: "1",
          name: "Tiền lương nhân viên bán hàng",
          value: "20000000"
        },
        {
          no: "2",
          name: "Chi phí mặt bằng",
          value: "3000000"
        },
        {
          no: "3",
          name: "Chi phí vật tư lẻ",
          value: "1000000"
        },
        {
          no: "4",
          name: "Chi phí điện",
          value: "2000000"
        },
        {
          no: "5",
          name: "Chi phí nước",
          value: "2000000"
        },
        {
          no: "6",
          name: "Chi phí khác",
          value: "3000000"
        },
      ]
    };
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
.small {
  max-width: 300px;
  max-height: 300px;
}
.title {
  font-size: 25px;
}
.el-table >>> .titleTblRevenue {
  background-color: #B2D214;
  color: #333;
}

.el-table >>> .titleTblExpenses {
  background-color: #F56B95;
  color: #333;
}
</style>