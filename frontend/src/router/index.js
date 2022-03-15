import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ChatView from "../views/ChatView.vue";
import Login from "../components/authentification/Login.vue";
import Register from "../components/authentification/Register.vue";
import NotFoundView from "../views/NotFoundView.vue";
import ForgetPassword from "../components/authentification/ForgetPassword.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/signin",
    name: "signin",
    component: Login,
  },
  {
    path: "/signup",
    name: "signup",
    component: Register,
  },
  {
    path: "/chat",
    name: "chat",
    component: ChatView,
  },
  {
    path: "/forgetpassword",
    name: "forgetpassword",
    component: ForgetPassword,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    beforeEnter: (to, from, next) => {
      next("/404");
    },
  },
  {
    path: "/404",
    name: "not-found",
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
