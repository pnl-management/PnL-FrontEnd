<template>
  <div>
    <el-main>
      <el-select v-model="value" placeholder="Chọn kì kế toán tiếp theo">
        <el-option
          v-for="item in listAccPeriod"
          :key="item.id"
          :label="item.title"
          :value="item.id"
        ></el-option>
      </el-select>
      <br />
      <br />
      <el-button
        type="success"
        :disabled="this.value == ''"
        @click="changeStatus()"
        >Mở kì tiếp theo</el-button
      >
    </el-main>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { changeStatusPeriod, updateReport } from "../../../api/AccPeriodApi";
import EventBus from "../../../EventBus";
export default {
  props: ["id"],
  name: "AccPeriodCreated",
  data() {
    return {
      listAccPeriod: [],
      value: ""
    };
  },
  methods: {
    ...mapActions("accPeriod", ["getAllAccPeriod"]),

    getTableData(list) {
      this.listAccPeriod = [];
      list.forEach(data => {
        let accPeriod = {
          id: data.id,
          title: data.title
        };
        if (data.status == 0) {
          this.listAccPeriod.push(accPeriod);
        }
      });
    },

    getUser() {
      let user = localStorage.getItem("user");
      return JSON.parse(user);
    },

    async getPeriods() {
      await this.getAllAccPeriod(this.getUser().token);
      this.getTableData(
        JSON.parse(JSON.stringify(this.getAllAccPeriodFromStore))
      );
    },

    async changeStatus() {
      // Close period
      await changeStatusPeriod(this.getUser().token, this.id, 2);
      //update report
      await updateReport(this.getUser().token);
      // // Open other period
      await changeStatusPeriod(this.getUser().token, this.value, 1);
      //.then(response => {
      //   if (response.status == 200) {
      //     EventBus.$emit("CloseChangeStatusDialog", false);
      //     this.$message({
      //       message: "Thay đổi trạng thái thành công",
      //       type: "success"
      //     });
      //   }
      // });

      EventBus.$emit("CloseChangeStatusDialog", false);
      this.$message({
        message: "Thay đổi trạng thái thành công",
        type: "success"
      });
    }
  },
  computed: {
    ...mapGetters("user", ["user"]),
    ...mapGetters("accPeriod", ["accPeriod"]),

    getAllAccPeriodFromStore() {
      return this.accPeriod;
    }
  },
  created() {
    this.getPeriods();
  }
};
</script>
<style scoped>
.el-main {
  background-color: #e9eef3;
  color: #333;
}
</style>
