import { $helper } from "@jx3box/jx3box-common/js/https.js";

// 获取通识子类
function getKnowledgeMenus() {
	return $helper().get(`/api/knowledge/menus`);
}

// 获取最新更新帖子
function getKnowledgeNewest(params) {
	return $helper()
		.get(`/api/wiki/posts/newest`, { params })
		.then((res) => {
			return res.data.data;
		});
}

// 获取玩法指南
function getMenuGroups(params) {
	return $helper()
		.get(`/api/menu_groups`, { params })
		.then((res) => {
			return res.data.data;
		});
}

export { getKnowledgeMenus, getKnowledgeNewest, getMenuGroups };
