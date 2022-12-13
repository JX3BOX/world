import { $node } from "@jx3box/jx3box-common/js/https";
const $ = $node()

export function getMenus (params) {
  return $.get(`/reputation/menus`, { params });
}

export function getNews (params) {
  return $.get(`/reputation/newest`, { params });
}