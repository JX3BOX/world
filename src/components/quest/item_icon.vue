<template>
    <el-popover
        class="item"
        placement="right-start"
        trigger="hover"
        :visible-arrow="false"
        popper-class="item-icon-popup"
    >
        <template slot="reference">
            <div class="item-div" :class="{ background: displayName }">
                <a
                    class="item-icon"
                    target="_blank"
                    :style="`height:${size}px; width:${size}px`"
                    :href="`https://${item.client == 'std' ? 'www' : 'origin'}.jx3box.com/item/#/view/${item.id}`"
                >
                    <img class="item-img" :style="`height:${size}px; width:${size}px`" :src="iconLink(item.icon)" />
                    <div
                        class="border"
                        :style="{ backgroundImage: item_border(item), opacity: item.quality == 5 ? 0.9 : 1 }"
                    ></div>
                    <div class="border-quest" :style="{ backgroundImage: item_border_quest(item) }"></div>
                    <span class="item-count" v-if="item.count !== 1">{{ item.count }}</span>
                </a>
                <div v-if="displayName" class="item-name" :class="`e-jx3-item-q${item.quality}`">{{ item.name }}</div>
            </div>
        </template>
        <jx3-item :item_id="item.id" :client="client" />
    </el-popover>
</template>

<script>
import Item from "@jx3box/jx3box-editor/src/Item";

import { iconLink } from "@jx3box/jx3box-common/js/utils";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";

export default {
    components: {
        "jx3-item": Item,
    },
    props: {
        size: {
            type: Number,
            default: 28,
        },
        item: {
            type: Object,
            default: () => ({}),
        },
        displayName: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        iconLink,
        item_border_quest(item) {
            if (item.isQuest > 0) return `url(${__imgPath}image/item/renwu.png)`;
            return "";
        },
        item_border(item) {
            switch (item.quality) {
                case 3:
                    return `url(${__imgPath}image/item/blue.png)`;
                case 4:
                    return `url(${__imgPath}image/item/purple.png)`;
                case 5:
                    return `url(${__imgPath}image/item/orange.gif)`;
                default:
                    return "";
            }
        },
    },
    computed: {
        client() {
            return this.$store.state.client;
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/quest/item_icon.less";
</style>
