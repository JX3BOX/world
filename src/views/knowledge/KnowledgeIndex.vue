<template>
	<div class="v-knowledge-index" v-loading="loading">
		<!-- 搜索 -->
		<knowledgeSearch @onSearchKey="onSearchKey" />
		<!-- 搜索结果 -->
		<knowledgeList v-if="search" :list="list" :pagination="pagination" @onSearchKey="onSearchKey" />
		<!-- 便捷入口 -->
		<wikiEntry />
		<!--  玩法指南 -->
		<wikiGuide />
		<!-- 热门剧情 -->
		<wikiHot :data="hot" />
		<!-- 热门剧情 -->
		<wikiRecent :list="recent" />
	</div>
</template>

<script>
import knowledgeSearch from "@/components/knowledge/search.vue";
import knowledgeList from "@/components/knowledge/list.vue";
import wikiEntry from "@/components/wiki/entry.vue";
import wikiGuide from "@/components/wiki/guide.vue";
import wikiHot from "@/components/wiki/hot.vue";
import wikiRecent from "@/components/wiki/recent.vue";
import { getKnowledgeSearch } from "@/service/knowledge.js";
import { getKnowledgeNewest } from "@/service/wiki.js";

export default {
	name: "KnowledgeIndex",
	components: {
		knowledgeSearch,
		knowledgeList,
		wikiEntry,
		wikiGuide,
		wikiHot,
		wikiRecent,
	},
	data: function () {
		return {
			loading: false,
			search: "",
			list: "",

			page: 1,
			per: 20,
			total: 1,
			pages: 1,

			hot: {
				title: "热门剧情",
				icon: "el-icon-collection",
				list: "",
			},
			recent: "",
		};
	},
	computed: {
		params() {
			let params = {
				limit: this.per,
				page: this.page,
				keyword: this.search,
			};
			return params;
		},
		pagination() {
			return {
				page: this.page,
				total: this.total,
				per: this.per,
			};
		},
	},
	methods: {
		// 获取搜索的数据
		getSearchData() {
			this.loading = true;
			getKnowledgeSearch(this.params)
				.then((res) => {
					this.list = res.data;
					this.total = res.total;
				})
				.finally(() => {
					this.loading = false;
				});
		},
		// 获取最新帖子数据
		getRecentData() {
			getKnowledgeNewest({ type: "knowledge" }).then((res) => {
				this.recent = res.newest;
			});
		},
		// 搜索关键词查找
		onSearchKey(val) {
			this.search = val;
			this.page = 1;
		},
		// 切换页码
		onPageKey(val) {
			this.page = val;
		},
	},
	watch: {
		params() {
			this.getSearchData();
		},
	},
	created: function () {
		this.getRecentData();
	},
};
</script>
