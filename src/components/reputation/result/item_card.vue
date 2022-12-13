<template>
  <div
    class="m-reputation-card"
    @click="go(item.id)"
  >
    <div class="u-map">{{ item.szMapNames && item.szMapNames[0] }}</div>
    <div class="u-name">
      <span class="u-name-title">
        <span class="u-name-text">{{ item.szName }}</span>
      </span>
      <span class="u-name-id">（ID：{{ item.dwForceID }}）</span>
    </div>
    <div class="u-level">{{ getMaxLevel(item.GainDesc) }}</div>
    <div class="u-name">
      <div>{{ getPath(item.szName) }}</div>
      <span
        v-if="getPath(item.szName)"
        class="u-name-id"
      >（遗失的尊敬）</span>
    </div>
  </div>
</template>

<script>
// import ItemIcon from "../common/item_icon.vue";
import levels from '@/assets/data/reputation_level.json';
import paths from '@/assets/data/reputation_exchange_path.json';

export default {
  name: "ReputationCard",
  components: {
    // ItemIcon,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    go (id) {
      this.$router.push({ name: "single", params: { id: id } });
    },
    getMaxLevel (arr) {
      if (!arr || !arr.length) {
        return ''
      } else {
        const max = Number(arr[arr.length - 1].to)
        return levels.find(item => item.level === max)
          ? levels.find(item => item.level === max).name : ''
      }
    },
    getPath (name) {
      return paths.find(item => item.reputations.includes(name))
        ? paths.find(item => item.reputations.includes(name)).path : ''
    }
  },
  computed: {
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/css/reputation/result/item_card.less";
</style>
