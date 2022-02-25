<template>
    <div id="app">
        <Header></Header>
        <!-- TODO:发布链接 -->
        <Breadcrumb name="江湖百科" slug="world" root="/world" :publishEnable="true" :feedbackEnable="true" :crumbEnable="false">
            <img slot="logo" svg-inline :src="getAppIcon('world')" />
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
import { getAppIcon } from "@jx3box/jx3box-common/js/utils";
import Nav from '@/components/Nav.vue'
export default {
    name: "App",
    props: [],
    data: function() {
        return {};
    },
    computed: {},
    methods: { getAppIcon },
    components: {Nav},
};
</script>

<style lang="less">
@import "./assets/css/app.less";
</style>
