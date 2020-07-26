<template>
  <div>
    <el-main v-loading="loading">
      <div class="rowInline" style="width : 100px">
        <img src="../../../assets/logo.jpg" width="100px" height="100px" />
      </div>
      <div class="rowInline" style="padding: 20px 20px 0px 20px">
        <span class="header">{{ form.type }}</span>
        <br />
        <br />
        <span>{{ form.date }}</span>
      </div>
      <el-col :class="form.state == 'Đã tạo' ? 'status1' : 'status2'">
        <el-tag :type="form.color" disable-transitions>{{ form.state }}</el-tag>
      </el-col>
      <div style="clear:both">
        <el-row>
          <el-col :span="16" class="title" style="text-align:left">
            Tên hoá đơn
          </el-col>
          <el-col :span="8" class="title">
            Giá trị
          </el-col>
        </el-row>
        <hr />
        <el-row>
          <el-col :span="16" class="row" style="text-align:left">
            <p>{{ form.name }}</p>
          </el-col>
          <el-col :span="8" class="row">
            <p>{{ form.value }} VNĐ</p>
          </el-col>
          <hr />
        </el-row>
      </div>
      <!-- <div>
        <h2>{{ form.name }}</h2>
        <h1>{{ form.value }} VNĐ</h1>
      </div>-->
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item>
          <el-col>
            <el-card :body-style="{ padding: '0px' }" v-if="form.img != null">
              <a :href="form.img" target="_blank">
                <img
                  :src="form.img"
                  width="100px"
                  height="200px"
                  class="image"
                />
              </a>
              <div>
                <span>Chứng từ</span>
              </div>
            </el-card>
          </el-col>
        </el-form-item>
        <el-button type="success" @click="changeStatusReceipt('approve')"
          >Chấp thuận</el-button
        >
        <el-button type="danger" @click="changeStatusReceipt('reject')"
          >Từ chối</el-button
        >
      </el-form>
    </el-main>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { changeStatusReceipt } from "../../../api/receiptApi";
import { status } from "../../../enum/ReceiptEnum";
// import { type } from "../../../enum/TypeEnum";
import EventBus from "../../../EventBus";
export default {
  props: ["id"],
  name: "ReceiptDetail",
  data() {
    return {
      form: {
        name: null,
        id: null,
        type: null,
        state: null,
        color: null,
        date: null,
        desc: null,
        value: null,
        img: null
      },
      loading: false,
      storeId: null
    };
  },
  computed: {
    ...mapGetters("user", ["user"]),
    ...mapGetters("receipt", ["receipt"]),

    getUser() {
      let user = localStorage.getItem("user");
      return JSON.parse(user);
    }
  },
  methods: {
    ...mapActions("receipt", ["getReceiptDetail"]),

    getDateCreate(createdDate) {
      let date = new Date(createdDate);
      let mm = date.getMonth() + 1;
      let dd = date.getDate();
      let hh = date.getHours();
      let mi = date.getMinutes();
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
        (mi > 9 ? "" : "0") +
        mi +
        ":" +
        (ss > 9 ? "" : "0") +
        ss
      );
    },

    getReceipt() {
      this.form = {
        name: this.receipt.name,
        id: this.receipt.id,
        type: this.receipt.type,
        state: status.get(this.receipt.state).name,
        color: status.get(this.receipt.state).color,
        date: this.getDateCreate(this.receipt.date),
        desc: this.receipt.desc,
        value: this.receipt.value,
        img: this.receipt.img
      };
      this.storeId = this.receipt.storeId;
    },

    changeStatusReceipt(type) {
      changeStatusReceipt(this.getUser.token, this.id, type).then(response => {
        console.log(response);
        if (response.status == 200) {
          EventBus.$emit("CloseReceiptDetailDialog", false);
          this.$message({
            message: "Update thành công",
            type: "success"
          });
        } else {
          this.$message.error(
            "Trạng thái hiện tại của giao dịch không thể đổi"
          );
        }
      });
    }
  },

  async created() {
    this.loading = true;
    let data = {
      idToken: this.getUser.token,
      id: this.id
    };
    await this.getReceiptDetail(data);
    this.getReceipt();
    this.loading = false;
  }
};
</script>
<style scoped>
.el-main {
  background-color: #e9eef3;
  color: #333;
}
.rowInline {
  float: left;
  text-align: left;
  /* width: 50%; */
  height: 100px;
}
.header {
  font-size: 20px;
  color: #008a4f;
}
.title {
  font-size: 19px;
}

.row {
  font-size: 17px;
}
.status1 {
  text-align: left;
  padding: 30px 0px 0px 120px;
  width: 100px;
}

.status2 {
  text-align: left;
  padding: 30px 0px 0px 90px;
  width: 100px;
}
</style>
