<template>
    <div class="m-calendar-item">
        <div class="u-link" :class="linkClassName(item)" v-for="item in links" :key="item.id">
            {{ item.desc }}
        </div>

        <div class="u-date-count" v-if="data && data.count"><b>{{ data.count }}</b>条纪事</div>
    </div>
</template>

<script>
export default {
    name: "calendar-item",
    props: {
        data: {
            type: Object,
            default: null,
        },
    },
    computed: {
        links() {
            const events = this.data?.children.filter((child) => child.type == 1);
            const activities = this.data?.children.filter((child) => child.type == 2);

            return [...events, ...activities];
        },
    },
    methods: {
        linkClassName({ type }) {
            if (type === 1) {
                return "is-event";
            }
            return "is-activity";
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/calendar/calendar_item.less";
</style>
