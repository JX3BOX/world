<template>
    <div class="map">
        <el-carousel :autoplay="false" :arrow="showArrow" ref="carousel" :height="`${height}px`">
            <el-carousel-item v-for="(ps, mapId) in points" :key="mapId">
                <div class="container" :style="containerSize">
                    <img class="map-img" :src="mapImgUrl(mapId)" draggable="false" alt="任务地图图片" />
                    <div class="map-tool">
                        <p class="map-name">{{ mapName(mapId) }}</p>
                    </div>
                    <template v-for="point in ps">
                        <el-popover
                            :key="point.Types + JSON.stringify(point.Coordinates)"
                            v-if="filter[point.Types]"
                            class="map-point-popover"
                            :class="{
                                'bigger-point': point.Types === 'Start' || point.Types === 'End',
                                'start-point': point.Types === 'Start',
                            }"
                            placement="top"
                            trigger="hover"
                            :style="pointStyle(point.Coordinates, mapId)"
                            popper-class="map-point-popover"
                            :visible-arrow="false"
                        >
                            <div class="popover-content">
                                <p>{{ point.Types | pointType }}</p>
                                <p>{{ point.ObjectName }} ({{ point.ObjectType | objectType }} {{ point.ObjectID }})</p>
                                <p>{{ point.Coordinates | coordinates }}</p>
                            </div>
                            <template slot="reference">
                                <img
                                    v-if="point.Types == 'Start'"
                                    :class="pointClass(point)"
                                    :src="pointIcon(point.Types, questType)"
                                />
                                <img
                                    v-else-if="point.Types == 'End'"
                                    :class="pointClass(point)"
                                    :src="pointIcon(point.Types, questType)"
                                />
                                <span v-else :class="pointClass(point)"></span>
                            </template>
                        </el-popover>
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
    name: "QuestMap",
    props: {
        questType: {
            type: String,
            default: "common",
        },
        points: {
            type: Object,
        },
        filter: {
            type: Object,
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
        pointStyle(Coordinates, MapId) {
            let mapScales = MapScales[`${MapId}`][0];
            let res = {
                left: `${(Coordinates[0] - mapScales.StartX) * mapScales.Scale * (this.width / 1024)}px`,
                bottom: `${(Coordinates[1] - mapScales.StartY) * mapScales.Scale * (this.height / 896)}px`,
            };
            return res;
        },
        pointClass(point) {
            return {
                "map-point": true,
                "kill-npc": point.Types.startsWith("KillNpc"),
                "need-item": point.Types.startsWith("NeedItem"),
                "map-icon": point.Types == "Start" || point.Types == "End",
            };
        },
        pointIcon(type, questType) {
            let icon = {
                Start_Act: require("@/assets/img/quest/dialoguelabel-88.png"),
                Start_Repeat: require("@/assets/img/quest/dialoguelabel-84.png"),
                Start_Common: require("@/assets/img/quest/dialoguelabel-81.png"),
                End: require("@/assets/img/quest/dialoguelabel-80.png"),
            };
            if (type == "End") return icon.End;
            else {
                if (questType == "act") return icon.Start_Act;
                else if (questType == "repeat") return icon.Start_Repeat;
                else return icon.Start_Common;
            }
        },
        updateSize() {
            this.width = this.$refs.carousel.$el.clientWidth;
            this.height = this.width / (1024 / 896);
        },
    },
    filters: {
        pointType(type) {
            let map = {
                Start: "任务开始点",
                End: "任务结束点",
                KillNpc: "击杀怪物",
                NeedItem: "需要物品",
            };
            if (map[type]) return map[type];
            else if (type.startsWith("State")) return type.replace("State", "进度");
            else if (type.startsWith("KillNpc")) return type.replace("KillNpc", "击杀怪物");
            else if (type.startsWith("NeedItem")) return type.replace("NeedItem", "需要物品");
            else return "其它";
        },
        objectType(value) {
            let map = {
                npc: "NPC",
                point: "坐标",
                doodad: "交互物品",
            };
            return map[value] ?? "其他";
        },
        coordinates(value) {
            return `(${value[0]},${value[1]},${value[2]})`;
        },
    },
    mounted() {
        this.$nextTick(function () {
            this.updateSize();
            window.addEventListener("resize", this.updateSize);
        });
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.updateSize);
    },
};
</script>

<style lang="less">
@import "~@/assets/css/quest/single/quest_map.less";
</style>
