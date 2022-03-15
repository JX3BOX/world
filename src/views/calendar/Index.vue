<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb name="剑三日历" slug="calendar" :feedbackEnable="true" :crumbEnable="false">
        </Breadcrumb>
        <LeftSidebar :open="hasSidebar">
            <Nav />
        </LeftSidebar>
        <Main :withoutRight="true" :withoutLeft="!hasSidebar">
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
    computed: {
        hasSidebar : function (){
            return this.$route.meta.sidebar
        }
    },
    components: { Nav },
    mounted: function () {},
};
</script>

<style lang="less">
@import "~@/assets/css/app.less";
@import "~@/assets/css/calendar/index.less";
</style>
