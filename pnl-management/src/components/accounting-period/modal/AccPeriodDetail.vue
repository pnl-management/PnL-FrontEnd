<template>
  <div>
    <el-main>
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="ID" v-if="id != 0">
          <el-col>
            <el-input v-model="form.id" readonly></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="Title">
          <el-col>
            <el-input v-model="form.title"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="Ngày bắt đầu">
          <el-col>
            <el-date-picker
              type="date"
              placeholder="Pick a date"
              v-model="form.startDate"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="Ngày kết thúc">
          <el-col>
            <el-date-picker
              type="date"
              placeholder="Pick a date"
              v-model="form.endDate"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="Ngày kết sổ">
          <el-col>
            <el-date-picker
              type="datetime"
              placeholder="Pick a date"
              v-model="form.deadline"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
        </el-form-item>

        <el-button type="primary" v-if="this.id != 0" @click="updatePeriodById">Lưu</el-button>
        <el-button type="primary" v-else @click="createNewPeriods">Tạo</el-button>
        <el-button type="info">Đóng</el-button>
      </el-form>
    </el-main>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getAccPeriodByID, createPeriod, updatePeriod } from "../../../api/AccPeriodApi";
import EventBus from '../../../EventBus'
export default {
  props: ["id"],
  name: "AccPeriodDetail",
  data() {
    return {
      form: {
        title: null,
        id: null,
        startDate: null,
        endDate: null,
        deadline: null
      }
    };
  },
  methods: {
    createNewPeriods(){
      console.log(this.user);
      let period = {
        title : this.form.title,
        startDate: this.getDateCreate(this.form.startDate),
        endDate: this.getDateCreate(this.form.endDate),
        deadline: this.getDatetimeCreate(this.form.deadline),
        brandId : this.user.brand
      }
      console.log(period);
      createPeriod(this.user.token, period).then(response => {
        if(response.status == 200){
          console.log("ahihi");
        }
      })
      EventBus.$emit("CloseAccPeriodDialog", false);
    },

    updatePeriodById(){
      console.log(this.user);
      let period = {
        title : this.form.title,
        startDate: this.getDateCreate(this.form.startDate),
        endDate: this.getDateCreate(this.form.endDate),
        deadline: this.getDatetimeCreate(this.form.deadline),
        brandId : this.user.brand
      }
      console.log(period);
      updatePeriod(this.user.token,this.form.id,period).then(response => {
        if(response.status == 200){
          EventBus.$emit("CloseAccPeriodDialog", false);
          this.$message({
              message: "Update thành công",
              type: "success"
            });
        }
      })
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

    getDatetimeCreate(createdDate) {
      let date = new Date(createdDate);
      let mm = date.getMonth() + 1;
      let dd = date.getDate();
      let hh = date.getHours();
      let min = date.getMinutes();
      let ss = date.getSeconds();
      return (
        date.getFullYear() +
        "-" +
        (mm > 9 ? "" : "0") +
        mm +
        "-" +
        (dd > 9 ? "" : "0") +
        dd +
        " " +
        (hh > 9 ? "" : "0") +
        hh +
        ":" +
        (min > 9 ? "" : "0") +
        min +
        ":" +
        (ss > 9 ? "" : "0") +
        ss
      );
    },
  },
  computed: {
    ...mapGetters("user", ["user"]),
    getUser() {
      return this.user;
    },
  },
  created() {
    if (this.id != 0) {
      getAccPeriodByID(this.user.token, this.id).then(response => {
        let data = response.data;
        this.form = {
          title: data.title,
          id: data.id,
          startDate: data.startDate,
          endDate: data.endDate,
          deadline: data.deadline
        };
      });
    }
  }
};
</script>
<style scoped>
.el-main {
  background-color: #e9eef3;
  color: #333;
}
</style>