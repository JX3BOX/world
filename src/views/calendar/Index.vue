<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb name="剑三日历" slug="calendar" root="/calendar" :feedbackEnable="true" :crumbEnable="false">
            <img slot="logo" svg-inline :src="getAppIcon('calendar')" />
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
import { getAppIcon } from "@jx3box/jx3box-common/js/utils";
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
    methods: { getAppIcon },
    components: { Nav },
    mounted: function () {},
};
</script>

<style lang="less">
@import "~@/assets/css/app.less";
@import "~@/assets/css/calendar/index.less";
</style>
