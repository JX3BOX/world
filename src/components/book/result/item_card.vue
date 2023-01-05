<template>
  <div
    class="m-book-card"
    @click="go(item.idKey, item.ItemID)"
  >
    <div class="u-name">
      <item-icon
        :item_id="String(item.ItemID)"
        :size="36"
        :vertical="true"
      ></item-icon>
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
    <div class="u-name">
      <span>{{ 1 }}</span>
    </div>
  </div>
</template>

<script>
import ItemIcon from "../common/item_icon.vue";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import bookProfession from '@/assets/data/book_profession.json';

export default {
  name: "BookCard",
  components: {
    ItemIcon,
  },
  props: {
    item: {
      type: Object,
      required: true,
    }
  },
  methods: {
    getProfessionType (type) {
      return bookProfession.find(item => item.id === Number(type)) ? bookProfession.find(item => item.id === Number(type)).name : ''
    },
    go (id, itemId) {
      this.$router.push({ name: "single", params: { book_id: id, item_id: itemId } });
    }
  },
  computed: {
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/css/book/result/item_card.less";
</style>
