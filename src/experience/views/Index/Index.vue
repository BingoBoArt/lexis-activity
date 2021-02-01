<template>
    <div class="main">
      <div class="video-wrapper" :class="{'video-state-pause': has_interact}" id="video-wrapper">
        <!--
        <video
            x5-video-player-type="h5" 
            x5-video-player-fullscreen="true" 
            x5-video-orientation="landscape"
            id="video"
            class="video" 
            preload="true" 
            controls="true"
            playsinline 
            src="http://file.lexislive.com.cn/resource/201812/856e1285-7087-48e1-91e5-8e5e5f895a61.mp4" 
            width="1" 
            height="1"
            x-webkit-airplay="allow"
            type="video/mp4">
        </video>
        -->
        <videoPlayer  class="vjs-custom-skin video-player-box"
            ref="videoPlayer"
            :options="playerOptions"
            :playsinline="true"
            customEventName="customstatechangedeventname"
            @timeupdate="onPlayerTimeupdate($event)"
            >
        </videoPlayer>
        <div class="course-wrapper" v-show="has_course" @click="showControls">
          <FlashCard class="course-item flashcard-item" v-if="cur_course_item.type == 'flashcard'" :course_data="cur_course_item" :turn_begin="turn_begin"></FlashCard>
          <Story class="course-item story-item" v-if="cur_course_item.type == 'story'" :course_data="cur_course_item"></Story>
          <Question_Layout_5 class="course-item question-item question-item-layout-5" v-if="cur_course_item.type == 'question'" :course_data="cur_course_item" :countdown_begin="countdown_begin" @countdown="onCountDown" @over="onOver"></Question_Layout_5>
          <Question_Layout_3_5 class="course-item question-item question-item-layout-3-5" v-if="cur_course_item.type == 'story_question'" :course_data="cur_course_item" :countdown_begin="countdown_begin" @countdown="onCountDown" @over="onOver"></Question_Layout_3_5>
          <Game class="course-item game-item" v-if="cur_course_item.type == 'game'" :course_data="cur_course_item" :countdown_begin="countdown_begin" @countdown="onCountDown" @over="onOver"></Game>
        </div>
        <!--
        <lemon-button v-if="btn_show" @click="play" class="play-btn" type="primary">
          <img src="~@/assets/images/common/play.png">
        </lemon-button>
        -->
      </div>
      <OrientLayer v-if="is_ios" />
      <CannotPlay v-if="cannot_play" />

      <audio class="sys-sound" id="right_mp3" src="http://file.lexislive.com.cn/resource/201812/498010b4-2363-4c9c-afa9-9708bbda6b4d.mp3"></audio>
      <audio class="sys-sound" id="error_mp3" src="http://file.lexislive.com.cn/resource/201812/fd57fe40-ee9d-4a02-ae4b-f69b86fcf738.mp3"></audio>
      <!-- <audio class="sys-sound" id="tap_mp3" src="http://file.lexislive.com.cn/resource/201812/7fccb50e-20d3-4b1c-bba2-fa4dca96f883.mp3"></audio> -->
    </div>
</template>
<script>
  import LemonUtils from 'lemon-utils';
  import makeVideoPlayableInline from 'iphone-inline-video'
  import Share from '@base/components/share/index.js'
  import UserInfo from '@base/components/userInfo/index.js'
  import Config from '@/common/config.js'
  import ComUtil from '@/common/util.js'
  import FlashCard from './Coms/FlashCard.vue'
  import Story from './Coms/Story.vue'
  import Question_Layout_5 from './Coms/Question_Layout_5.vue'
  import Question_Layout_3_5 from './Coms/Question_Layout_3_5.vue'
  import Game from './Coms/Game.vue'
  import OrientLayer from './Coms/OrientLayer.vue'
  import CannotPlay from './Coms/CannotPlay.vue'

  /** vue-video-player begin **/
  import { videoPlayer } from 'vue-video-player'
  import 'video.js/dist/video-js.css'
  import 'vue-video-player/src/custom-theme.css'
  /** vue-video-player end **/

  /**
   * 1、倒计时动画 done
   * 2、答题响应 done
   * 3、交互引导 done
   * 4、视频暂停，播放处理(暂停的话，则交互结束时间就是下一秒) done
   * 5、ResizeObserver loop limit exceeded (done)
   * 6、兼容pad比例 done
   * 7、快进 done
   * 8、语音答题提示 done
   * 9、播放按钮自定义，IOS全屏按钮去除  自定义组件(done)
   */

  /**
   * bug
   * 1、story图片圆角 done
   * 2、两道layout_3_5题目，答题会互相影响 done
   * 3、两道layout_3_5题目  第二道题倒计时先显示0 done
   * 4、播放音频，和视频冲突？ done
   */

  // 课件 http://123.56.221.25:8080/?950#/dashboard/Course/Edit?lessonNo=1992040412
  // 第一个视频 http://file.lexislive.com.cn/resource/201811/9ba5075b-b0f4-4e81-99e0-f92b6164df24.mp4
  // 第二个视频 http://file.lexislive.com.cn/resource/201812/856e1285-7087-48e1-91e5-8e5e5f895a61.mp4
  var video_ele = null
  var video_wrapper = null
  var timer = null
  var last_time = 0;
  const course_config = Config.course_config;

  export default {
    name: 'example',
    components: {
      FlashCard,
      Story,
      Game,
      Question_Layout_5,
      Question_Layout_3_5,
      OrientLayer,
      CannotPlay,
      videoPlayer
    },
    data: () => {
      return {
        has_question: false,
        has_course: false,
        has_interact: false,
        last_course_index: -1,
        btn_show: true,
        cur_course_item: {},
        countdown_begin: false, // 用于倒计时
        turn_begin: false, // 用于单词卡翻转
        is_ios: LemonUtils.UA.ios,
        cannot_play: (LemonUtils.UA.android && !LemonUtils.UA.weixin) || (LemonUtils.UA.ios && !LemonUtils.UA.weixin && navigator.userAgent.toLowerCase().indexOf("safari") < 0), // 安卓且非微信浏览器 苹果手机非微信浏览器、非safari浏览器 会顶层播放
        playerOptions: {
          // videojs options
          // language: 'en',
          sources: [{
            type: "video/mp4",
            src: "http://file.lexislive.com.cn/resource/201902/e5f169c4-1422-445b-8462-d2312cbcbe67.mp4"
          }],
          poster: "http://file.lexislive.com.cn/resource/201812/9a401a7f-769e-435c-8d24-26d0de94459f.png",
          controlBar: {
            fullscreenToggle: false
          }
        }
      }
    },
    player() {
      return this.$refs.videoPlayer.player
    },
    methods: {
      // 点击课件区域，显示controls
      showControls() {
        console.log("showControls")
        if(!this.has_interact){
          // 有交互，不显示控件
          let player = this.$refs.videoPlayer.player;
          // player.controlBar.enableTouchActivity();
          // player.controlBar.removeClass('vjs-fade-out'); 
          player.userActive(true);
          // doument.que(".vjs-has-started .vjs-control-bar")
          // player.controlBar.show()
        }
      },
      play() {
        // this.btn_show = false;
        // video_ele.play();
        let player = this.$refs.videoPlayer.player;
        player.play();
      },
      onCountDown() {
        // video_ele.controls = false;
        // video_ele.pause();
        let player = this.$refs.videoPlayer.player;
        player.pause();
        player.controlBar.hide()
      },
      onOver() {
        // video_ele.play();
        // video_ele.controls = true;
        this.has_interact = false;
        let player = this.$refs.videoPlayer.player;
        player.play();
        player.controlBar.show()
      },
      loadResources() {
        var regx = (/("|')img.*?\1\s*:\s*("|')(.*?)\2/mgi)
        var arr = null;
        var img_list = [];
        for(let i = 0, len = course_config.course.length; i < len; i++){
          let course_item = course_config.course[i];
          let item_str = JSON.stringify(course_item);
          while ((arr = regx.exec(item_str)) != null){
            try{
              var file_name = arr[3];
              img_list.push(file_name);
            }catch(e){
              
            }
          }
        }
        for(var k = 0, len_k = img_list.length; k < len_k; k++){
          let img = img_list[k];
          new Image().src = img
        }

        const com_imgs = [
          ''
        ]
      },
      onPlayerTimeupdate(event) {
        let that = this;
        let cur_time = parseInt(event.currentTime())
        let index = -1;
        let timeout = 10;
        let player = this.$refs.videoPlayer.player;
        for(let i = 0, len = course_config.course.length; i < len; i++){
          let course_item = course_config.course[i];
          let begin_time = course_item.begin
          let end_time = course_item.end
          timeout = end_time - begin_time
          if(course_item.interact && Math.abs(cur_time - last_time) > 1){
            // 需交互 + 快进或快退
            console.log("快进或快退")
            var buffer = 3;
            if(cur_time > begin_time - buffer && cur_time < end_time + buffer){
              // 在交互课件内
              console.log("快进或快进在question或game内")
              last_time = begin_time - buffer
              player.currentTime(begin_time - buffer);
              return;
            }
          }else if(cur_time >= begin_time && cur_time <= end_time){
            // 在课件内
            last_time = cur_time;
            index = i
            if(course_item.interact && cur_time >= course_item.countdown_time && cur_time <= end_time){
              // 开始倒计时
              that.countdown_begin = true;
            }else{
              that.countdown_begin = false;
            }
            if(course_item.type == 'flashcard' && cur_time >= course_item.turn_time && cur_time <= end_time){
              // 开始翻转
              that.turn_begin = true;
            }else{
              that.turn_begin = false;
            }
            break;
          }else{
            // last_time = cur_time
          }
        }

        // console.log("index", index)
        if(index > -1){
          // 有课件
          let cur_course_item = course_config.course[index];
          if(that.last_course_index == index && (that.has_interact || that.has_course)){
            return;
          }else{
            that.last_course_index = index;
            console.log("显示课件")
            that.has_course = true;
            that.cur_course_item = cur_course_item;

            if(cur_course_item.interact){
              // 带交互课件
              console.log("显示课件--带交互")
              that.has_interact = true;
              clearTimeout(timer);
              timer = setTimeout(() => {
                // video_ele.controls = true;
                // video_ele.play();
                // setTimeout(() => {
                //   that.has_interact = false;
                // }, 3000);
              }, 12 * 1000)
            }
          }
        }else{
          // console.log("无课件")
          last_time = cur_time
          that.has_course = false;
        }
      },
      initVideo() {
        let that = this;
        video_ele = document.querySelector("#video-wrapper video");
        video_wrapper = document.querySelector("#video-wrapper");
        /**
         * 判断微信里 TBS 的版本
         */
        var ua = window.navigator.userAgent
        var TBS = ua.match(/TBS\/([\d.]+)/)
        var TBS_V0 = '036849' // TBS >=036849 支持 x5-video-player-type
        var TBS_V1 = '036900' // TBS >=036900 正确支持 x5videoenterfullscreen，036849 <= TBS < 036900 支持的 x5videoxxxx 事件是反的

        var QQB = ua.match(/MQQBrowser\/([\d.]+)/)
        var QQB_V0 = '7.1' // MQQBrowser >=7.1 支持 x5-video-player-type
        var QQB_V1 = '7.2' // MQQBrowser >=7.2 正确支持 x5videoenterfullscreen，7.1 <= TBS < 7.2 支持的 x5videoxxxx 事件是反的

        var tbs = {}
        if (TBS) {
          tbs.isTBS = true
          tbs.isRightEvent = TBS[1] >= TBS_V1
          if (TBS[1] >= TBS_V0) {
            useH5Play()
          }
        } else if (QQB) {
          tbs.isTBS = true
          tbs.isRightEvent = QQB[1] >= QQB_V1
          if (QQB[1] >= QQB_V0) {
            useH5Play()
          }
        }

        if (TBS) {
          console.log('TBS: ' + TBS[0] + ' | ' + TBS[1] + '<br>')
        } else {
          console.log('TBS: ' + TBS + '<br>')
        }
        if (QQB) {
          console.log('MQQBrowser: ' + QQB[0] + ' | ' + QQB[1] + '<br>')
        } else {
          console.log('MQQBrowser: ' + QQB + '<br>')
        }

        function useH5Play () {
          video_ele.setAttribute('x5-video-player-type', 'h5')
          video_ele.setAttribute('x5-video-player-fullscreen', 'true')
          video_ele.setAttribute('x5-video-orientation', 'landscape')
        }

        // 处理 iOS 的兼容性
        if (LemonUtils.UA.ios) {
          makeVideoPlayableInline(video_ele)
        }

        // 处理 tbs/QQBrowser 的兼容性
        if (tbs.isTBS) {
          video_ele.addEventListener("x5videoenterfullscreen", function () {
            console.log("x5video enter fullscreen<br>");
          })

          video_ele.addEventListener("x5videoexitfullscreen", function () {
            console.log("x5video exit fullscreen<br>");
          })
        }

        useH5Play();
      },
      initSize() {
        var that = this;
        video_ele = document.querySelector("#video-wrapper video");
        video_wrapper = document.querySelector("#video-wrapper");
        function handleResize () {
          var sWidth = 1920
          var sHeight = 1080
          var width = window.innerWidth
          var height = window.innerHeight
          var v_width = 0;
          var v_height = 0;
          if(width / height > sWidth / sHeight){
            // 宽度略大
            v_width = (height * sWidth) / sHeight;
            v_height = height;

            var marginLeft = width - v_width
            marginLeft = Math.round(marginLeft)
            video_wrapper.style.width = v_width + "px"
            video_wrapper.style.height = v_height + "px"
            that.playerOptions.width = v_width;
            that.playerOptions.height = v_height;
            if (marginLeft > 2) {
              video_wrapper.style.marginLeft = marginLeft / 2 + 'px'
            } else {
              video_wrapper.style.marginLeft = 0
            }
            video_wrapper.style.marginTop = 0
          }else{
            // 高度略大
            v_height = (width * sHeight) / sWidth;
            v_width = width;

            var marginTop = height - v_height
            marginTop = Math.round(marginTop)
            video_wrapper.style.width = v_width + "px"
            video_wrapper.style.height = v_height + "px"
            that.playerOptions.width = v_width;
            that.playerOptions.height = v_height;
            if (marginTop > 2) {
              video_wrapper.style.marginTop = marginTop / 2 + 'px'
            } else {
              video_wrapper.style.marginTop = 0
            }
            video_wrapper.style.marginLeft = 0
          }
        }

        let throttle_resize = ComUtil.throttle(handleResize, 300);
        // handleResize()
        window.addEventListener('resize', function () {
          throttle_resize()
        })
        // 不用handleResize，因为需要延时获取变换后的宽度
        throttle_resize()
      },
      initEvent() {
        var that = this;
        var last_time = 0;
        video_ele.addEventListener('timeupdate', function (e) {
          let cur_time = parseInt(video_ele.currentTime)
          let index = -1;
          let timeout = 10;
          for(let i = 0, len = course_config.course.length; i < len; i++){
            let course_item = course_config.course[i];
            let begin_time = course_item.begin
            let end_time = course_item.end
            timeout = end_time - begin_time
            if(course_item.interact && Math.abs(cur_time - last_time) > 1){
              // 需交互 + 快进或快退
              console.log("快进或快进")
              var buffer = 3;
              if(cur_time > begin_time - buffer && cur_time < end_time + buffer){
                // 在交互课件内
                console.log("快进或快进在question或game内")
                last_time = begin_time - buffer
                video_ele.currentTime = begin_time - buffer
                return;
              }
            }else if(cur_time >= begin_time && cur_time <= end_time){
              // 在课件内
              last_time = cur_time;
              index = i
              if(course_item.interact && cur_time >= course_item.countdown_time && cur_time <= end_time){
                // 开始倒计时
                that.countdown_begin = true;
              }else{
                that.countdown_begin = false;
              }
              if(course_item.type == 'flashcard' && cur_time >= course_item.turn_time && cur_time <= end_time){
                // 开始翻转
                that.turn_begin = true;
              }else{
                that.turn_begin = false;
              }
              break;
            }else{
              // last_time = cur_time
            }
          }

          // console.log("index", index, that.countdown_begin)
          if(index > -1){
            // 有课件
            let cur_course_item = course_config.course[index];
            if(that.has_interact || that.has_course){
              return;
            }else{
              console.log("显示课件")
              that.has_course = true;
              that.cur_course_item = cur_course_item;

              if(cur_course_item.interact){
                // 带交互课件
                console.log("显示课件--带交互")
                that.has_interact = true;
                clearTimeout(timer);
                timer = setTimeout(() => {
                  // video_ele.controls = true;
                  // video_ele.play();
                  // setTimeout(() => {
                  //   that.has_interact = false;
                  // }, 3000);
                }, 12 * 1000)
              }
            }
          }else{
            console.log("无课件")
            last_time = cur_time
            that.has_course = false;
          }
        })

        video_ele.addEventListener('ended', function (e) {
        })
      }
    },
    created: function () {
    },
    mounted: function () {
      this.loadResources();
      this.initVideo();
      this.initSize();
      // this.initEvent();
      // this.cur_course_item = course_config.course[2];
      // this.has_course = true;
    }
  }
</script>
<style type="less">
@import "~@/assets/css/common/variable.less";
@bg: #000;
@width: 1920;
@height: 1080;

video::-webkit-media-controls-fullscreen-button {
  display: none;
}
video::-webkit-media-controls-play-button {
  display: none;
}
.sys-sound{
  display: none;
}

.main {
  background-color: @bg;
  // overflow: hidden !important;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  /* display: table; */
}
.main .video-wrapper{
  /* transform: rotate(90deg); */
}
.main .video-wrapper .video {
  width: 100%;
  height: 100%;
}
.main .video-wrapper{
  position: relative;
}
.main .course-wrapper{
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  font-size: 30px;
  color: white;
  text-align: center;

  .course-item{
    position: absolute;
    .size_height(890); /* 890/1080 */
    .size_w(30);
    left: @size_w; /* 30/1920 */
    .size_h(30);
    top: @size_h; /* 30/1080 */
  }
  .flashcard-item{
    .size_width(708);
    .size_height(861);
  }
  .story-item{
    .size_width(733);
  }
  .question-item{
    .size_width(1038);
  }
  .game-item{
    .size_width(1860);
  }
  .question-item-layout-3-5{
    width: 100%;
    .course-layout-3{
      .size_width(733);
    }
    .course-layout-5{
      .size_width(1038);
      .size_w(820);
      left: @size_w;
    }
  }
}

.play-btn{
    position: absolute;
    left: 50%;
    top: 50%;
    width: 13%;
    height: 23%;
    background: rgba(0, 0, 0, 0.59);
    padding: 10px;
    box-sizing: border-box;
    transform: translate3d(-50%,-50%,0);
    img{
      width: 100%;
      height: 100%;
    }
}

/**解决小米mix2s 右侧隐藏问题，发现在x5-video-orientation=landscape 时，会增加行内overflow:hidden**/
*{
  overflow: visible !important;
}

.video-player-box, .video-js {
    position: relative !important;
    width: 100% !important;
    height: 100% !important;
}
/*
.video-js .vjs-big-play-button{
  position: absolute;
  width: 3em !important;
  height: 1.5em !important;
  left: 50% !important;
  top: 50% !important;
  background: rgba(0, 0, 0, 0.59);
  box-sizing: border-box;
  transform: translate3d(-50%,-50%,0);
}
*/
.video-js .vjs-tech{
  // object-fit: cover !important;
}
.video-js .vjs-volume-panel{
  display: none !important;
}
.video-js .vjs-remaining-time{
  display: none !important;
}
.video-js .vjs-control-bar{
  z-index: 999999999 !important;
  transform: translateZ(0);
}
.vjs-paused.vjs-has-started .vjs-big-play-button{
  display: none !important;
}
</style>
