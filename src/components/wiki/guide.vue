<template>
	<div class="m-wiki-panel">
		<div class="m-title">
			<span class="u-title-left"><i class="el-icon-orange"></i><span> 玩法指南</span></span>
			<router-link class="u-title-right" to="/type/game">查看更多 &raquo;</router-link>
		</div>
		<div class="m-guide">
            
        </div>
	</div>
</template>
<script>
//import { demo } from '@/utils/common.js';
//import xSearch from '@/components/search.vue';
export default {
	name: "Guide",
	props: [],
	components: {
		//demo
	},
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
<style lang="less">
//@import '@/assets/css/demo.less';
</style>
