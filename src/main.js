import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTrash,
  faEnvelope,
  faUndo,
  faListUl,
  faLink,
  faRandom,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

// adding icons to library so that it is available for all components
library.add(faTrash, faEnvelope, faUndo, faListUl, faLink, faRandom, faStar);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
