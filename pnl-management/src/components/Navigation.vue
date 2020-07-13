<template>
  <el-aside width="200px" style="background-color: #F8F9FA" >
    <el-menu text-color="#545454" background-color="#F8F9FA" active-text-color="#55A6FD" :default-active="activeIndex" :route="true">
      <el-menu-item index="/main/dashboard" :route="{name:'dashboard'}" @click="goTo('dashboard')">
        <template slot="title">
          <i class="el-icon-s-home"></i>
          <span  to="/main/dashboard">Tổng quan</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/main/transaction" :route="{name:'transaction'}" @click="goTo('transaction')">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span>Giao dịch</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/main/report" :route="{name:'report'}" @click="goTo('report')">
        <template slot="title">
          <i class="el-icon-s-data"></i>
          <span to="/main/report">Báo cáo</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/main/acc-period" :route="{name:'accPeriod'}" @click="goTo('accPeriod')">
        <template slot="title">
          <i class="el-icon-s-data"></i>
          <span to="/main/report">Kì kế toán</span>
        </template>
      </el-menu-item>
      <el-menu-item index="4">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>Nhượng quyền</span>
        </template>
      </el-menu-item>
      <el-menu-item index="5" >
        <template slot="title">
          <i class="el-icon-s-shop"></i>
          <span>Nhà Hàng</span>
        </template>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>
<script>
export default {
  name: "Navigation",
  data() {
    return {
      activeIndex: '/main/dashboard',
    }
  },
  methods: {
    goTo(link){
      this.$router.push({name: link});
    }
  },
};
</script>
<style scoped>
.el-aside {
  background-color: aqua;
  height: 89vh;
  text-align: left;
}
</style>