<template>
    <div class="m-calendar-item" :class="slogan ? slogan.style : ''" :style="sloganStyle">
        <span
            class="u-date-text"
            :style="{ backgroundColor: isToday && themeColor, color: isToday && themeColor && '#fff' }"
            >{{ data.date }}</span
        >
        <div v-if="data.type === 'normal'" class="u-links">
            <div
                class="u-link"
                :class="linkClassName(item)"
                :style="{ backgroundColor: item.bgcolor || 'rgba(255,255,255,0.6)', color: item.bgcolor ? '#fff' : '#333' }"
                v-for="item in links"
                :key="item.id"
            >
                {{ item.title || item.desc }}
            </div>
        </div>
        <div class="u-nothing" v-else>...</div>
        <div class="u-date-count" v-if="countData">
            <b>{{ countData.count }}</b
            >条纪事
        </div>
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
        counts: {
            type: Array,
            default: () => [],
        },
        slogans: {
            type: Array,
            default: () => [],
        },
        pageSlogan: {
            type: Object,
            default: () => {},
        },
        isToday: {
            type: Boolean,
        },
    },
    computed: {
        links() {
            const events = this.data?.children.filter((child) => child.type == 1);
            const activities = this.data?.children.filter((child) => child.type == 2);

            return [...events, ...activities].slice(0, 3);
        },
        countData() {
            const { data } = this;
            return this.counts.find((d) => d.year === data.year && d.month === data.month && d.date === data.date);
        },
        slogan() {
            const { data } = this;
            return this.slogans.find((d) => d.year == data.year && d.month == data.month && d.date == data.date);
        },
        sloganStyle() {
            return {
                backgroundColor: this.slogan?.bgcolor,
                backgroundImage: `url(${this.slogan?.img})`,
            };
        },
        themeColor(){
            return this.pageSlogan?.color
        }
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
