<template>
  <div class="m-search-result">
    <search-input></search-input>
    <list-head></list-head>
    <item-card
      v-for="reputation in list"
      :key="reputation.dwForceID"
      :item="reputation"
    ></item-card>
    <el-pagination
      hide-on-single-page
      background
      layout="prev, pager, next"
      @current-change="search"
      :current-page.sync="currentPage"
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
import { getList } from "@/service/reputation";
export default {
  name: "SearchResult",
  components: { ItemCard, SearchInput, ListHead },
  data: () => ({
    total: 1,
    pageSize: 10,
    list: [],
    input: '',
    currentPage: 1
  }),
  mounted () {
    this.search();
  },
  methods: {
    search (page = 1) {
      const params = {
        dlc: this.id,
        keyword: this.keyword,
        page,
      }
      !params.dlc && delete params.dlc
      getList(params).then(res => {
        this.list = res.data.list;
        this.total = res.data.total;
        this.pageSize = res.data.per;
      })
    }
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
  watch: {
    id (id) {
      this.currentPage = 1
      this.search()
    },
    keyword () {
      this.currentPage = 1
      this.search()
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/reputation/result/search_result.less";
</style>
