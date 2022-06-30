<template>
    <div class="point-filter" @click="changeFilter">
        <img v-if="active" draggable="false" :src="icon(true)" alt="" />
        <img v-else draggable="false" :src="icon(false)" alt="" />
    </div>
</template>

<script>
export default {
    name: "PointFilter",
    props: {
        default: {
            type: Boolean,
            default: false,
        },
        pointType: {
            type: String,
        },
    },
    data() {
        return {
            active: this.default,
        };
    },
    mounted() {
        this.$emit("onPointFilterChange", this.pointType, this.active);
    },
    methods: {
        changeFilter: function () {
            this.active = !this.active;
            this.$emit("onPointFilterChange", this.pointType, this.active);
        },
        icon: function (enable) {
            let icons = {
                Common: [
                    require("@/assets/img/quest/questpanel-42.png"),
                    require("@/assets/img/quest/questpanel-40.png"),
                ],
                Start: [
                    require("@/assets/img/quest/questpanel-31.png"),
                    require("@/assets/img/quest/questpanel-36.png"),
                ],
                End: [require("@/assets/img/quest/questpanel-35.png"), require("@/assets/img/quest/questpanel-32.png")],
            };
            if (icons[this.pointType]) {
                return icons[this.pointType][enable ? 1 : 0];
            } else {
                return icons["Common"][enable ? 1 : 0];
            }
        },
    },
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/quest/single/point_filter.less";
</style>
