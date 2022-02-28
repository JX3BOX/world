<template>
	<div class="m-wiki-panel">
		<div class="m-title">
			<span class="u-title-left">
				<i :class="icon"></i><span> {{ title }}</span>
			</span>
		</div>
		<div class="m-recent"></div>
	</div>
</template>
<script>
export default {
	name: "demo",
	props: ["data"],
	data: function () {
		return {
			loading: false,
		};
	},
	computed: {
		icon() {
			return this.data.icon;
		},
		title() {
			return this.data.title;
		},
		list() {
			return this.data.list;
		},
		link() {
			return this.data.link;
		},
	},
	watch: {},
	methods: {},
	created: function () {},
	mounted: function () {},
};
</script>
<style lang="less">
//@import '@/assets/css/demo.less';
</style>
