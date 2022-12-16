<template>
  <div
    class="m-reputation-card"
    @click="go(item.dwForceID)"
  >
    <div class="u-name-icon">
      <img
        v-if="getIcon(item.szIconPath)"
        :src="getIcon(item.szIconPath)"
      />
      <span v-else>无</span>
    </div>
    <div class="u-name">
      <span class="u-name-title">
        <span class="u-name-text">{{ item.szName }}</span>
      </span>
      <span class="u-name-id">（ID：{{ item.dwForceID }}）</span>
    </div>
    <div class="u-map">
      <span v-if="item.szMapNames && item.szMapNames[0]">{{ item.szMapNames && item.szMapNames[0] }}</span>
      <span v-else>无</span>
    </div>
    <div class="u-map">
      <span v-if="item.GroupName">{{ item.GroupName }}</span>
      <span v-else>无</span>
    </div>
    <div class="u-level">
      <span v-if="getMaxLevel(item.GainDesc)">{{ getMaxLevel(item.GainDesc) }}</span>
      <span v-else>无</span>
    </div>
    <div class="u-name">
      <template v-if="getPath(item.szName)">
        <div>
          <div class="u-path">{{ getPath(item.szName) }}</div>
          <span class="u-name-id">（遗失的尊敬）</span>
        </div>
      </template>
      <span v-else>无</span>
    </div>
    <div class="u-reward">
      <div class="u-reward-item">
        <template v-if="getReward(item.RewardItems).length">
          <item-icon
            v-for="(reward, index) in getReward(item.RewardItems)"
            :key="index"
            :item_id="reward.id"
            :amount="reward.amount"
            :onlyIcon="true"
            :size="28"
          ></item-icon>
        </template>
        <span v-else>无</span>
      </div>
    </div>
  </div>
</template>

<script>
import ItemIcon from "../common/item_icon.vue";
import levels from '@/assets/data/reputation_level.json';
import paths from '@/assets/data/reputation_exchange_path.json';
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";

export default {
  name: "ReputationCard",
  components: {
    ItemIcon,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    level: {
      type: Number
    }
  },
  methods: {
    go (id) {
      this.$router.push({ name: "single", params: { reputation_id: id } });
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
    },
    getIcon (iconPath) {
      const rPath = iconPath ? iconPath.replace(/\//g, '\\') : ''
      const iconName = rPath ? rPath.split('\\')[rPath.split('\\').length - 1].toLowerCase().split('.tga')[0] : ''
      if (iconName) {
        return __imgPath + 'reputation/reputation/std/icon/' + iconName + '.png'
      } else {
        return ''
      }
    },
    getReward (obj) {
      if (obj) {
        let arr = []
        for (let level in obj) {
          arr = arr.concat(obj[level])
        }
        let arr_8 = arr.filter(item => {
          return item.split('_')[0] === '8'
        })
        if (!arr_8.length) {
          arr_8 = arr.filter(item => {
            return item.split('_')[0] === '7'
          })
        }
        const arr_not678 = arr.filter(item => {
          // 678开头的为装备， 敬重或尊敬的最后一个8为挂件，没有挂件就选一个装备显示， 10为家具， 5为玩具或其他
          return !['6', '7', '8'].includes(item.split('_')[0])
        })
        const arr_8_lately = arr_8.length ? [arr_8[arr_8.length - 1]] : []
        const arr_lately = arr_8_lately.concat(arr_not678)
        return arr_lately.map(item => {
          return {
            amount: 1,
            id: item
          }
        })
      } else {
        return []
      }
    }
  },
  computed: {
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/css/reputation/result/item_card.less";
</style>
