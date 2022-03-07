import { $cms } from '@jx3box/jx3box-common/js/https'
import Axios from 'axios'

const $ = Axios.create({
    baseURL: 'http://localhost:5120/api/cms'
})

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

    return $.get('/post/calendar/archive' + url)
}

const addCalendar = (params, data) => {
    const url = genUrl(params);

    return $.post(url, data)
}

export {
    getCalendar,
    addCalendar
}