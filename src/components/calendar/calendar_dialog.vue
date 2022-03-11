<template>
    <el-dialog :visible="value" @close="cancel">
        <template v-slot:title>
            <header>{{ title }}</header>
        </template>
        <main class="u-form">
            <el-form label-position="left" label-width="80px">
                <el-form-item label="日期" required :error="dateError">
                    <div class="m-date">
                        <el-input-number placeholder="请输入年份" :min="2009" :max="maxYear" class="u-date" size="medium" v-model.number="form.year"></el-input-number>
                        <el-input-number placeholder="请输入月份" :min="1" :max="12" class="u-date" size="medium" v-model.number="form.month"></el-input-number>
                        <el-input-number placeholder="请输入日期" :min="1" :max="31" class="u-date" size="medium" v-model.number="form.date"></el-input-number>
                    </div>
                </el-form-item>
                <el-form-item label="类型" required>
                    <el-radio-group size="small" v-model="form.type">
                        <el-radio-button :label="1">事件</el-radio-button>
                        <el-radio-button :label="2">活动</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="描述" required :error="descError">
                    <el-input type="textarea" v-model="form.desc" :rows="3" placeholder="输入事件描述"></el-input>
                </el-form-item>
                <el-form-item label="参考资料">
                    <template v-for="(item, index) in form.link">
                        <div class="m-links" :key="item.id">
                            <el-input class="u-link-item" v-model="item.label" placeholder="请输入标题"></el-input>
                            <el-input class="u-link-item" v-model="item.link" placeholder="请输入链接"></el-input>
                            <el-button class="u-del-icon" type="text" icon="el-icon-circle-close" @click="removeLink(index)" title="删除参考资料"></el-button>
                        </div>
                    </template>
                    <el-button type="primary" size="small" icon="el-icon-plus" @click="addLink" :disabled="addDisabled">添加</el-button>
                </el-form-item>

                <template v-if="isEditor">
                    <el-form-item label="显示日历">
                        <el-radio-group size="small" v-model="form.is_top">
                            <el-radio-button :label="0">否</el-radio-button>
                            <el-radio-button :label="1">是</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="重要级别">
                        <el-input-number v-model="form.level" size="medium"></el-input-number>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="form.remark" size="medium" placeholder="请输入备注"></el-input>
                    </el-form-item>
                    <el-form-item label="样式">
                        <el-select v-model="form.style" size="medium" placeholder="请选择样式"></el-select>
                    </el-form-item>
                    <el-form-item label="海报">
                        <img-upload :data="form.banner" @update="bannerChange"></img-upload>
                    </el-form-item>
                    <el-form-item label="图片">
                        <img-upload :data="form.img" @update="imgChange"></img-upload>
                    </el-form-item>
                    <el-form-item label="背景色" class="m-color-item">
                        <span class="u-color-value" v-show="form.bgcolor">【{{ form.bgcolor }}】</span>
                        <el-color-picker
                            v-model="form.bgcolor"
                            size="small"
                            :predefine="predefineColors">
                        </el-color-picker>
                    </el-form-item>
                    <el-form-item label="颜色" class="m-color-item">
                        <span class="u-color-value" v-show="form.color">【{{ form.color }}】</span>
                        <el-color-picker
                            v-model="form.color"
                            size="small"
                            :predefine="predefineColors">
                        </el-color-picker>
                    </el-form-item>
                </template>
            </el-form>
        </main>
        <template v-slot:footer>
            <el-button size="medium" @click="cancel">取消</el-button>
            <el-button type="primary" size="medium" @click="confirm" :loading="loading">确认</el-button>
        </template>
    </el-dialog>
</template>

<script>
import { addCalendar, putCalendar } from "@/service/calendar.js";
import User from '@jx3box/jx3box-common/js/user.js';
import img_upload from './img_upload.vue';
export default {
    name: "calendar_dialog",
    components: {
        'img-upload': img_upload,
    },
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        dateObj: {
            type: Object,
            default: () => {},
        },
        selected: {
            type: Object,
            default: () => {}
        }
    },
    data: () => ({
        form: {
            year: "",
            month: "",
            date: "",
            type: 1,
            desc: "",
            link: [],

            // 编辑字段
            is_top: 0,
            level: 0,
            banner: '',
            bgcolor: '',
            color: '',
            img: '',
            remark: '',
            style: ''
        },
        dateError: "",
        descError: "",
        loading: false,
        predefineColors: [
          '#ff4500',
          '#ff8c00',
          '#ffd700',
          '#90ee90',
          '#00ced1',
          '#1e90ff',
          '#c71585',
          'rgba(255, 69, 0, 0.68)',
          'rgb(255, 120, 0)',
          'hsv(51, 100, 98)',
          'hsva(120, 40, 94, 0.5)',
          'hsl(181, 100%, 37%)',
          'hsla(209, 100%, 56%, 0.73)',
          '#c7158577'
        ],
    }),
    computed: {
        // 标题
        title() {
            return this.selected && Object.keys(this.selected).length ? '编辑' : '新增'
        },
        maxYear() {
            return new Date().getFullYear() + 1;
        },
        addDisabled() {
            return this.form?.link?.length >=5
        },
        isEditor() {
            return User.isEditor()
        }
    },
    watch: {
        dateObj: {
            deep: true,
            immediate: true,
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
        value(val) {
            if (val) {
                if (this.selected && Object.keys(this.selected).length) {
                    this.form = this.selected
                } else {
                    this.form = {
                        ...this.form,
                        year: this.dateObj?.year || "",
                        month: this.dateObj?.month || "",
                        date: this.dateObj?.date || "",
                    };
                }
            }
        },
        selected: {
            deep: true,
            immediate: true,
            handler(val) {
                if (val && Object.keys(val).length) {
                    this.form = val
                }
            }
        }
    },
    methods: {
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

            this.dateError = "";
            this.descError = "";

            this.$emit("input", false);
        },
        validate() {
            const { year, month, date, desc } = this.form;
            if (!year) {
                this.dateError = "请输入年份";
            } else {
                this.dateError = "";
                if (!month) {
                    this.dateError = "请输入月份";
                } else {
                    this.dateError = !date ? "请输入日期" : "";
                }
            }

            this.descError = !desc ? "请输入事件描述" : "";
        },
        confirm() {
            this.validate();
            if (this.descError || this.dateError) return;
            this.loading = true;

            const fn = Object.keys(this.selected).length ? this.put : this.post;

            fn().then(() => {
                this.loading = false
            })
        },
        post() {
            let { year, month, date, desc, type, link } = this.form;
            link = link.map((item) => {
                return {
                    label: item.label,
                    link: item.link,
                };
            });
            return addCalendar({ year, month, date }, { desc, type, link })
                .then(() => {
                    this.$emit("update");
                    this.cancel();
                })
                .catch((err) => {
                    console.log(err);
                })
        },
        put() {
            let { link } = this.form;
            link = link.map((item) => {
                return {
                    label: item.label,
                    link: item.link,
                };
            });
            return putCalendar(this.selected.id, {
                ...this.form,
                link
            })
            .then(() => {
                this.$emit("update");
                this.cancel();
            })
            .catch((err) => {
                console.log(err);
            })
        },
        // 海报变更
        bannerChange(banner) {
            this.form.banner = banner
        },
        // 图片变更
        imgChange(img) {
            this.form.img = img
        },
    },
};
</script>
