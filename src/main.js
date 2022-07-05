import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/styles/index.less";
import Vant from "@/plugins/vant";
import "vant/lib/index.less";
import ToutiaoIcon from "@/components/ToutiaoIcon";
import "amfe-flexible";
// 测试接口
import request from "@/utils/request";
request.get("/v1_0/channels").then(function (res) {
  console.log(res.data.data.channels);
});

Vue.use(Vant);
Vue.component("ToutiaoIcon", ToutiaoIcon);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
