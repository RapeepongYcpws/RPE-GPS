import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Map from "../views/Map";
import History from "../views/History";
import Report from "../views/Report";
import Profile from "../views/Profile";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/map",
  },
  {
    path: "/map",
    name: "Map",
    component: Map,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
