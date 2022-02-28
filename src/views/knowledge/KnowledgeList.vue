<template>
	<div class="v-knowledge-list" v-loading="loading">
		<!-- 搜索 -->
		<knowledgeSearch @onSearchKey="onSearchKey" />
		<!-- 搜索结果 -->
		<div class="m-knowledge" v-if="list.length">
			<knowledgeItem v-for="(item, index) in list" :key="index" :data="item" />
		</div>
		<div v-else>没有数据</div>
	</div>
</template>

<script>
import knowledgeSearch from "@/components/knowledge/search.vue";
import knowledgeItem from "@/components/knowledge/list_item.vue";
import { getKnowledgeList, getKnowledgeSearch } from "@/service/knowledge.js";

export default {
	name: "KnowledgeList",
	components: { knowledgeSearch, knowledgeItem },
	data: function () {
		return {
			loading: false,
			search: "",
			list: [],

			page: 1,
			per: 20,
			total: 1,
			pages: 1,
		};
	},
	computed: {
		params() {
			let params = {
				limit: this.per,
				page: this.page,
				...this.$route.params,
			};
			if (this.search) {
				delete params.knowledge_type;
				params = { ...params, keyword: this.search };
			} else {
				delete params.keyword;
			}

			return params;
		},
	},
	methods: {
		// 获取数据
		getData() {
			this.search ? this.getSearchData(this.params) : this.getListData(this.params);
		},
		// 按类别获取数据
		getListData(params) {
			this.loading = true;
			getKnowledgeList(params)
				.then((res) => {
					console.log(res);
					this.total = res.total;
					this.list = res.data;
				})
				.finally(() => {
					this.loading = false;
				});
		},
		// 搜索获取数据
		getSearchData(params) {
			this.loading = true;
			getKnowledgeSearch(params)
				.then((res) => {
					this.list = res.data;
					this.total = res.total;
				})
				.finally(() => {
					this.loading = false;
				});
		},

		// 搜索关键词查找
		onSearchKey(val) {
			this.search = val;
			this.page = 1;
		},
	},
	watch: {
		params() {
			this.getData();
		},
	},
	created: function () {
		this.getData();
	},
};
</script>
