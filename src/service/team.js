import { $cms } from "@jx3box/jx3box-common/js/https";

/**
 * @description 获取我的团队活动
 * @param {{ start_time: String, end_time: String }} params
 * @returns Promise
 */
function getMyTeamRaid(params) {
    return $cms().get("/api/cms/team/raids/my-join", {
        params,
    });
}

export { getMyTeamRaid };
