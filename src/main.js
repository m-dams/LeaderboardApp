import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@fortawesome/fontawesome-free/js/all";
import Notifications from 'notiwind'
import './index.css'

const app = createApp(App)
app.config.globalProperties.isLogged = false;

app.use(router).use(Notifications).mount("#app");

