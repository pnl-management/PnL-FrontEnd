<template>
  <div>
    <el-main v-loading="loading">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="Mã giao dịch">
          <el-col>
            <el-input v-model="form.id" readonly></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="Trạng thái">
          <el-col>
            <el-input v-model="form.state" readonly></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="Tên giao dịch">
          <el-col>
            <el-input v-model="form.name" readonly></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="Loại giao dịch">
          <el-col style="text-align:left">
            <el-radio-group v-model="form.type">
              <el-radio label="Doanh thu"></el-radio>
              <el-radio label="Chi phí"></el-radio>
            </el-radio-group>
          </el-col>
        </el-form-item>
        <el-form-item label="Ngày tạo">
          <el-col>
            <el-date-picker
              v-model="form.date"
              type="datetime"
              placeholder="Select date and time"
              readonly
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="Số tiền">
          <el-col>
            <el-input v-model="form.value" readonly></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="Mô tả">
          <el-col>
            <el-input type="textarea" v-model="form.desc" readonly></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col>
            <el-card :body-style="{ padding: '0px' }" v-if="form.img != null">
              <img :src="form.img" width="200px" height="300px" class="image" />
              <div style="padding: 14px;">
                <span>Chứng từ</span>
              </div>
            </el-card>
          </el-col>
        </el-form-item>
        <el-form-item label="Đánh giá">
          <el-col>
            <el-input type="textarea" :rows="5"  placeholder="Đánh giá của kế toán trưởng" v-model="feedback"></el-input>
          </el-col>
        </el-form-item>
        <el-button type="success"  @click="changeStatusTransaction('approve')">Chấp thuận</el-button>
        <el-button type="danger" @click="changeStatusTransaction('reject')">Từ chối</el-button>
        <el-button type="info" @click="changeStatusTransaction('req-modified')">Yêu cầu chỉnh sửa</el-button>
      </el-form>
    </el-main>
  </div>
</template>
<script>
import { mapGetters,mapActions } from "vuex";
import {
  changeStatusTransaction
} from "../../../api/transactionApi";
import { status } from "../../../enum/TransactionStatusEnum";
import { type } from "../../../enum/TransactionTypeEnum";
import EventBus from '../../../EventBus'
export default {
  props: ["id"],
  name: "TransactionDetail",
  data() {
    return {
      form: {
        name: null,
        id: null,
        type: null,
        state: null,
        date: null,
        desc: null,
        value: null,
        img: null,
      },
      loading : false,
      feedback: null
    };
  },
  computed: {
    ...mapGetters("user", ["user"]),
    ...mapGetters("transaction", ["transaction"]),
  },
  methods: {
    ...mapActions("transaction",["getTransactionDetail"]),
    getDatetime(createDate) {
      let date = Date(createDate);
      return date;
    },

    getTransaction() {
        this.form = {
          name: this.transaction.name,
          id: this.transaction.id,
          type: type.get(this.transaction.type),
          state: status.get(this.transaction.state).name,
          date: this.getDatetime(this.transaction.date),
          desc: this.transaction.desc,
          value: this.transaction.value,
          img : this.transaction.img
        };
      },

    changeStatusTransaction(type){
      var data = {
        type,
        feedback : this.feedback
      }
      changeStatusTransaction(this.user.token,this.id,data).then(response =>{
        console.log(response)
        if(response.status == 201){
          EventBus.$emit("CloseTransactionDetailDialog", false);
          this.$message({
              message: "Update thành công",
              type: "success"
            });
        }else{
         this.$message.error("Tình trạng hiện tại của giao dịch không thể đổi");
        }
      })
    }
  },

  async created() {
    this.loading = true;
    let data = {
      idToken : this.user.token,
      id : this.id
    }
    await this.getTransactionDetail(data);
    this.getTransaction();
    this.loading = false;
    console.log(this.form.img);
  },

  destroyed() {
    console.log("ahihi");
  }
};
</script>
<style scoped>
.el-main {
  background-color: #e9eef3;
  color: #333;
}
</style>