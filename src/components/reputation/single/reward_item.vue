<template>
  <div class="reputation-reward-item">
    <div class="reputation-reward-title">{{reward.level}}</div>
    <div class="reputation-reward-list">
      <item-icon
        v-for="(reward, index) in reward.list"
        :key="index"
        :item_id="reward.id"
        :amount="reward.amount"
        :onlyIcon="true"
        :size="28"
        style="margin-right: 5px;margin-bottom: 5px"
      ></item-icon>
    </div>
  </div>
</template>

<script>
import ItemIcon from '../common/item_icon.vue'
export default {
  name: "RewardItem",
  props: {
    reward: {
      type: Object,
    },
  },
  components: {
    ItemIcon
  },
  data () {
    return {
    };
  },
  methods: {},
  computed: {
  },
};
</script>

<style lang="less">
.reputation-reward-item {
    .reputation-reward-title {
        font-size: 14px;
        text-indent: 1em;
    }
    .reputation-reward-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        padding-left: 30px;
        padding-top: 10px;
        padding-bottom: 10px;
        max-height: 88px;
        overflow-y: scroll;
    }
}
</style>
