import { $node, $helper } from "@jx3box/jx3box-common/js/https";
const $ = $node()

/* import axios from 'axios'
const $ = axios.create({
    baseURL: 'http://localhost:7002/',
}) */


export function getCategory(params) {
    return $.get(`/quest/category`, { params });
}

export function getQuest(params) {
    return $.get(`/quest/`, { params });
}

export function getQuests(params) {
    return $.get(`/quests`, { params });
}

export function getNewestQuests(params) {
    return $.get(`/quests/newest`, { params });
}

export function getNewestPost(client = 'std') {
    const params = {
        type: 'quest',
        client
    };
    return $helper().get(`/api/wiki/posts/newest`, { params });
}

export function getWaiting(page, client) {
    const params = {
        page,
        client
    };
    return $helper().get(`/api/quest/waiting`, { params });
}

export function getWaitingRate(client) {
    const params = {
        client
    };
    return $helper().get(`/api/quest/waiting/rate`, { params });
}