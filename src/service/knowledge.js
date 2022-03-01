import { $helper } from "@jx3box/jx3box-common/js/https";

function getKnowledgeList(params) {
	return $helper()
		.get(`api/knowledge/menu_list`, { params })
		.then((res) => {
			return res.data.data;
		});
}

function getKnowledgeSearch(params) {
	return $helper()
		.get(`api/knowledges`, { params })
		.then((res) => {
			return res.data.data;
		});
}
function getKnowledgeDetail(id) {
	return $helper()
		.get(`api/wiki/post`, {
			params: {
				source_id: id,
				type: "knowledge",
			},
		})
		.then((res) => {
			return res.data.data;
		});
}

export { getKnowledgeList, getKnowledgeSearch, getKnowledgeDetail };
