<template>
    <div class="m-quest-newest">
        <div class="u-title">
            <i class="el-icon-collection"></i>
            <span>最新攻略</span>
        </div>
        <div class="u-body"></div>
    </div>
</template>

<script>
export default {
    name: "QuestNewest",
    data() {
        return {
            data: [],
        };
    },
    mounted() {},
    methods: {},
};
</script>

<style lang="less" scoped>
.m-quest-newest {
    width: 100%;
    padding: 10px 0;
    color: #6c645c;
    margin: 0;
    font-weight: 500;
}
</style>
