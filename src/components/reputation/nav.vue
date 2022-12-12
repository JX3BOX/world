<template>
  <nav class="m-nav">
    <div class="m-menus-panel">
      <el-tree
        class="m-menus"
        :data="versions"
        node-key="id"
        ref="tree"
      >
        <router-link
          class="el-tree-node__label"
          slot-scope="{ node, data }"
          :to="menuLink(data, node)"
        >
          <span
            class="u-name"
            v-text="'【 ' + data.name + ' 】'"
          ></span>
          <em
            class="u-count"
            v-text="`(${1})`"
          ></em>
        </router-link>
      </el-tree>
    </div>
  </nav>
</template>

<script>
import { getCategory } from "@/service/quest";
import maps from "@jx3box/jx3box-data/data/fb/fb_map.json";

export default {
  name: "Nav",
  data: () => ({
    keyword: "",
    menus: [],
    versions: []
  }),
  computed: {
    client () {
      return this.$store.state.client;
    },
  },
  methods: {
    menuLink (menu) {
      return { name: "result", query: { id: menu.id } };
    },
    getMenus () {
      getCategory({
        by: 'map',
        client: this.client,
      }).then((res) => {
        const data = [{
          id: 1,
          name: '霸刀山庄',
          type: 0,
          typeName: '风起稻香'
        }, {
          id: 1,
          name: '藏剑山庄',
          type: 1,
          typeName: '巴蜀风云'
        }, {
          id: 2,
          name: '天策府',
          type: 1,
          typeName: '巴蜀风云'
        }];
        const types = []
        data.forEach(item => {
          if (!types.find(type => type.id === item.type)) {
            types.push({
              id: item.type,
              name: item.typeName,
              total: data.filter(dItem => dItem.type === item.type).length
            })
          }
        })
        types.push({
          id: -1,
          name: '声望总览',
          total: data.length
        })
        const menus = types.sort((a, b) => a.id - b.id)
        this.menus = menus
      });
    },
  },
  mounted () {
    const arr = []
    let i = 1
    for (const version in maps) {
      if (!arr.includes(version)) {
        arr.unshift({
          id: i,
          name: version
        })
        i++;
      }
    }
    arr.unshift({
      id: 0,
      name: '声望总览'
    })
    this.versions = arr
    this.getMenus();
  },
};
</script>

<style lang="less">
@import "~@/assets/css/reputation/nav.less";
</style>
