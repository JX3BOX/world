import { $helper } from "@jx3box/jx3box-common/js/https.js";

function getKnowledgeMenus() {
    return $helper().get(`/api/knowledge/menus`);
}

export { getKnowledgeMenus };
