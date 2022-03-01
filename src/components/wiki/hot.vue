<template>
	<div class="m-wiki-panel">
		<div class="m-title">
			<span class="u-title-left">
				<i :class="icon"></i><span> {{ title }}</span>
			</span>
			<router-link v-if="link" class="u-title-right" to="link">查看更多 &raquo;</router-link>
		</div>
		<div class="m-panel">
			<el-carousel height="66" direction="vertical" indicator-position="none" v-if="list.length">
				<el-carousel-item class="m-hot" v-for="(line, index) in list" :key="index">
					<router-link v-for="(item, key) in line" :key="key" class="u-hot" :to="{ name: 'view', params: { source_id: item.id } }">
						<img class="u-icon" :src="hot_img" />
						<div class="u-content">
							<div class="u-title" v-text="item.name"></div>
							<div class="u-desc" v-if="item.post">
								<span :title="item.post.remark">{{ "By " + item.post.user_nickname }}</span>
							</div>
						</div>
					</router-link>
				</el-carousel-item>
			</el-carousel>
			<div v-else>😂 暂无热门事件</div>
		</div>
	</div>
</template>
<script>
import { __iconPath } from "@jx3box/jx3box-common/data/jx3box";
export default {
	name: "Hot",
	props: ["data"],
	data: function () {
		return {
			hot_img: __iconPath + "icon/243.png",
		};
	},
	computed: {
		icon() {
			return this.data.icon;
		},
		title() {
			return this.data.title;
		},
		link() {
			return this.data.link || "";
		},
		list() {
			let _list = [];
			if (this.data?.list) {
				let list = this.data.list.filter(Boolean);
				for (var i = 0; i < list.length; i += 3) {
					_list.push(list.slice(i, i + 3));
				}
			}
			return _list;
		},
	},
};
</script>
<style scoped>
.m-panel {
	height: 66px;
	margin-bottom: 10px;
	overflow: hidden;
}
</style>
