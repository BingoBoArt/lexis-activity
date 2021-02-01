<template>
  <div class="myClass-wrapper">
    <div class="head">
      <a @click="goBack" href="javascript:void(0)" class="back-btn"></a>
      <span>我的课程</span>
    </div>
    <div class="title">
      <ul class="flex">
        <li class='items flex-1' v-for='(item, index) in title' v-bind:key='index' v-bind:class="item==selected?'active':'inactive'" @click="click(item)">{{item}}</li>
      </ul>
    </div>
    <div class="content">
      <div class="infoWrapper" v-if='currentCourse.length'>
        <div class="contentItem" v-for='(item,index) in currentCourse ' v-bind:key='index'>
          <p><span>课程类型：</span>{{item.chapterType}}</p>
          <p><span>课程名称：</span>{{item.courseName}}</p>
          <p><span>课程日期：</span>{{item.startTime}}</p>
          <p><span>课程状态：</span>{{item.status}}</p>
        </div>
      </div>
      <p v-if='!(currentCourse.length)' class="tip">暂无课程信息</p>
    </div>
  </div>
</template>
<script>
import Request from "@/common/request.js";
import weui from 'weui.js';
export default {
  data: () => {
    return {
      title: ["正式课", "试听课", "其他课程"],
      selected: "正式课",
      currentCourse: "",
      courseInfo: "",
      normalCourse: "",
      testCourse: "",
      otherCourse: ""
    };
  },
  methods: {
    goBack() {
      window.history.back();
    },
    click(item) {
      this.selected = item;
      let courseInfo = this.courseInfo;
      if (item == "试听课") {
        this.testCourse = courseInfo.filter(item => {
          return item.chapterType == "试听课";
        });
        this.currentCourse = this.testCourse;
      } else if (item == "正式课") {
        this.currentCourse = this.normalCourse;
      } else if (item == "其他课程") {
        this.currentCourse = this.otherCourse;
        
      }
    }
  },
  created: function() {
    let that = this;
    that.$loading.show();
    Request({
      url: "/getuserinfo",
      // mock: require("@/mock/personalCenter"),
      data: {},
      type: "POST"
    })
      .then(res => {
        if (res.code == "0000") {
          // that.classInfo = [that.classInfo, res.data.roomInfo]
          // that.userInfo = res.data.userInfo;
          if(!res.data.roomInfo){
            // weui.alert(res.msg);
          }
          else {
          that.courseInfo = res.data.roomInfo;
          let courseInfo = that.courseInfo;
          that.normalCourse = courseInfo.filter(item => {
            return item.chapterType == "正式课";
          });
          that.currentCourse = that.normalCourse;
        }}
      })
      .always(function() {
        that.$loading.hide();
      });
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/common/variable.less";
.myClass-wrapper {
  text-align: center;
  .head {
    height: 80px;
    line-height: 80px;
    font-size: 35px;
    position: relative;
    border-bottom: 1px solid #efefef;
  }
  .back-btn {
    position: absolute;
    left: 0;
    top: 0;
    background: url("../../../assets/images/arrow.png") center center no-repeat;
    vertical-align: middle;
    width: 100px;
    height: 100%;
    background-size: 40%;
  }
  .items {
    text-align: center;
    display: inline-block;
    width: 120px;
    height: 70px;
    line-height: 70px;
    font-size: 28px;
    &:active{
        background: #f7f7f7;
    }
  }
  .contentItem {
    padding: 30px;
    border-bottom: 1px solid #e8e8e8;
    color: #444;
    p {
      text-align: left;
      padding: 5px 0 5px 0;
      font-size: 30px;
      span {
        margin-right: 30px;
      }
    }
  }
  .active {
    border-bottom: 2px solid #0b80ca;
    color: #0b80ca;
  }
  ul {
    overflow: hidden; // border-bottom: 3px solid #33cdec;
    border-bottom: 1px solid #efefef;
    color: #444;
  }
  .tip {
    margin-top: 300px;
    font-size: 26px;
    color: #8c8c8c;
  }
}
</style>
