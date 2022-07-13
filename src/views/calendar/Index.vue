<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb name="剑三日历" slug="calendar" :feedbackEnable="true" :crumbEnable="false">
        </Breadcrumb>
        <LeftSidebar :open="hasSidebar">
            <Nav :default-expanded-keys="defaultExpandedKeys" :active-key="active" />
        </LeftSidebar>
        <Main :withoutRight="true" :withoutLeft="!hasSidebar">
            <div class="m-main">
                <router-view />
            </div>
            <Footer :class="routeName"></Footer>
        </Main>
    </div>
</template>

<script>
import Nav from "@/components/calendar/nav";
import User from '@jx3box/jx3box-common/js/user';
import { getProfile } from "@/service/calendar.js";
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
        },
        routeName : function (){
            return this.$route.name
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
    mounted: function () {
        if (User.isLogin()) {
            getProfile().then(res => {
                if (res?.data?.data) {
                    this.$store.commit('SET_STATE', {
                        key: 'server',
                        value: res.data.data.jx3_server
                    })
                }
            })
        }
    },
};
</script>

<style lang="less">
@import "~@/assets/css/app.less";
@import "~@/assets/css/calendar/index.less";
</style>
