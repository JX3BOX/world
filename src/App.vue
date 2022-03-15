<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb name="江湖百科" slug="world" root="/world" :publishEnable="false" :feedbackEnable="true" :crumbEnable="false"> </Breadcrumb>
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
    import Nav from "@/components/Nav.vue";
    export default {
        name: "App",
        props: [],
        data: function () {
            return {};
        },
        computed: {},
        components: { Nav },
    };
</script>

<style lang="less">
    @import "./assets/css/app.less";
</style>
