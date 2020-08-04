import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Meetings from "../views/Meetings.vue";
import CheckIn from "../views/CheckIn.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/meetings",
    name: "Meetings",
    component: Meetings,
  },
  {
    path: "/checkin/:userID/:meetingID",
    name: "CheckIn",
    component: CheckIn,
  },
  // this is kind of a default route
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  routes,
});

export default router;
