<template>
  <div class="music-list">
    <div class="back"  @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class = "play-wrapper">
        <div class="play" v-if ="songs.length>0" ref = "playButton">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer">

    </div>
    <scroll @scroll="scroll" :probe-type="probeType" :listen-scroll="listenScroll" :data = "songs" class="list" ref="list">
        <div class="song-list-wrapper">
            <song-list :songs ="songs" @select="selectItem">

            </song-list>
        </div>
        <div class="loading-container" v-if = "!songs.length">
          <loading></loading>
        </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import SongList from 'base/song-list/song-list'
  import Loading from 'base/loading/loading'
  import {prefixStyle} from 'common/js/dom'
  import {mapActions} from 'vuex'


  const transform = prefixStyle('transform')
  const backdrop = prefixStyle('backdrop-filter')
  const RESERVED_HEIGHT = 40

  export default {
    props:{
        bgImage:{
            type:String,
            default:''
        },
        songs:{
            type:Array,
            default:[]
        },
        title:{
            type:String,
            default:''
        },
        rank: {
            type: Boolean,
            default: false
        }
    },
    data() {
      return {
          scrollY:0
      }
    },
    computed: {
      bgStyle(){
        return `background-image:url(${this.bgImage})`
      }
    },
    created() {
        this.probeType = 3
        this.listenScroll = true
    },
    mounted() {
        // 背景图片高度
        this.imageHeight = this.$refs.bgImage.clientHeight
        // 图片高度(负)+导航条高度
        this.minTranslateY = -this.imageHeight+RESERVED_HEIGHT
        // 元素设置 top 值  .$el 注意
        this.$refs.list.$el.style.top = `${this.$refs.bgImage.clientHeight}px`
    },
    methods: {
     scroll(pos){
        this.scrollY = pos.y
        console.log(pos.y)
     },
     back(){
       this.$router.back()
     },
     selectItem(item,index){
       this.selectPlay({
         list:this.songs,
         index
       })
     },
     ...mapActions([
       'selectPlay'
     ])
    },
    watch: {
        scrollY(newValue,oldValue){
            let zIndex = 0
            let scale = 1
            let blur = 0
            // 比较2个数字大小,返回大的 Math.max
            let translateY =  Math.max(this.minTranslateY,newValue)
            this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`
            // 取绝对值  Math.abs
            const percent = Math.abs(newValue/this.imageHeight)
            if(newValue > 0){
                scale = 1+percent
                zIndex = 10
            }else{
            // 0到20取值,最大不会超过20
                blur = Math.min(20*percent,20)
            }
            // 设置高斯模糊 只能在ios中生效
            this.$refs.filter.style[backdrop] = `blur(${blur}px)`
            // 向下拉效果 歌单上拉到头部时候
            if(newValue<this.minTranslateY){
                zIndex = 10
                this.$refs.bgImage.style.paddingTop = 0
                // RESERVED_HEIGHT 导航条高度
                this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
                // 按按钮
                this.$refs.playButton.style.display = 'none'
            }else{
                this.$refs.bgImage.style.height = 0
                this.$refs.bgImage.style.paddingTop = '70%'
                this.$refs.playButton.style.display = ''
            }
            this.$refs.bgImage.style.zIndex = zIndex
            this.$refs.bgImage.style[transform] = `scale(${scale})`
        }
    },
    components: {
      Scroll,
      Loading,
      SongList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: center
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>