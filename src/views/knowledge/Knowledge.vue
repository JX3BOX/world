<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb name="通识百科" slug="knowledge" :publishEnable="true" :feedbackEnable="true" :crumbEnable="false">
        </Breadcrumb>
        <LeftSidebar>
            <Nav />
        </LeftSidebar>
        <Main :withoutRight="true">
            <div class="m-main">
                <router-view />
            </div>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Nav from "@/components/common/Nav.vue";
export default {
    name: "App",
    props: [],
    data: function () {
        return {};
    },
    computed: {},
    components: { Nav },
    mounted: function () {},
};
</script>

<style lang="less">
@import "~@/assets/css/app.less";
@import "~@/assets/css/knowledge/index.less";
</style>
