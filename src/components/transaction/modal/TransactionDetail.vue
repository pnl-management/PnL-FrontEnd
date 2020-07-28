<template>
  <div>
    <el-main v-loading="loading">
      <el-tabs v-model="activeName">
        <el-tab-pane label="Thông tin" name="first">
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="ID">
              <el-col>
                <el-input v-model="form.id" readonly></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="Trạng thái">
              <el-col style="text-align: left">
                <el-tag :type="form.color" disable-transitions>{{
                  form.state
                }}</el-tag>
              </el-col>
            </el-form-item>
            <el-form-item label="Loại giao dịch">
              <el-col style="text-align: left">
                <el-select
                  v-model="form.type"
                  placeholder="Chọn loại giao dịch"
                >
                  <el-option
                    v-for="item in listCategory"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-col>
            </el-form-item>
            <el-form-item label="Ngày tạo">
              <el-col style="text-align: left">
                <el-date-picker
                  v-model="form.date"
                  type="datetime"
                  placeholder="Select date and time"
                  readonly
                ></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="Tên giao dịch">
              <el-col>
                <el-input v-model="form.name"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="Số tiền">
              <el-col>
                <el-input v-model="form.value"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="Mô tả">
              <el-col>
                <el-input type="textarea" v-model="form.desc"></el-input>
              </el-col>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="Hoá đơn" name="second">
          <el-table
            :data="receipt"
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
              prop="name"
              label="Tên giao dịch"
              width="150"
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
            <el-table-column label="Trạng thái" width="180">
              <template slot-scope="scope">
                <el-tag :type="scope.row.color" disable-transitions>{{
                  scope.row.status
                }}</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <el-button
        type="primary"
        v-if="form.state == 'Chủ đầu tư yêu cầu chỉnh sửa'"
        @click="updatePeriod"
        >Chỉnh sửa</el-button
      >
    </el-main>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { status as statusTrans } from "../../../enum/TransactionStatusEnum";
import { status as statusRecept } from "../../../enum/ReceiptEnum";
import { updateTransaction } from "../../../api/transactionApi";
import EventBus from "../../../EventBus";
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
        color: null
      },
      listCategory: [],
      receipt: [],
      loading: false,
      feedback: null,
      activeName: "first"
    };
  },
  computed: {
    ...mapGetters("user", ["user"]),
    ...mapGetters("transaction", ["transaction"]),
    ...mapGetters("transaction", ["category"]),

    getUser() {
      let user = localStorage.getItem("user");
      return JSON.parse(user);
    },
    getCategoryfromStore() {
      return this.category;
    }
  },
  methods: {
    ...mapActions("transaction", ["getTransactionDetail"]),
    ...mapActions("transaction", ["getTransCategory"]),
    getDatetime(createDate) {
      let date = Date(createDate);
      return date;
    },

    getTransaction() {
      this.form = {
        name: this.transaction.name,
        id: this.transaction.id,
        type: this.transaction.type,
        state: statusTrans.get(this.transaction.state).name,
        color: statusTrans.get(this.transaction.state).color,
        date: this.getDatetime(this.transaction.date),
        desc: this.transaction.desc,
        value: this.transaction.value
      };
      console.log(this.transaction.receipt);
      this.transaction.receipt.forEach(data => {
        let rec = {
          id: data.id,
          name: data.name,
          value: data.value,
          type: data.category.name,
          date: this.getDateCreate(data.createdTime),
          time: this.getTimeCreate(data.createdTime),
          store: data.store.name,
          creator: data.createBy.username,
          status: statusRecept.get(data.status).name,
          color: statusRecept.get(data.status).color
        };
        console.log(rec);
        this.receipt.push(rec);
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

    async updatePeriod() {
      this.loading = true;
      let trans = {
        id: this.id,
        brandId: this.getUser.brand,
        storeId: this.store,
        categoryId: this.category1,
        name: this.form.name,
        value: this.form.value,
        description: this.form.desc
      };
      await updateTransaction(this.getUser.token, trans).then(response => {
        if (response.status == 200) {
          this.loading = false;
          EventBus.$emit("CloseEditDialog", false);
          this.$message({
            message: "Sửa giao dịch thành công",
            type: "success"
          });
        } else {
          this.loading = false;
        }
      });
    },

    getListCategory(list) {
      this.listCategory = [];
      list.forEach(data => {
        console.log(data);
        let category = {
          id: data.id,
          name: data.name
        };
        this.listCategory.push(category);
      });
    },

    async getCategory() {
      await this.getTransCategory(this.getUser.token);
      this.getListCategory(
        JSON.parse(JSON.stringify(this.getCategoryfromStore))
      );
    }
  },

  async created() {
    this.loading = true;
    let data = {
      idToken: this.getUser.token,
      id: this.id
    };
    await this.getTransactionDetail(data);
    this.getTransaction();
    await this.getCategory();
    this.loading = false;
  }
};
</script>
<style scoped>
.el-main {
  background-color: #e9eef3;
  color: #333;
}
</style>
