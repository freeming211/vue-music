import jsonp from 'common/js/jsonp'
import { commonParams, options } from 'api/config'

export function getSingerList() {
    const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

    const data = Object.assign({}, commonParams, {
        channel: 'singer',
        page: 'list',
        key: 'all_all_all',
        pagenum: 1,
        pagesize: 100,
        hostUin: 0,
        platform: 'yqq',
        uin: 0,
        needNewCode: 1,
        notice: 0,
        loginUin: '228194941',
        g_tk: 5381,
    })
    return jsonp(url, data, options)
}

export function getSingerDetail(singerId) {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

    const data = Object.assign({}, commonParams, {
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq',
        order:'listen',
        begin: 0,
        num: 100,
        songstatus: 1,
        singermid: singerId,
        g_tk: 1664029744
    })
    return jsonp(url, data, options)
}