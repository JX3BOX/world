<template>
  <div class="m-reputation-home">
    <!-- 通用输入框 -->
    <search-input></search-input>
    <!-- <reputation-filter :level.sync="level"></reputation-filter> -->
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
        <item-card
          v-for="reputation in (level === -1) ? news : list"
          :key="reputation.dwForceID"
          :item="reputation"
          :level="level"
        ></item-card>
      </template>
    </wiki-panel>
  </div>
</template>

<script>
import SearchInput from "@/components/reputation/common/search_input.vue";
// import ReputationFilter from '@/components/reputation/common/reputation_filter.vue'
import WikiPanel from "@jx3box/jx3box-common-ui/src/wiki/WikiPanel";
import ListHead from "@/components/reputation/result/list_head.vue";
import ItemCard from "@/components/reputation/result/item_card.vue";

import { feedback } from "@jx3box/jx3box-common/data/jx3box.json";
import { iconLink } from "@jx3box/jx3box-common/js/utils";

import { getNews } from "@/service/reputation";

export default {
  name: "Index",
  components: { SearchInput, WikiPanel, ListHead, ItemCard },
  data: () => ({
    by: "all",
    feedback,
    news: [],
    list: [],
    level: -1
  }),
  computed: {
    client () {
      return this.$store.state.client;
    },
  },
  watch: {
    level (level) {
      if (level !== -1) {
        this.list = this.news.filter(item => {
          return Object.keys(item.RewardItems).some(rItem => rItem >= level)
        })
      } else {
        this.list = this.news
      }
    }
  },
  methods: {
    iconLink,
    getNews () {
      getNews({
      }).then((res) => {
        this.news = res.data.list || [];
        // console.log(this.news)
      });
    },
  },
  mounted () {
    this.getNews();
  },
};
</script>

<style lang="less">
@import "~@/assets/css/reputation/home.less";
</style>
