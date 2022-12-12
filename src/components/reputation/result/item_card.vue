<template>
  <div
    class="m-reputation-card"
    @click="go(item.id)"
  >

  </div>
</template>

<script>
// import ItemIcon from "../common/item_icon.vue";

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
    }
  },
  computed: {
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/css/reputation/result/item_card.less";
</style>
