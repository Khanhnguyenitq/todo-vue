import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/tasks",
    name: "tasks",
    component: () => import("../views/Tasks.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
