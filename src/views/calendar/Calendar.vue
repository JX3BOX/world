<template>
    <div class="v-calendar">
        <!-- 年份切换 -->
        <section class="m-calendar-year">
            <el-button
                icon="el-icon-arrow-left"
                size="mini"
                :disabled="prevDisabled"
                @click="toggleYear('prev')"
            ></el-button>
            <span class="u-year">{{ current.year }}</span>
            <el-button
                icon="el-icon-arrow-right"
                size="mini"
                :disabled="nextDisabled"
                @click="toggleYear('next')"
            ></el-button>
        </section>
        <!-- 月份切换 -->
        <section class="m-calendar-month">
            <el-button-group>
                <el-button
                    v-for="(item, index) in months"
                    :type="current.month == index ? 'primary' : ''"
                    :key="index"
                    size="small"
                    clas="u-month"
                    @click="toggleMonth(index)"
                    >{{ item }}月</el-button
                >
            </el-button-group>
        </section>
        <main class="m-calendar-content">
            <section class="m-calendar-week">
                <div class="u-week" v-for="week in weeks" :key="week">
                    <span>{{ week }}</span>
                </div>
            </section>
            <section class="m-calendar-date">
                <div class="u-date" v-for="(item, index) in dataArr" :key="index">{{ item }}</div>
            </section>
        </main>
    </div>
</template>

<script>
import dayjs from "dayjs";
import { months, weeks } from "@/assets/data/calendar.json";
import isLeapYear from 'dayjs/plugin/isLeapYear';
dayjs.extend(isLeapYear);

export default {
    name: "Calendar",
    data: () => ({
        current: {
            year: "",
            month: "",
            date: "",
        },
        months,
        weeks,

        dataArr: []
    }),
    computed: {
        // 禁止下一年
        nextDisabled() {
            const this_year = dayjs().year();
            return this_year + 1 <= this.current.year;
        },
        // 禁止上一年
        prevDisabled() {
            // jx3 公测 2009
            return this.current.year <= 2009;
        },
        params() {
            const { year, month, date } = this.current;
            return {
                year,
                month,
                date,
            };
        },
    },
    mounted() {
        this.init();
        this.dataArr = Array(40).fill(0,0,40)
    },
    methods: {
        /**
         * 切换年份
         * @param {String}} action next 下一年 prev 上一年
         */
        toggleYear(action) {
            action === "prev"
                ? (this.current.year -= 1)
                : (this.current.year += 1);
        },
        /**
         * 切换月份
         * @param {number} num
         */
        toggleMonth(num) {
            this.current.month = num;
        },
        getMonthData() {
            const { year, month, date } = this.current;
            let dataArr = [];
            let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

            // 闰年
            if (dayjs(year).isLeapYear()) {
                daysInMonth[1] = 29
            }
        },
        init() {
            this.current.year = dayjs().year();
            this.current.month = dayjs().month();
            this.current.date = dayjs().date();
        },
    },
};
</script>
