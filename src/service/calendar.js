import { $cms } from '@jx3box/jx3box-common/js/https'

const $ = $cms()

const genUrl = (params) => {
    const { year, month, date } = params;

    let url = '';

    year && (url += `/${year}`)
    month && (url += `/${month}`)
    date && (url += `/${date}`)

    return url
}

const getCalendar = (params) => {

    let url = genUrl(params);

    return $.get('/api/cms/calendar/archive' + url)
}

const addCalendar = (data) => {
    const url = genUrl(data);
    return $.post('/api/cms/calendar/archive' + url, data)
}

const putCalendar = (id, data) => {
    return $.put(`/api/cms/calendar/${id}`, data)
}

const delCalendar = (id) => {
    return $.delete(`/api/cms/calendar/${id}`)
}

const getDetail = (id) => {
    return $.get(`/api/cms/calendar/${id}`)
}

const getHistory = (params, query) => {
    let url = genUrl(params)
    return $.get(`/api/cms/calendar/history/${url}`, {
        params: query
    })
}

export {
    getCalendar,
    addCalendar,
    putCalendar,
    delCalendar,
    getDetail,
    getHistory,
}