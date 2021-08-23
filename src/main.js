import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);
Vue.component("font-awesome-icon", FontAwesomeIcon);

import PerfectScrollbar from "vue2-perfect-scrollbar";
import "vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css";
Vue.use(PerfectScrollbar);

import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
Vue.use(VueMaterial);

import LongdoMap from "longdo-map-vue";
Vue.use(LongdoMap, {
  load: {
    apiKey: "0c246e1a25616c930d33b17a30c89de8",
  },
});

import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCW_DCt7SoGyojE5ZmkhSM98vztPMpFjAU',
    libraries: 'places', // This is required if you use the Autocomplete plugin
  },
})
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
