import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/leaderboard",
    name: "Leaderboard",
    component: () => import("../components/leaderboard/Leaderboard.vue"),
  },
  {
    path: "/myprogress",
    name: "MyProgress",
    component: () => import("../views/MyProgress.vue"),
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () => import("../views/SignUp.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/resetpassword",
    name: "ResetPassword",
    component: () => import("../views/ResetPassword.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
