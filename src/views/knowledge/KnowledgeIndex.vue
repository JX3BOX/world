<template>
	<div class="v-knowledge-index" v-loading="loading">
		<!-- 搜索 -->
		<knowledgeSearch @onSearchKey="onSearchKey" />
		<!-- 搜索结果 -->
		<knowledgeList :list="list" @onSearchKey="onSearchKey" />
	</div>
</template>

<script>
import knowledgeSearch from "@/components/knowledge/search.vue";
import knowledgeList from "@/components/knowledge/list.vue";
export default {
	name: "KnowledgeIndex",
	components: { knowledgeSearch, knowledgeList },
	data: function () {
		return {};
	},
	computed: {},
	methods: {
		onSearchKey(search) {
			console.log(search);
		},
	},
	created: function () {},
};
</script>
