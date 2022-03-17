import { $cms } from "@jx3box/jx3box-common/js/https";

function genUrl(params) {
    const { year, month, date } = params;

    let url = "";

    year && (url += `/${year}`);
    month && (url += `/${month}`);
    date && (url += `/${date}`);

    return url;
}

function getCalendar(params) {
    let url = genUrl(params);

    return $cms().get("/api/cms/calendar/archive" + url);
}

function addCalendar(data) {
    const url = genUrl(data);
    return $cms().post('/api/cms/calendar/archive' + url, data)
}

function putCalendar(id, data) {
    return $cms().put(`/api/cms/calendar/${id}`, data);
}

function manageCalendar(id,data){
    return $cms().put(`/api/cms/calendar/${id}/manage`, data);
}

function delCalendar(id) {
    return $cms().delete(`/api/cms/calendar/${id}`);
}

function getDetail(id) {
    return $cms().get(`/api/cms/calendar/${id}`);
}

function getHistory(params, query) {
    let url = genUrl(params);
    return $cms().get(`/api/cms/calendar/history/${url}`, {
        params: query,
    });
}

export { getCalendar, addCalendar, putCalendar, delCalendar, getDetail, getHistory ,manageCalendar};
