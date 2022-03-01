<template>
	<div class="v-knowledge-single" v-loading="loading">
		<div class="m-navigation">
			<el-button class="u-goback" size="medium" icon="el-icon-arrow-left" @click="goBack" plain>返回列表</el-button>
		</div>

		<div class="m-wiki" v-if="data && data.post">
			<WikiPanel class="m-knowledge-panel" :wiki-post="data">
				<template slot="head-title">
					<img class="u-icon" svg-inline src="../../assets/img/knowledge.svg" />
					<span>通识 - {{ data.post.title }} </span>
				</template>
				<template slot="head-actions">
					<a class="el-button el-button--primary" :href="publishLink(`knowledge/${id}`)">
						<i class="el-icon-edit"></i>
						<span>完善百科通识</span>
					</a>
				</template>
				<template slot="body">
					<Article :content="data.post.content" />
					<Thx class="m-thx" slot="single-append" :postId="id" postType="knowledge" :userId="author_id" :adminBoxcoinEnable="isRevision" :userBoxcoinEnable="isRevision" />
				</template>
			</WikiPanel>

			<WikiRevisions v-if="id" type="knowledge" :source-id="id" style="margin-bottom: 35px" />

			<template v-if="id">
				<el-divider content-position="left">讨论</el-divider>
				<Comment :id="id" category="knowledge" />
			</template>
		</div>

		<div v-else class="m-wiki-null">
			<i class="el-icon-s-opportunity"></i>
			<span>暂无内容，我要</span>
			<a class="s-link" :href="publishLink(`knowledge/${id}`)">完善百科通识</a>
		</div>
	</div>
</template>

<script>
import { getKnowledgeDetail } from "@/service/knowledge.js";
import { postStat } from "@jx3box/jx3box-common/js/stat";
import { WikiPost } from "@jx3box/jx3box-common/js/helper";
import { publishLink } from "@jx3box/jx3box-common/js/utils";
import WikiPanel from "@jx3box/jx3box-common-ui/src/wiki/WikiPanel";
import WikiRevisions from "@jx3box/jx3box-common-ui/src/wiki/WikiRevisions";

import Article from "@jx3box/jx3box-editor/src/Article.vue";
import Comment from "@jx3box/jx3box-comment-ui/src/Comment.vue";

export default {
	name: "Detail",
	data: function () {
		return {
			loading: false,
			data: "",
		};
	},
	components: {
		Article,
		WikiPanel,
		WikiRevisions,
		Comment,
	},
	computed: {
		id: function () {
			return this.$route.params.source_id;
		},
		type: function () {
			return this.data.source.type;
		},
		isRevision: function () {
			return !!this.$route.params.post_id;
		},
		author_id: function () {
			return ~~this.data.post.user_id;
		},
	},
	methods: {
		getData() {
			this.loading = true;
			getKnowledgeDetail(this.id)
				.then((res) => {
					this.data = res;
				})
				.finally(() => {
					this.loading = false;
				});
		},
		goBack() {
			this.$router.push({ name: "normal", params: { knowledge_type: this.data.source.type } });
		},
		publishLink,
	},
	created: function () {
		this.getData();
	},
	watch: {
		"$route.params.post_id": {
			immediate: true,
			handler() {
				if (this.$route.params.post_id) {
					// 获取指定攻略
					WikiPost.view(this.$route.params.post_id)
						.then((res) => {
							res = res.data;
							if (res.code === 200) {
								this.data = res.data;
								if (this.data.source) this.data.source.post = this.data.post;
							}
						})
						.then(() => {
							// 提交子统计
							postStat(this.type, this.id);
						});
				}
			},
		},
	},
};
</script>

<style lang="less">
.m-wiki,
.m-wiki-null {
	.mt(20px);
}
.m-wiki-null {
	.x;
	.r(5px);
	.fz(15px);
	padding: 20px;
	background-color: #fafbfc;
	border: 1px solid #eee;

	a:hover {
		box-shadow: 0 1px 0 @primary;
	}
}
</style>
