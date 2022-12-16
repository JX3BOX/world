<template>
  <div class="m-reputation-map">
    <el-carousel
      :autoplay="false"
      :arrow="showArrow"
      ref="carousel"
      :height="`${height}px`"
    >
      <el-carousel-item
        v-for="(ps) in points"
        :key="ps.mapId"
      >
        <div
          class="u-map__container"
          :style="containerSize"
        >
          <img
            class="u-map-img"
            :src="mapImgUrl(ps.mapId)"
            draggable="false"
            alt="声望商地图"
          />
          <div class="u-map-tool">
            <p class="u-map-name">{{ mapName(ps.mapId) }}</p>
          </div>
          <template v-if="ps.guides.kind">
            <!-- <div
              class="u-map-point__warpper"
              :style="pointStyle(ps.guides.positions, ps.mapId)"
            > -->
            <el-popover
              class="u-map-point__warpper"
              placement="top"
              trigger="hover"
              :style="pointStyle(ps.guides.positions, ps.mapId)"
              popper-class="u-map-point__popover"
              :visible-arrow="false"
            >
              <div
                class="u-map-point u-reputation-map-point"
                slot="reference"
              ></div>
              <p>{{ ps.guides.npcName }}</p>
              <p>{{ ps.guides.positions | coordinates }}</p>
            </el-popover>
            <!-- </div> -->
          </template>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import MapScales from "@jx3box/jx3box-petmap/output/MapScales.json";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";

export default {
  name: "ReputationMap",
  props: {
    points: {
      type: Array,
    },
  },
  data: () => ({
    height: 896,
    width: 1024,
  }),
  computed: {
    containerSize: function () {
      return {
        width: this.width + "px",
        height: this.height + "px",
      };
    },
    showArrow: function () {
      return Object.keys(this.points).length > 1 ? "always" : "never";
    },
  },
  methods: {
    mapImgUrl: (id) => {
      return `${__imgPath}map/maps/map_${id}_0.png`;
    },
    mapName: (id) => {
      if (MapScales[`${id}`]) {
        return MapScales[`${id}`][0]["Name"];
      } else {
        return "未知地图";
      }
    },
    pointStyle (Coordinates, MapId) {
      let mapScales = MapScales[`${MapId}`];
      if (mapScales) {
        mapScales = mapScales[0];
      } else {
        console.warn(`未知的地图ID：${MapId}`);
        return {};
      }
      let res = {
        left: `${(Coordinates[0] - mapScales.StartX) * mapScales.Scale * (this.width / 1024)}px`,
        bottom: `${(Coordinates[1] - mapScales.StartY) * mapScales.Scale * (this.height / 896)}px`,
      };
      return res;
    },
    updateSize () {
      this.width = this.$refs.carousel.$el.clientWidth;
      this.height = this.width / (1024 / 896);
    },
  },
  filters: {
    coordinates (value) {
      return `(${value[0]},${value[1]},${value[2]})`;
    },
  },
  mounted () {
    // console.log(this.points)
    this.$nextTick(function () {
      this.updateSize();
      window.addEventListener("resize", this.updateSize);
    });
  },
  beforeDestroy () {
    window.removeEventListener("resize", this.updateSize);
  },
};
</script>

<style lang="less">
@import "~@/assets/css/reputation/single/reputation_map.less";
</style>
