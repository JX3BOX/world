<template>
    <nav class="m-nav">
        <div class="m-menus-panel">
            <el-tree class="m-menus" :data="versions" node-key="id" ref="tree">
                <router-link class="el-tree-node__label" slot-scope="{ node, data }" :to="menuLink(data, node)">
                    <span class="u-name" v-text="'【 ' + data.name + ' 】'"></span>
                    <em v-if="data.total" class="u-count" v-text="`(${data.total})`"></em>
                </router-link>
            </el-tree>
        </div>
    </nav>
</template>

<script>
import { getMenus } from "@/service/reputation";
import maps_std from "@jx3box/jx3box-data/data/fb/fb_map.json";
import maps_orgin from "@jx3box/jx3box-data/data/fb/fb_map_origin.json";

export default {
    name: "Nav",
    data: () => ({
        keyword: "",
        menus: [],
        versions: [],
    }),
    computed: {
        client() {
            return this.$store.state.client;
        },
    },
    methods: {
        menuLink(menu) {
            return { name: "result", query: { id: menu.nDlcID } };
        },
        getMenus() {
            getMenus({
                client: this.client,
            }).then((res) => {
                const maps = this.client === "std" ? maps_std : maps_orgin;
                const list = res.data.dlc || [];
                const arr = Object.keys(maps).reverse();
                arr.unshift("声望总览");
                list.unshift({ nDlcIDL: 0, total: 0 });
                this.versions = list.map((item, i) => {
                    if (!item.nDlcID) {
                        item.total = list
                            .map((lItem) => lItem.total)
                            .reduce(function (prev, cur) {
                                return prev + cur;
                            });
                    }
                    return {
                        ...item,
                        name: arr[i],
                    };
                });
                console.log(this.versions);
            });
        },
    },
    mounted() {
        this.getMenus();
    },
};
</script>

<style lang="less">
@import "~@/assets/css/reputation/nav.less";
</style>
