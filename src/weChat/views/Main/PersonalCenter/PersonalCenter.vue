<template>
  <div class="wrapper personalCenter-wrapper">
    <div class="top">
      <div class="personalInfo">
        <img class="avatar" :src="userInfo.imgUrl">
        <div class="info">
          <p class="name">
            <span class="interval">英文名：</span>{{(userInfo.nickname || '--')}}</p>
          <p class="age">
            <span class="interval">年龄：</span>{{userInfo.age}}</p>
        </div>
      </div>
      <div class="classInfo">
        <div class="info-item formalClass">
          <span class="interval">正式课：</span> 
          <span>&nbsp;{{userInfo.used_1v4 || 0}}/{{userInfo.surplus_1v4 || 0}}&nbsp;节<br/><span class="tip">(已上/剩余)</span></span>
        </div>
        <div class="info-item tryClass">
          <span class="interval">试听课：</span>
          <span>{{userInfo.consumedAudition || 0}}&nbsp;节<br/><span class="tip">(已上)</span></span>
          <div></div>
        </div>
      </div>
    </div>
    <div class="scheduleWrapper">
      <router-link to="/MyOrder">
        <div class="select">
          <div class="sl-inner">
            <span class='icon icon-order'></span>我的订单
            <span class="arrow" />
          </div>
        </div>
      </router-link>
      <router-link to="/MyClass">
        <div class="select">
          <div class="sl-inner">
            <span class='icon icon-class'></span>我的课程
            <span class="arrow" />
          </div>
        </div>
      </router-link>
    </div>
    <div class="bottomLogo"></div>
    <div style="width:100%;height:20px;"></div>
  </div>
</template>

<script>
import Request from "@/common/request";
import { isNeedBind } from "@/common/util";
// import weui from "weui.js";
let classInfoItem = {
  props: ["classInfo"],
  template:
    "<tr><td class='td1'>{{classInfo.chapterType}}</td><td class='td2'>{{classInfo.courseName}}</td><td class='td3'>{{classInfo.startTime}}</td><td class='td4'>{{classInfo.status}}</td></tr>"
};
export default {
  name: "PersonalCenter",
  components: {
    classItemInfo: classInfoItem
  },
  data: () => {
    return {
      classInfo: [
        {
          chapterType: "课程类型",
          courseName: "课程名称",
          startTime: "上课时间",
          status: "状态"
        }
      ],
      name: "xxx",
      age: "xx",
      formalClass: "0",
      tryClass: "0",
      userInfo: {},
      roomInfo: [],
      avatarUrl: "",
      isShow: true,
      balanceLectures: ""
    };
  },
  methods: {
    toggle() {}
  },
  created: function() {
    let that = this;
    that.$loading.show();
    this.isShow = true;
    isNeedBind(this, function() {
      that.$loading.show();
      new Request({
        url: "/getuserinfo",
        // mock: require("@/mock/personalCenter"),
        data: {},
        type: "POST"
      })
        .then(res => {
          if (res.code == "0000") {
            // that.classInfo = [that.classInfo, res.data.roomInfo]
            that.userInfo = res.data.userInfo;
            that.roomInfo = res.data.roomInfo;
            console.log(res.data.userInfo);
            /*
          console.log(res.data);
          for (let a in res.data.roomInfo) {
            that.classInfo.push(res.data.roomInfo[a]);
          }
          that.name = res.data.userInfo.name;
          that.age = res.data.userInfo.age;
          that.formalClass = res.data.consumedLectures;
          that.tryClass = res.data.consumedAudition;
          console.log(that.classInfo);
          this.$loading.hide();
        } else if(res.code == "1808") {
          weui.alert("还没有课程信息");
        }
        */
          }
        })
        .always(function() {
          that.$loading.hide();
        });
    });
  },
  mounted: function() {}
};
</script>
<style lang='less' scoped>
@import "../../../assets/css/common/variable.less";
.course-outer {
  padding: 30px;
  width: 100%;
  box-sizing: border-box;
  .course-wrapper {
    width: 100%;
    color: #666;
    font-size: 30px;
    line-height: 48px;
    border-bottom: 1px solid #ccc;
    padding: 30px 0;

    .course-info {
      label {
      }
      span {
        margin-left: 10px;
      }
    }
  }
  .no-data {
    text-align: center;
    margin: 30px auto;
    font-size: 28px;
    color: #666;
  }
}

.personalCenter-wrapper {
  .interval {
    margin-left: 10px;
  }
  .top {
    overflow: hidden;
    background: @bgColor;
    color: white;
    padding-bottom: 70px;
  }
  .scheduleWrapper {
    // margin-bottom: 75px;
    min-height: 480px;
    .select {
      color: #4a4a4a;
      text-align: left;
      font-size: 35px;
      height: 90px;
      line-height: 90px;
      width: 100%;
      padding: 0 30px;
      box-sizing: border-box;
      border-bottom: 1px solid #f1f1f1;
      &:active{
        background: #f7f7f7;
      }
      .sl-inner {
        height: 100%;
        .icon{
          display: inline-block;
          vertical-align: middle;
          margin-right: 20px;
          width: 50px;
          height: 100%;
        }
        .icon-order {
          background: url("../../../assets/images/order.png") center center no-repeat;
          background-size: contain;
        }
        .icon-class {
          background: url("../../../assets/images/class.png") center center no-repeat;
          background-size: contain;
        }
      }
      .arrow {
        float: right;
        display: inline-block;
        height: 100%;
        width: 75px;
        background: url("../../../assets/images/arrow-right.png") center center no-repeat;
        background-size: contain;
        opacity: 0.5;
      }
    }
  }
  .bottomLogo {
    margin-top: 200px;
    width: 210px;
    height: 72px;
    background: url("../../../assets/images/logoTitle.png");
    background-size: cover;
    margin: 0 auto 50px;
  }
  .personalInfo {
    display: flex;
    align-items: center;
    margin-top: 80px;
    padding-left: 80px;
  }
  .avatar {
    display: inline-block;
    width: 200px;
    height: 200px;
    border-radius: 200px;
    border: 3px solid #5e87f1;
  }
  .info {
    display: inline-block;
    margin-left: 60px;
    p {
      font-size: 34px;
      text-align: left;
    } // div {
    //     display: inline-block;
    // }
  }
  .classInfo {
    margin-top: 30px;
    display: flex;
    padding: 0 30px;
    justify-content: space-between;
    font-size: 30px;
    div {
      display: inline-block;
    }
    .info-item {
      display: flex;
      height: 40px;
      line-height: 40px;
    }
    span {
      margin-left: 4px;
      margin-right: 4px;
    }
  }
  .scheduleTitle {
    text-align: center;
    font-size: 40px;
    margin-top: 50px;
    color: #333;
  }
  .timetable {
    background: white;
    margin: 70px 10px 0 10px;
    font-size: 30px;
    border: 3px solid @color;
    border-radius: 38px;
    div {
      border-top: 3px solid @color;
    }
    div:first-child {
      border: none;
      tr {
        td {
          font-size: 30px;
        }
      }
    }
    tr {
      vertical-align: middle;
    }
    td {
      height: 80px;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 20px;
    }
    div {
      padding-left: 60px;
    }
    .td1 {
      width: 120px; // border-right: 3px solid #33acdc;
    }
    .td2 {
      width: 160px;
      padding-left: 15px; // border-right: 3px solid #33acdc;
      font-size: 30px;
    }
    .td3 {
      width: 160px; // border-right: 3px solid #33acdc;
    }
    .td4 {
      width: 160px;
    }
  }
  .tip {
    font-size: 20px;
  }
}
</style>
