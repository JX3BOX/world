<template>
  <div class="m-reputation-home">
    <!-- 通用输入框 -->
    <search-input></search-input>
    <wiki-panel :border-none="true">
      <template slot="head-title">
        <i class="el-icon-location-information"></i>
        <span>便捷入口</span>
      </template>
      <template slot="head-actions">
        <a
          class="other"
          target="_blank"
          :href="feedback"
        >反馈建议 &raquo;</a>
      </template>
      <template slot="body">
        <ul class="u-qlinks">
          <li class="u-qlink">
            <a
              style="background-color: #fe7979"
              target="_blank"
              href="/tool/9126/"
            >
              <i class="el-icon-trophy"></i>
              <span>游戏内看百科</span>
            </a>
          </li>
        </ul>
      </template>
    </wiki-panel>
    <wiki-panel :border-none="true">
      <template slot="head-title">
        <i class="el-icon-notebook-2"></i>
        <span>最新声望</span>
      </template>
      <template slot="body">
        <list-head></list-head>
      </template>
    </wiki-panel>
  </div>
</template>

<script>
import SearchInput from "@/components/reputation/common/search_input.vue";
import WikiPanel from "@jx3box/jx3box-common-ui/src/wiki/WikiPanel";
import ListHead from "@/components/reputation/result/list_head.vue";

import { feedback } from "@jx3box/jx3box-common/data/jx3box.json";
import { iconLink } from "@jx3box/jx3box-common/js/utils";

export default {
  name: "Home",
  components: { SearchInput, WikiPanel, ListHead },
  data: () => ({
    by: "all",
    feedback,
  }),
  computed: {
    client () {
      return this.$store.state.client;
    },
  },
  methods: {
    iconLink,
  },
  mounted () {
  },
};
</script>

<style lang="less">
@import "~@/assets/css/reputation/home.less";
</style>
