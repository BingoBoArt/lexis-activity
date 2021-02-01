<template>
    <div class="wrapper index-wrapper">
      <div class="pannel-top">
        <img src="~@/assets/images/v3/top-img.jpg" class="pannel-img">
        <img src="~@/assets/images/v3/book.png" class="book-img">
        <img src="~@/assets/images/v3/theme-pic.png" class="theme-img">
        <div class="pannel-text">
          <p>亲爱的家长们，</p>
          <p>一转眼我们已经成功地上完2期全能语感课了，感谢大家对于全能语感课的认可与支持! 英语天天见的老师们很开心地通过全能语感课看到了大家的成长与进步。</p>
          <video id='video' controls='controls' width='100%'  style="object-fit:fill" poster="http://file.lexislive.com.cn/resource/201903/87feb7e0-63e4-4304-9080-9ead3fcc7286.jpg" preload="auto" x-webkit-airplay="true" 
          webkit-playsinline="true" playsinline="true" 
          x5-video-player-fullscreen="false" >
            <source src="http://file.lexislive.com.cn/resource/201903/ce192e3a-bb59-4312-ad5e-4ebf9edf3117.mp4" type="video/mp4"> 
            您的浏览器环境不支持打开该视频
          </video>
          <p>在2期语感课上，大家可以提交作业并获得老师的实时点评。老师们欣喜地发现大家都不仅很优秀，而且还非常有创意呢! 以这道练习题为例，要用名词和介词组成一个句子，老师们从众多作业中挑出了几张格外优秀的：</p>
        </div>
      </div>

      <Pannel class="pannel-comment pannel-comment-oneline" comment="老师点评：同学你画了一只很有态度的母鸡！">
        <img class='pannel-comment-img' src="~@/assets/images/v3/draw1.jpg">
      </Pannel>

      <Pannel class="pannel-comment" comment="老师点评：老师看到这个构图、透视和上色，实在是太激动了！">
        <img class='pannel-comment-img' src="~@/assets/images/v3/draw2.jpg">
      </Pannel>

      <Pannel class="pannel-comment" comment="老师点评：春天来了，小鸡都开始运动了，你准备好了吗？">
        <img class='pannel-comment-img' src="~@/assets/images/v3/draw3.jpg">
      </Pannel>

      <Pannel class="pannel-comment" comment="老师点评：你确定这样把小熊放在床边是安全的吗？">
        <img class='pannel-comment-img' src="~@/assets/images/v3/draw4.jpg">
      </Pannel>

      <Pannel class="pannel-comment" comment="老师点评：这位小朋友是在模仿印象派的画风么？">
        <img class='pannel-comment-img' src="~@/assets/images/v3/draw5.jpg">
      </Pannel>

      <Pannel class="pannel-lesson" title="课程表">
        <img src="~@/assets/images/v3/lesson.jpg" class="pannel-img">
      </Pannel>
      <!--
      <Pannel class="pannel-video pannel-video-shouzuoye">
        <div class='pannel-content-video'>
          <video id='video' controls='controls' width='100%'  style="object-fit:fill" poster="http://file.lexislive.com.cn/resource/201812/5f4bfbf0-5cab-4c3b-b02f-37eead710a85.jpg" preload="auto" x-webkit-airplay="true" 
          webkit-playsinline="true" playsinline="true" 
          x5-video-player-fullscreen="false" >
            <source src="http://file.lexislive.com.cn/resource/201812/f483e351-c19d-45e4-9658-9de43ab1e3a5.mp4" type="video/mp4"> 
            您的浏览器环境不支持打开该视频
          </video>
         </div>
      </Pannel>
      -->
      <Pannel class="pannel-1" title="报名时间">
        <p class="pannel-text pannel-text-imp">
          即日起至2019年3月17日截止
        </p>
        <p class="pannel-text">
          为保证完整的上课体验，确保学生用书能够按时寄送到您手中，请务必于3月17日前完成课程订购。
        </p>
      </Pannel>
      <Pannel class="pannel-video pannel-yuganban" title="关于全能语感班">
        <div class='pannel-content-video'>
          <video id='video' controls='controls' width='100%'  style="object-fit:fill" poster="http://file.lexislive.com.cn/resource/201811/778e4870-4997-4624-8e17-900f990c27e4.jpg" preload="auto" x-webkit-airplay="true" 
          webkit-playsinline="true" playsinline="true" 
          x5-video-player-fullscreen="false" >
            <source src="http://file.lexislive.com.cn/resource/201811/7f881cb0-16ed-4da5-b962-bf40a6e28ab5.mp4" type="video/mp4"> 
            您的浏览器环境不支持打开该视频
          </video>  
         </div>
        <img src="~@/assets/images/tree.jpg" class="pannel-img">
        <p class="pannel-text">
          全能语感班是“英语天天见”推出的周末升级训练课程——每期课程配备精美的学生用书，线上线下无缝衔接，听说读写全面强化。课程由精心筛选的优质外教讲授，内容设计充实有趣，知识点安排科学系统，无论作为日常课程的升级学习，还是进行独立学习，效果都同样出色。
        </p>
      </Pannel>
      <Bottom :priceShow = 'true' @click="handleClick" @load="handleLoaded" :loading="button_loading" v-if="bottom_show"></Bottom>
      <!-- <BottomExpire /> -->
      <!-- <router-link :to="{path: '/orderConfirm', query: {'test': 1}}"></router-link> -->
    </div>
</template>
<script>
import Pannel from './pannel'
// import Bottom from '@/views/Common/Bottom/index.vue'
import Bottom from '@/views/Common/Bottom/expire.vue'
import UserInfo from '@base/components/userInfo/index.js'
import LemonUtils from 'lemon-utils';
import AppHandle from '@base/common/appHandle.js';

export default {
  name: 'index',
  components: {
    Pannel,
    Bottom
    // BottomExpire
  },
  data: () => {
    return {
      button_loading: false,
      loading_element: null,
      bottom_show: false,
      userInfo: null
    }
  },
  methods: {
    handleClick() {
      this.$router.push({
        path: "/orderConfirm"
      });
    },
    handleLoaded() {
      this.loading_element.close();
    }
  },
  created: async function() {
    /**
      1、app未登录，底部隐藏
      2、微信未登录，跳授权
      3、从banner来 若已购买，则按钮置灰度 todo
      4、其他渠道已购买，则跳往"已完成"页面 todo
    */
    
    /*
    let that = this;
    that.loading_element = that.$loading({
      mask: true
    });
    let userInfo = await UserInfo.getUserInfo(that);
    console.log("created", AppHandle.isApp, userInfo && userInfo.token);
    if(!(userInfo && userInfo.token) && AppHandle.isApp){
      // app未登录
      this.bottom_show = false;
      this.handleLoaded();
    }else{
      this.bottom_show = true;
    }
    console.log("userInfo", userInfo)
    */

    // 下线
    this.bottom_show = true;

  },
  mounted: function() {

  }
}
</script>
<style lang="less">
.index-wrapper{
  min-height: 100%;
  background: url(~@/assets/images/v3/bg.jpg) left top repeat-y;
  background-size: contain;
  padding-bottom: 200px;
  overflow: hidden;
  .pannel{
    margin: 40px auto 0;
    .pannel-text{
      color: #111111;
      font-size: 30px;
      line-height: 58px;
      text-indent: 60px;
      width: 604px;
      margin: 0 auto;
    }
    .pannel-text-imp{
      text-indent: 0px;
      color: #4d75ea;
    }
    .pannel-img{
      width: 477px;
      height: 477px;
      margin: 30px auto 10px;
    }
  }
  .pannel .pannel-img, .pannel .pannel-text, .pannel .pannel-video{
    margin: 0 auto;
    display: block;
  }

  .pannel-top{
    position: relative;
    height: 1630px;
    .pannel-img{
      width: 750px;
      height: 740px;
    }
    .theme-img{
      width: 451px;
      height: 258px;
      position: absolute;
      top: 350px;
      left: 280px;
      z-index: 2;
    }
    .book-img{
      width: 327px;
      height: 288px;
      position: absolute;
      top: 306px;
      left: 10px;
      z-index: 2;
    }
    .pannel-text{
      width: 680px;
      background-color: white;
      box-shadow: 2.5px 4.33px 9.7px 0.3px rgba(161, 150, 170, 0.5);
      color: #3b4a8c;
      font-size: 30px;
      line-height: 58px;
      padding: 30px 45px;
      box-sizing: border-box;
      z-index: 1;
      position: absolute;
      top: 566px;
      left: 50%;
      transform: translateX(-50%);
      p{
        text-indent: 60px;
      }
      p:first-child{
        text-indent: 0px;
      }
      video{
        width: 100%;
        margin: 20px auto;
      }
    }
  }

  .pannel-lesson{
    margin-top: 88px;
    .pannel-img{
      width: 619px;
      height: 679px;
    }
  }
  .pannel-video{
    .pannel-content-video{
      width: 669px;
      height: 380px;
      background: #4d75ea;
      text-align: center;
      margin: 20px auto;
      video{
        display: block;
        width: 100%;
        height: 100%;
        margin: 0px auto; 
      }
    }
  }
  .pannel-yuganban{
    .pannel-img{
      margin: 30px auto;
    }
  }
  .pannel-video-shouzuoye{
    .pannel-content{
      padding: 0;
    }
    .pannel-content-video{
      margin: 0;
    }
  }

  .pannel-comment{
    height: 657px;
    border: 2px solid #4d75ea;
    box-sizing: border-box;
    margin-bottom: 80px;
    .pannel-content{
      padding: 0;
      .pannel-comment-img{
        width: 100%;
        height: 100%;
      }
    }

    &.pannel-comment-oneline{
      margin-bottom: 60px;
    }
  }
}
</style>