import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Notifications from 'notiwind';
import '@fortawesome/fontawesome-free/js/all'

// import 'bootstrap/dist/css/bootstrap.min.css'

createApp(App)
    .use(router)
    .use(Notifications)
    .mount("#app");
