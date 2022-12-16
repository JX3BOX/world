<template>
  <div class="m-filter-wrap">
    <div class="m-search-input">
      <el-input
        placeholder="输入声望/地图/奖励/势力名称，「回车」进行搜索"
        v-model="keyword"
        clearable
        @keyup.enter.native="search"
      >
        <span slot="prepend">
          <i class="el-icon-search"></i> 关键词
        </span>
        <el-button
          @click="search"
          slot="append"
        >
          <div class="u-input-button__normal">
            <i class="el-icon-position"></i>
            <span>搜索</span>
          </div>
          <span class="u-input-button__small"><i class="xs el-icon-search"></i></span>
        </el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchInput",
  data () {
    return {
      keyword: ""
    };
  },
  methods: {
    search (go) {
      if (!go) return;
      this.$router.push({
        name: "result",
        query: { keyword: this.keyword },
      });
    }
  },
  mounted () {
  },
};
</script>

<style lang="less">
@import "~@/assets/css/reputation/common/search_input.less";
</style>
