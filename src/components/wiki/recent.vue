<template>
	<div class="m-wiki-panel">
		<div class="m-title">
			<span class="u-title-left"><i class="el-icon-time"></i><span> 最新更新</span></span>
		</div>
		<div class="m-recent">
            
        </div>
	</div>
</template>
<script>
//import { demo } from '@/utils/common.js';
//import xSearch from '@/components/search.vue';
export default {
	name: "Recent",
	props: ["list"],
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
