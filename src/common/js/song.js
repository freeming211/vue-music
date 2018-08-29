export default class Song {
    constructor({ id, mid, singer, name, album, duration, image, url }) {
        this.id = id
        this.mid = mid
        this.singer = singer
        this.name = name
        this.album = album
        this.duration = duration
        this.image = image
        this.url = url
    }
}

export function createSong(musicData) {

    return new Song({
        id: musicData.albumid,
        mid: musicData.albummid,
        singer: filterSinger(musicData.singer),
        name: musicData.songname,
        album: musicData.albumname,
        duration: musicData.interval,
        image:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        // url:`http://ws.stream.qqmusic.qq.com/C100${musicData.songmid}.m4a?fromtag=0`
        //最终音乐地址 http://dl.stream.qqmusic.qq.com/{filename}?vkey={vkey}&fromtag=66
        //filename： 由songid拼接而成，C100{songmid}.m4a
        url:`http://dl.stream.qqmusic.qq.com/C100${musicData.songmid}.m4a?guid=222536285&fromtag=66`
    })
}

function filterSinger(singer) {
    let ret = []
    if (!singer) {
        return ''
    }

    singer.forEach((item, index) => {
        ret.push(item.name)
    })

    return ret.join('/')
}