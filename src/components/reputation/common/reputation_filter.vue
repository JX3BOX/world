<template>
  <div class="m-filter-content">
    <el-select
      v-model="currentLevel"
      placeholder="声望等级"
      @change="levelChange"
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
  props: ['level'],
  data () {
    return {
      currentLevel: -1,
      list: list
    };
  },
  methods: {
    levelChange (value) {
      this.currentLevel = value
      this.$emit('update:level', value)
    }
  },
  mounted () {
    this.currentLevel = this.level
  },
};
</script>

<style lang="less">
@import "~@/assets/css/quest/common/search_input.less";
</style>
