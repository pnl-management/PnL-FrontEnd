<template>
  <div>
    <el-main v-loading="loading">
      <el-steps :active="active" finish-status="success">
        <el-step title="Chọn loại giao dịch"></el-step>
        <el-step title="Chọn cửa hàng"></el-step>
        <el-step title="Step 3"></el-step>
        <el-step title="Step 4"></el-step>
      </el-steps>
      <br />
      <el-select
        v-if="this.active == 0"
        v-model="category1"
        placeholder="Chọn loại giao dịch"
      >
        <el-option
          v-for="item in listCategory"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>

      <el-select
        v-if="this.active == 1"
        v-model="store"
        placeholder="Chọn cửa hàng"
      >
        <el-option
          v-for="item in listStore"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <div>
        <el-table
          :data="listReceipt"
          :default-sort="{ prop: 'id', order: 'descending' }"
          ref="multipleTable"
          @selection-change="handleSelectionChange"
          v-if="this.active == 2"
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
          <el-table-column type="selection" width="55"></el-table-column>
        </el-table>
      </div>
      <el-form
        v-if="this.active == 3"
        ref="form"
        :model="form"
        label-width="120px"
      >
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
      <el-button style="margin-top: 12px;" v-if="this.active != 3" @click="next"
        >Tiếp theo</el-button
      >
      <el-button
        style="margin-top: 12px;"
        v-if="this.active == 3"
        @click="createTrans"
        >Tạo giao dịch</el-button
      >
    </el-main>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { status } from "../../../enum/ReceiptEnum";
import { createTransaction } from "../../../api/transactionApi";
import EventBus from "../../../EventBus";
export default {
  name: "CreateTransaction",
  data() {
    return {
      form: {
        name: null,
        desc: null,
        value: null
      },
      loading: false,
      active: 0,
      listCategory: [],
      listStore: [],
      listReceipt: [],
      category1: "",
      store: "",
      multipleSelection: []
    };
  },
  computed: {
    ...mapGetters("user", ["user"]),
    ...mapGetters("transaction", ["category"]),
    ...mapGetters("store", ["getListStore"]),
    ...mapGetters("receipt", ["getListReceipt"]),

    getUser() {
      let user = localStorage.getItem("user");
      return JSON.parse(user);
    },
    getCategoryfromStore() {
      return this.category;
    },
    getListStoreByBrand() {
      return this.getListStore;
    },
    getReceiptInStore() {
      return this.getListReceipt;
    }
  },
  methods: {
    ...mapActions("transaction", ["getTransCategory"]),
    ...mapActions("store", ["getStoreByBrand"]),
    ...mapActions("receipt", ["getReceiptByStore"]),

    async next() {
      this.active++;
      if (this.active == 2) {
        await this.getReceipt();
      }
    },

    async createTrans() {
      this.loading = true;
      let receipts = [];
      this.multipleSelection.forEach(data => {
        let receiptId = {
          id: data.id
        };
        receipts.push(receiptId);
      });

      let trans = {
        brandId: this.getUser.brand,
        storeId: this.store,
        categoryId: this.category1,
        name: this.form.name,
        value: this.form.value,
        description: this.form.desc,
        listReceipt: receipts
      };
      await createTransaction(this.getUser.token, trans).then(response => {
        if (response.status == 201) {
          this.loading = false;
          EventBus.$emit("CloseTransactionDetailDialog", false);
          this.$message({
            message: "Tạo giao dịch thành công",
            type: "success"
          });
        } else {
          this.loading = false;
        }
      });
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
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
    },

    getListStore1(list) {
      this.listStore = [];
      list.forEach(data => {
        console.log(data);
        let store = {
          id: data.id,
          name: data.name
        };
        this.listStore.push(store);
      });
    },

    async getStore() {
      await this.getStoreByBrand(this.getUser.token);
      this.getListStore1(JSON.parse(JSON.stringify(this.getListStoreByBrand)));
    },

    async getReceipt() {
      let params = {
        IdToken: this.getUser.token,
        storeId: this.store
      };
      await this.getReceiptByStore(params);
      this.getReceptAccept(JSON.parse(JSON.stringify(this.getReceiptInStore)));
    },

    getReceptAccept(list) {
      this.listReceipt = [];
      list.forEach(data => {
        let receipt = {
          id: data.id,
          name: data.name,
          value: data.value,
          date: this.getDateCreate(data.createdTime),
          time: this.getTimeCreate(data.createdTime),
          store: data.store.name,
          creator: data.createBy.username,
          status: status.get(data.status).name,
          color: status.get(data.status).color
        };
        if (data.status == 2) {
          this.listReceipt.push(receipt);
        }
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
    }
  },

  async created() {
    await this.getCategory();
    await this.getStore();
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
  width: 33%;
  height: 50px;
}
</style>
