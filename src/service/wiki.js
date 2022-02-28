import { $helper } from "@jx3box/jx3box-common/js/https.js";

function getKnowledgeMenus() {
	return $helper().get(`/api/knowledge/menus`);
}

// 获取最新更新帖子
function getKnowledgeNewest(params) {
	return $helper().get(`/api/wiki/posts/newest`, {params}).then((res) => {
        return res.data.data
    })
}
export { getKnowledgeMenus, getKnowledgeNewest };
