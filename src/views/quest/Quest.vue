<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb name="任务百科" slug="quest" :publishEnable="false" :feedbackEnable="true" :crumbEnable="false">
        </Breadcrumb>
        <LeftSidebar>
            <Nav></Nav>
        </LeftSidebar>
        <Main :withoutRight="true" :withoutLeft="hasSidebar">
            <div class="m-main">
                <router-view />
            </div>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Nav from "../../components/quest/nav.vue";

export default {
    name: "Quest",
    components: { Nav },
    data: () => ({
        defaultExpandedKeys: ["quest"],
        active: "",
    }),
    computed: {
        hasSidebar: function () {
            return this.$route.meta.sidebar;
        },
        routeName: function () {
            return this.$route.name;
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/app.less";
@import "~@/assets/css/quest/index.less";
</style>
