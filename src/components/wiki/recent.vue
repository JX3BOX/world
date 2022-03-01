<template>
	<div class="m-wiki-panel">
		<div class="m-title">
			<span class="u-title-left"><i class="el-icon-time"></i><span> 最新更新</span></span>
		</div>
		<div class="m-recent m-panel">
			<div class="m-post" v-for="(post, key) in list" :key="key">
				<div class="m-head">
					<div class="m-user">
						<div class="u-author">
							<img class="u-icon" :src="post.user_avatar" :alt="post.user_nickname" />
							<a :href="post.user_id ? authorLink(post.user_id) : null" class="u-name" v-text="post.user_nickname"></a>
						</div>
						<div class="u-updated" v-text="ts2str(post.updated)"></div>
					</div>
					<div class="m-source">
						<div class="u-source">
							<img class="u-icon" svg-inline src="../../assets/img/knowledge.svg" />
							<router-link class="u-name" :to="{ name: 'view', params: { source_id: post.source_id } }" v-text="post.title"></router-link>
						</div>
						<div class="u-remark" v-if="post.remark" v-text="'📑 ' + post.remark"></div>
					</div>
				</div>
				<div class="m-body">
					<div class="u-excerpt" :to="{ name: 'view', params: { source_id: post.source_id } }" v-html="ellipsis(post.excerpt)"></div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { authorLink, ts2str, iconLink } from "@jx3box/jx3box-common/js/utils";
export default {
	name: "Recent",
	props: ["list"],
	components: {
		//demo
	},
	data: function () {
		return {};
	},
	computed: {},
	watch: {},
	methods: {
		authorLink,
		ts2str,

		ellipsis(value) {
			value = value ? value.trim() : "";
			if (value.length > 100) {
				return value.slice(0, 100) + "...";
			}
			return value;
		},
	},
	created: function () {
		if (this.list) console.log(this.list);
	},
};
</script>
