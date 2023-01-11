<template>
    <div class="m-book-card" @click="go(item.idKey)">
        <div class="u-name">
            <item-icon :item_id="String(item.ItemID)" :size="36" :vertical="true"></item-icon>
        </div>
        <div class="u-name">
            {{ this.getProfessionType(item.ExtendProfessionID1) }}
        </div>
        <div class="u-name">
            <span>{{ item.BookName }}</span>
        </div>
        <div class="u-name">
            <span>{{ item.Desc }}</span>
        </div>
        <div class="u-path" :class="getOrigin(item.DoodadTemplateID) !== '其它' && 'special'">
            <span>{{ getOrigin(item.DoodadTemplateID) }}</span>
        </div>
    </div>
</template>

<script>
import ItemIcon from "../common/item_icon.vue";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import bookProfession from "@/assets/data/book_profession.json";
import bookMapInfoStd from "@/assets/data/stele_std_fwd.json";
import bookMapInfoOrigin from "@/assets/data/stele_origin_fwd.json";

export default {
    name: "BookCard",
    components: {
        ItemIcon,
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    methods: {
        getProfessionType(type) {
            return bookProfession.find((item) => item.id === Number(type))
                ? bookProfession.find((item) => item.id === Number(type)).name
                : "";
        },
        go(id) {
            this.$router.push({ name: "single", params: { book_id: id } });
        },
        getOrigin(tempId) {
            return tempId && this.bookMapInfo[tempId] ? "碑铭" : this.item.ShopID ? "商店" : "其它";
        },
    },
    computed: {
        client() {
            return this.$store.state.client;
        },
        bookMapInfo() {
            return this.client === "std" ? bookMapInfoStd : bookMapInfoOrigin;
        },
    },
};
</script>
<style lang="less" scoped>
@import "~@/assets/css/book/result/item_card.less";
</style>
