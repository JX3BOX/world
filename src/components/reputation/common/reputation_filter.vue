<template>
  <div class="m-filter-content">
    <el-select
      v-model="level"
      placeholder="声望等级"
    >
      <el-option
        v-for="item in list"
        :key="item.level"
        :label="item.name"
        :value="item.level"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
import list from '@/assets/data/reputation_level.json'
export default {
  name: "ReputationFilter",
  data () {
    return {
      level: -1,
      list: list
    };
  },
  methods: {
  },
  mounted () {
  },
};
</script>

<style lang="less">
@import "~@/assets/css/quest/common/search_input.less";
</style>
