<template>
    <el-popover
        class="item"
        placement="right-start"
        trigger="hover"
        :visible-arrow="false"
        popper-class="item-icon-popup"
    >
        <template slot="reference">
            <div class="item-div" :class="{ background: !onlyIcon }">
                <a
                    class="item-icon"
                    target="_blank"
                    :style="`height:${size}px; width:${size}px`"
                    :href="`https://${client == 'std' ? 'www' : 'origin'}.jx3box.com/item/#/view/${source.id}`"
                    v-if="!onlyName"
                >
                    <img class="item-img" :style="`height:${size}px; width:${size}px`" :src="iconLink(source.IconID)" />
                    <div
                        class="border"
                        :style="{ backgroundImage: item_border(source), opacity: source.Quality == 5 ? 0.9 : 1 }"
                    ></div>
                    <div class="border-quest" :style="{ backgroundImage: item_border_quest(source) }"></div>
                    <span class="item-count" v-if="amount !== 1">{{ amount }}</span>
                </a>
                <div v-if="!onlyIcon" class="item-name" :class="`e-jx3-item-q${source.Quality}`">
                    {{ source.Name }}
                </div>
            </div>
        </template>
        <jx3-item :item="source" />
    </el-popover>
</template>

<script>
import Item from "@jx3box/jx3box-editor/src/Item";
import { get_item } from "@jx3box/jx3box-editor/service/item";
import { iconLink } from "@jx3box/jx3box-common/js/utils";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";

export default {
    name: "ItemIcon",
    data() {
        return {
            source: {},
        };
    },
    components: {
        "jx3-item": Item,
    },
    props: {
        size: {
            type: Number,
            default: 28,
        },
        item_id: {
            type: String,
            default: null,
        },
        amount: {
            type: Number,
            default: 1,
        },
        onlyName: {
            type: Boolean,
            default: false,
        },
        onlyIcon: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        get_data(item_id) {
            if (item_id) {
                get_item(item_id, this.client)
                    .then((res) => {
                        let data = res.data;
                        let item = data.data.item;
                        if (Object.keys(item).length) {
                            this.source = item;
                            localStorage.setItem(this.cache_key, JSON.stringify(item));
                        }
                    })
                    .catch(() => {
                        this.source = {};
                    });
            }
        },
        iconLink,
        item_border_quest(item) {
            if (item.IsQuest > 0) return `url(${__imgPath}image/item/renwu.png)`;
            return "";
        },
        item_border(item) {
            switch (item.Quality) {
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
        cache_key: function () {
            return `item-${this.client}-${this.item_id}`;
        },
    },
    watch: {
        item_id: {
            immediate: true,
            handler() {
                let _cache = localStorage.getItem(this.cache_key);
                if (_cache) {
                    try {
                        this.source = JSON.parse(_cache);
                    } catch (e) {
                        console.log(e, "[Item]无法解析本地缓存");
                        this.get_data(this.item_id);
                    }
                } else {
                    this.get_data(this.item_id);
                }
            },
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/quest/item_icon.less";
</style>
