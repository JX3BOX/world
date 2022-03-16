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
                <el-form-item label="客户端" required>
                    <el-radio-group size="small" v-model="form.client">
                        <el-radio-button label="std">正式服</el-radio-button>
                        <el-radio-button label="origin">怀旧服</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="参考资料">
                    <template v-for="(item, index) in form.link">
                        <div class="m-links" :key="item.id">
                            <el-input class="u-link-item" v-model="item.label" placeholder="请输入标题"></el-input>
                            <el-input class="u-link-item" v-model="item.url" placeholder="请输入链接"></el-input>
                            <el-button class="u-del-icon" type="text" icon="el-icon-circle-close" @click="removeLink(index)" title="删除参考资料"></el-button>
                        </div>
                    </template>
                    <el-button type="primary" size="small" icon="el-icon-plus" @click="addLink" :disabled="addDisabled">添加</el-button>
                </el-form-item>

                <template v-if="isEditor && isEditmode">
                    <el-form-item label="置顶显示">
                        <el-radio-group size="small" v-model="form.is_top">
                            <el-radio-button :label="0">否</el-radio-button>
                            <el-radio-button :label="1">是</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="重要级别">
                        <el-input-number v-model="form.level" size="medium"></el-input-number>
                    </el-form-item>
                    <el-form-item label="样式">
                        <div class="m-style">
                            <el-select v-model="form.style" size="medium" placeholder="请选择样式"></el-select>
                            <div class="m-color-item">
                                <label class="u-label">背景色</label>
                                <span class="u-color-value" v-show="form.bgcolor">【{{ form.bgcolor }}】</span>
                                <el-color-picker v-model="form.bgcolor" size="small" :predefine="predefineColors"> </el-color-picker>
                            </div>
                            <div class="m-color-item">
                                <label class="u-label">颜色</label>
                                <span class="u-color-value" v-show="form.color">【{{ form.color }}】</span>
                                <el-color-picker v-model="form.color" size="small" :predefine="predefineColors"> </el-color-picker>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="海报">
                        <img-upload :data="form.banner" filed="banner" @update="setMeta"></img-upload>
                    </el-form-item>
                    <el-form-item label="图片">
                        <img-upload :data="form.img" filed="img" @update="setMeta"></img-upload>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="form.remark" size="medium" placeholder="请输入备注"></el-input>
                    </el-form-item>
                    <el-form-item label="操作">
                        <el-button icon="el-icon-refresh-left" size="small" @click="recheck" type="warning">复审</el-button>
                        <el-button icon="el-icon-delete" size="small" @click="del" type="danger">删除</el-button>
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
    import { addCalendar, putCalendar, delCalendar } from "@/service/calendar.js";
    import User from "@jx3box/jx3box-common/js/user.js";
    import img_upload from "./img_upload.vue";
    import calendar_highlights from "@/assets/data/calendar_highlights.json";
    const default_data = {
        year: 2022,
        month: 3,
        date: 16,
        type: 1,
        desc: "",
        client: location.href.includes("origin") ? "origin" : "std",
        link: [],

        // 编辑字段
        is_top: 0,
        level: 0,
        remark: "",

        // 海报字段
        banner: "",
        bgcolor: "",
        color: "",
        img: "",
        style: "",
        icon: "",
    };
    export default {
        name: "calendar_dialog",
        components: {
            "img-upload": img_upload,
        },
        props: ["value", "dateObj", "selected", "mode"],
        data: function () {
            return {
                form: {
                    ...Object.assign({}, default_data, this.dateObj),
                },
                dateError: "",
                descError: "",
                loading: false,
                predefineColors: calendar_highlights,
            };
        },
        computed: {
            // 编辑模式
            isEditmode() {
                return this.mode == "update";
            },

            // 标题
            title() {
                return this.isEditmode ? "编辑" : "新增";
            },

            // 最大年份
            maxYear() {
                return new Date().getFullYear() + 1;
            },
            // 参考资料最大数
            addDisabled() {
                return this.form?.link?.length >= 10;
            },

            // 编辑权限
            isEditor() {
                return User.isEditor();
            },
        },
        watch: {
            // 更新数据
            selected: {
                deep: true,
                immediate: true,
                handler(val) {
                    if (val) {
                        this.form = val;
                        if (!this.form.link) {
                            this.form.link = [];
                            this.form.link.push({
                                label: "官网新闻",
                                url: val.link_temp,
                            });
                        }
                    } else {
                        this.form = Object.assign({}, default_data, this.dateObj);
                    }
                },
            },
        },
        methods: {
            // 链接模块
            // =======================
            addLink() {
                this.form?.link?.push({
                    url: "",
                    label: "",
                    id: +new Date(),
                });
            },
            removeLink(index) {
                this.form?.link?.splice(index, 1);
            },

            // 表单校验
            // =======================
            validate() {
                if (!this.form) return;

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

            // 表单操作
            // =======================
            reset() {
                this.$emit("input", false);
                this.form = "";
                this.dateError = "";
                this.descError = "";
            },
            cancel() {
                this.$emit("input", false);
            },
            confirm() {
                this.validate();
                if (this.descError || this.dateError) return;
                this.loading = true;

                const fn = this.isEditmode ? this.put : this.post;

                fn()
                    .then(() => {
                        this.reset();
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },

            // 数据发送
            // =======================
            post() {
                return addCalendar({ year, month, date }, this.form).then((res) => {
                    this.$emit("update", res);
                    this.reset();
                });
            },
            put() {
                return putCalendar(this.selected.id, this.form).then((res) => {
                    this.$emit("update");
                    this.reset();
                });
            },
            del() {
                delCalendar(this.selected.id).then(() => {
                    this.$emit("del", this.selected.id);

                    this.$notify({
                        type: "success",
                        title: "删除成功",
                        message: "日历记录已删除",
                    });
                });
            },
            recheck() {
                putCalendar(this.selected.id, {
                    status: 0,
                }).then(() => {
                    this.$notify({
                        type: "success",
                        title: "操作成功",
                        message: "日历记录已设为待审核",
                    });

                    this.$emit("del", this.selected.id);
                });
            },

            // 其它
            // =======================
            setMeta({ key, val }) {
                this.form[key] = val;
            },
        },
    };
</script>
