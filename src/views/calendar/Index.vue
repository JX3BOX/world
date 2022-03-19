<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb name="剑三日历" slug="calendar" :feedbackEnable="true" :crumbEnable="false">
        </Breadcrumb>
        <LeftSidebar :open="true">
            <Nav :default-expanded-keys="defaultExpandedKeys" :active-key="active" />
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
        return {
            defaultExpandedKeys: ['calendar'],

            active: ''
        };
    },
    computed: {
        hasSidebar : function (){
            return this.$route.meta.sidebar
        }
    },
    components: { Nav },
    watch: {
        "$route.params": {
            deep: true,
            immediate: true,
            handler(val) {
                if (val) {
                    const { year, month } = val;
                    if (year) {
                        this.active = month ? `${year}_${month}` : year
                    }
                }
            }
        }
    },
    mounted: function () {},
};
</script>

<style lang="less">
@import "~@/assets/css/app.less";
@import "~@/assets/css/calendar/index.less";
</style>
