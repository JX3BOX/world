import { $node } from "@jx3box/jx3box-common/js/https";
const $ = $node()

/* import axios from 'axios'
const $ = axios.create({
    baseURL: 'http://localhost:7002/',
}) */


function getCategory(params) {
    return $.get(`/quest/category`, { params });
}

function getQuest(params) {
    return $.get(`/quest/`, { params });
}

function getQuests(params) {
    return $.get(`/quests`, { params });
}

export { getCategory, getQuest, getQuests };
