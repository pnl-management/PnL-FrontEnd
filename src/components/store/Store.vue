<template>
  <div>
    <el-main>
      <div style="text-align:left;padding: 20px 0px;">
        <span class="title">Danh sách cửa hàng</span>
      </div>
      <div>
        <el-table :data="listStore">
          <!-- <el-table-column prop="id" label="ID" width="50"></el-table-column> -->
          <el-table-column prop="id" label="ID" width="130"></el-table-column>
          <el-table-column
            prop="name"
            label="Cửa hàng"
            width="230"
          ></el-table-column>
          <el-table-column
            prop="phone"
            label="Số điện thoại"
            width="230"
          ></el-table-column>
          <el-table-column
            prop="address"
            label="Địa chỉ"
            width="530"
          ></el-table-column>
        </el-table>
        <!-- <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :total="length"
          layout="prev, pager, next"
        ></el-pagination> -->
      </div>
    </el-main>
    <!-- <el-dialog title="Chi tiết Giao dịch" :visible.sync="dialogVisible">
      <transaction-detail v-bind:id="id" v-if="dialogVisible" />
    </el-dialog> -->
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
// import EventBus from "../../EventBus";
export default {
  components: {},
  data() {
    return {
      listStore: []
    };
  },
  computed: {
    ...mapGetters("user", ["user"]),
    ...mapGetters("store", ["getListStore"]),

    getUser() {
      let user = localStorage.getItem("user");
      return JSON.parse(user);
    },

    getListStoreByBrand() {
      return this.getListStore;
    }
  },
  methods: {
    ...mapActions("store", ["getStoreByBrand"]),

    getTableData(list) {
      this.listStore = [];
      list.forEach(data => {
        let store = {
          id: data.id,
          name: data.name,
          phone: data.phone,
          address: data.address
        };
        this.listStore.push(store);
      });
    },

    async getStore() {
      await this.getStoreByBrand(this.getUser.token);
      this.getTableData(JSON.parse(JSON.stringify(this.getListStoreByBrand)));
    }
  },

  created() {
    this.getStore();
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
