<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb
            name="江湖百科"
            slug="world"
            root="/world"
            :publishEnable="false"
            :feedbackEnable="true"
            :crumbEnable="false"
        >
        </Breadcrumb>
        <div class="m-world-container">
            <div class="m-world-index">
                <h1 class="m-world-index-title">百科目录<span>Encyclopedia</span></h1>
                <el-row :gutter="20">
                    <el-col :span="8" v-for="item in encyclopedia" :key="item.slug"
                        ><div class="u-item">
                            <el-card class="box-card">
                                <div class="u-item">
                                    <a :href="`/${item.slug}`"><i :class="item.icon"></i> {{ item.name }}</a>
                                </div>
                            </el-card>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "App",
    props: [],
    data: function () {
        return {
            encyclopedia: [
                {
                    name: "书籍大全",
                    slug: "book",
                    icon: "el-icon-collection",
                },
                {
                    name: "剑三日历",
                    slug: "calendar",
                    icon: "el-icon-date",
                },
                {
                    name: "通识百科",
                    slug: "knowledge",
                    icon: "el-icon-notebook-2",
                },
                {
                    name: "任务大全",
                    slug: "quest",
                    icon: "el-icon-notebook-1",
                },
                {
                    name: "声望大全",
                    slug: "reputation",
                    icon: "el-icon-notebook-1",
                }
            ]
        };
    },
    computed: {},
};
</script>

<style lang="less">
@import "./assets/css/app.less";
</style>
