import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const Archive = () => import("@/views/calendar/Archive.vue");
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
    {
        name: "archive",
        path: "/archive/:year(\\d+)/:month(\\d+)/:date(\\d+)?",
        component: Archive,
        meta: {
            sidebar: false,
        },
    },
    {
        name: "view",
        path: "/view/:id",
        component: Single,
        meta: {
            sidebar: true,
        },
    },
];

const router = new VueRouter({
    routes,
    base: "/calendar",
    mode: "history",
});

export default router;
