import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const Archive = () => import("@/views/calendar/Archive.vue");
const History = () => import("@/views/calendar/History.vue");
const Single = () => import("@/views/calendar/Single.vue");

const today = new Date();

const routes = [
    {
        name: "home",
        path: "/",
        redirect: (to) => {
            return { path: `/archive/${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}` };
        },
    },
    { name: "archive", path: "/archive/:year(\\d+)/:month(\\d+)/:date(\\d*)", component: Archive },
    { name: "history", path: "/history/:year(\\d+)/:month(\\d+)/:date(\\d*)", component: History },
    { name: "detail", path: "/detail/:id", component: Single }
];

const router = new VueRouter({
    routes,
    base: "/calendar",
    mode: "history",
});

export default router;
