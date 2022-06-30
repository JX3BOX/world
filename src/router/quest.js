import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

const routes = [
    {
        name: "search",
        path: "/",
        component: () => import("@/views/quest/Search.vue"),
        meta: {
            sidebar: false,
        },
    },
    {
        name: "result",
        path: "/search",
        component: () => import("@/views/quest/SearchResult.vue"),
    },
    {
        name: "single",
        path: "/:quest_id([_\\d]+)/:post_id(\\d+)?",
        component: () => import("@/views/quest/Single.vue"),
    }
];

const router = new VueRouter({
    routes,
    base: "/quest",
    mode: "history",
});

export default router;
