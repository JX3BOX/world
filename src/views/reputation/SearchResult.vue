<template>
  <div class="m-search-result">
    <search-input></search-input>
    <list-head></list-head>
    <item-card
      v-for="reputation in list"
      :key="reputation.id"
      :item="reputation"
    ></item-card>
    <el-pagination
      hide-on-single-page
      background
      layout="prev, pager, next"
      @current-change="search"
      :total="total"
      :page-size="pageSize"
      style="text-align: center; margin-top: 1.5rem"
    >
    </el-pagination>
  </div>
</template>

<script>
import ItemCard from "@/components/reputation/result/item_card.vue";
import SearchInput from "@/components/reputation/common/search_input.vue";
import ListHead from "@/components/reputation/result/list_head.vue";
export default {
  name: "SearchResult",
  components: { ItemCard, SearchInput, ListHead },
  data: () => ({
    total: 1,
    pageSize: 10,
    result: {},
    list: [],
    input: ''
  }),
  mounted () {
    this.input = this.keyword;
    // this.search();
  },
  methods: {
  },
  computed: {
    keyword () {
      return this.$route.query.keyword;
    },
    id () {
      return this.$route.query.id;
    },
    client () {
      return this.$store.state.client;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/reputation/result/search_result.less";
</style>
