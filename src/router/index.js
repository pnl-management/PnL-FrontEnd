import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/LoginView.vue";
import Main from "../views/MainView.vue";
import Dashboard from "../components/Dashboard";
import Transaction from "../components/transaction/Transaction";
import Report from "../components/report/Report";
import ReportDetail from "../components/report/ReportDetail";
import AccPeriod from "../components/accounting-period/AccPeriod";
import Store from "../components/store/Store";
import Receipt from "../components/receipt/Receipt";
Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/main",
    name: "main",
    component: Main,
    children: [
      {
        path: "/main/dashboard",
        name: "dashboard",
        component: Dashboard
      },
      {
        path: "/main/transaction",
        name: "transaction",
        component: Transaction
      },
      {
        path: "/main/report",
        name: "report",
        component: Report
      },
      {
        path: "/main/report-detail",
        name: "reportDetail",
        component: ReportDetail
      },
      {
        path: "/main/acc-period",
        name: "accPeriod",
        component: AccPeriod
      },
      {
        path: "/main/store",
        name: "store",
        component: Store
      },
      {
        path: "/main/receipt",
        name: "receipt",
        component: Receipt
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
