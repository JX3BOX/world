<template>
	<div class="m-wiki-panel">
		<div class="m-title">
			<span class="u-title-left"><i class="el-icon-orange"></i><span> 玩法指南</span></span>
			<router-link class="u-title-right" to="/type/game">查看更多 &raquo;</router-link>
		</div>
		<div class="m-guide m-panel">
			<div v-for="(item, index) in data" :key="index" class="u-guide">
				<div class="u-title">{{ item.label }}</div>
				<div class="u-list">
					<a class="u-label" v-for="(menu, key) in item.menus" :key="key" :href="menu.link" target="_blank" v-html="menu.label"></a>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "Guide",
	props: ["data"],
	data: function () {
		return {
			loading: false,
		};
	},
	computed: {},
	watch: {},
	methods: {},
	created: function () {},
	mounted: function () {},
};
</script>
 