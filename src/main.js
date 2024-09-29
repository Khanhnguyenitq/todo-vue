import "./index.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import { createStore } from "vuex";

createApp(App).use(router).mount("#app");
