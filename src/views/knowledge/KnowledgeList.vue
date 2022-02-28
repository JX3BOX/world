<template>
	<div class="v-knowledge-list">
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
import { getKnowledgeList } from "@/service/knowledge.js";

export default {
	name: "KnowledgeList",
	components: { knowledgeSearch, knowledgeItem },
	data: function () {
		return {
			list: [],

			page: 1,
			per: 20,
			total: 1,
			pages: 1,
		};
	},
	computed: {
		params() {
			return {
				limit: this.per,
				page: this.page,
				...this.$route.params,
			};
		},
	},
	methods: {
		// 获取数据
		getData() {
			console.log(this.params);
			getKnowledgeList(this.params).then((res) => {
				console.log(res);
				this.total = res.total;
				this.list = res.data;
			});
		},
		// 搜索关键词查找
		onSearchKey(search) {
			console.log(search);
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
