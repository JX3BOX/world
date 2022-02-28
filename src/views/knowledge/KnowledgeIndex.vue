<template>
	<div class="v-knowledge-index">
		<!-- 搜索 -->
		<knowledgeSearch @onSearchKey="onSearchKey" />
		<!-- 搜索结果 -->
	</div>
</template>

<script>
import knowledgeSearch from "@/components/knowledge/search.vue";
export default {
	name: "KnowledgeIndex",
	components: { knowledgeSearch },
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
