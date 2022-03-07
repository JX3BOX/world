<template>
    <el-dialog :visible="value" @close="close">
        <template v-slot:title>
            <header>新增</header>
        </template>
        <main class="u-form">
            <el-form label-position="left" label-width="80px">
                <el-form-item label="日期" required :error="dateError">
                    <div class="m-date">
                        <el-input-number
                            placeholder="请输入年"
                            :min="2009"
                            :max="maxYear"
                            class="u-date"
                            size="medium"
                            v-model.number="form.year"
                        ></el-input-number>
                        <el-input-number
                            placeholder="请输入月"
                            :min="1"
                            :max="12"
                            class="u-date"
                            size="medium"
                            v-model.number="form.month"
                        ></el-input-number>
                        <el-input-number
                            placeholder="请输入日"
                            :min="1"
                            :max="31"
                            class="u-date"
                            size="medium"
                            v-model.number="form.date"
                        ></el-input-number>
                    </div>
                </el-form-item>
                <el-form-item label="类型" required prop="type">
                    <el-radio-group size="small" v-model="form.type">
                        <el-radio-button :label="1">事件</el-radio-button>
                        <el-radio-button :label="2">活动</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="描述" required prop="desc" :error="descError">
                    <el-input
                        type="textarea"
                        v-model="form.desc"
                        :rows="4"
                        placeholder="输入事件描述"
                    ></el-input>
                </el-form-item>
                <el-form-item label="参考资料">
                    <template v-for="(item, index) in form.link">
                        <div class="m-links" :key="item.id">
                            <el-input
                                class="u-link-item"
                                v-model="item.label"
                                placeholder="请输入标题"
                            ></el-input>
                            <el-input
                                class="u-link-item"
                                v-model="item.link"
                                placeholder="请输入链接"
                            ></el-input>
                            <el-button
                                class="u-del-icon"
                                type="text"
                                icon="el-icon-circle-close"
                                @click="removeLink(index)"
                                title="删除参考资料"
                            ></el-button>
                        </div>
                    </template>
                    <el-button
                        type="primary"
                        size="small"
                        icon="el-icon-plus"
                        @click="addLink"
                        >添加</el-button
                    >
                </el-form-item>
            </el-form>
        </main>
        <template v-slot:footer>
            <el-button size="medium" @click="cancel">取消</el-button>
            <el-button type="primary" size="medium" @click="confirm">确认</el-button>
        </template>
    </el-dialog>
</template>

<script>
import { addCalendar } from '@/service/calendar.js';
export default {
    name: "calendar_dialog",
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        dateObj: {
            type: Object,
            default: () => {},
        },
    },
    data: () => ({
        form: {
            year: "",
            month: "",
            date: "",
            type: 1,
            desc: "",
            link: [],
        },
        dateError: '',
        descError: ''
    }),
    computed: {
        maxYear() {
            return new Date().getFullYear() + 1;
        },
    },
    watch: {
        dateObj: {
            deep: true,
            handler(val) {
                if (Object.keys(val).length) {
                    this.form = {
                        ...this.form,
                        year: val?.year || "",
                        month: val?.month || "",
                        date: val?.date || "",
                    };
                }
            },
        },
    },
    methods: {
        close() {
            this.$emit("input", false);
        },
        addLink() {
            this.form.link.push({
                link: "",
                label: "",
                id: +new Date(),
            });
        },
        removeLink(index) {
            this.form.link.splice(index, 1);
        },
        cancel() {
            this.form = this.$options.data().form;

            this.dateError = ''

            this.close()
        },
        confirm() {
            let { year, month, date, desc, type, link } = this.form;

            if (!year) {
                this.dateError = '输入年份';
                return 
            }
            if (!month) {
                this.dateError = '输入月份';
                return 
            }
            if (!date) {
                this.dateError = '输入日期';
                return 
            }
            if (!desc) {
                this.descError = '输入描述'
                return
            }
            link = link.map(item => {
                return {
                    label: item.label,
                    link: item.link
                }
            })
            addCalendar({ year, mnonth, date }, { desc, type, link }).then(res => {
                console.log(res)
            })
        }
    },
};
</script>