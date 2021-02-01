<style>

</style>
<template>
  <div class="wrapper information-wrapper">
    <div class="content">
      <div class="logo"></div>
      <div class="text">还差一步，完成注册 !</div>
    </div>
    <form id="form">
      <div class="inputWrapper">
        <span>姓氏</span>
        <input class="weui-input in1" v-model="chineseNameX" id="chineseNameX" type="text" maxlength="11" placeholder="请输入孩子的姓氏"
          emptyTips="请输入孩子姓氏">
      </div>
      <div class="inputWrapper">
        <span>名字</span>
        <input class="weui-input in1" v-model="chineseNameM" id="chineseNameM" type="text" maxlength="11" placeholder="请输入孩子的名字"
          emptyTips="请输入孩子名字">
      </div>
      <div class="inputWrapper">
        <span>英文名</span>
        <input class="weui-input in1" v-model="englishName" id="englishName" placeholder="请输入孩子的英文名" emptyTips="请输入孩子英文名">
      </div>
      <div class="inputWrapper" @click="setSex">
        <span class="mod">性别</span>
        <div class="weui-input in1 option" id="sex" v-bind:value="defaultValue">{{defaultValue.word}}</div>
        <span class="arr-down"></span>
      </div>
      <div class="inputWrapper">
        <span class="mod">出生年月</span>
        <div class="weui-input in1 option" v-bind:value="defaultBirth" id="date-show">{{defaultBirth}}</div>
        <span class="arr-down"></span>
      </div>
      <div class="inputWrapper" @click="setEnglish">
        <span class="mod">英语基础</span>
        <div class="weui-input in1 option" v-bind:value="defaultEnglish">{{defaultEnglish}}</div>
        <span class="arr-down"></span>
      </div>
      <a class="weui-btn weui-btn_primary btn1" href="javascript:" @click="register" id="showTooltips">完成注册</a>
    </form>
  </div>
</template>

<script>
  import Request from "@/common/request";
  import DatePicker from "@/components/datepicker/index.js";
  // import 'weui';
  import weui from "weui.js";
  // import Urls from "@/common/urls.js";
  // import ComUtil from "@/common/util.js"
  export default {
    name: "Register",
    components: {},
    data: () => {
      return {
        chineseNameX: "",
        chineseNameM: "",
        englishName: "",
        defaultValue: {
          word: "男 孩",
          value: "1"
        },
        defaultBirth: "请选择生日",
        defaultEnglish: "请选择英语基础"
      };
    },
    methods: {
      register() {
        let that = this;
        if (
          that.chineseNameX !== "" &&
          that.englishName !== "" &&
          that.chineseNameM !== ""
        ) {
          weui.form.validate("#form", function (error) {
            if (!error) {
              //按钮置灰
              var loading = weui.loading("跳转中...");
              setTimeout(function () {}, 1500);
              Request({
                url: "/auth/registerdetail",
                data: {
                  surname: that.chineseNameX,
                  name: that.chineseNameM,
                  nickname: that.englishName,
                  birthday: that.defaultBirth,
                  foundation: that.defaultEnglish,
                  gender: that.defaultValue.value
                },
                type: "POST"
              }).then(res => {
                if (res.code == "0000") {
                  loading.hide();
                  weui.toast("注册成功", 1000);
                  // let preUrl = window.L.cookie.get("preUrl");
                  let preUrl = window.L.util.getLocalStorage("preUrl") || "";
                  if (preUrl) {
                    that.$router.replace({
                      path: preUrl
                    });
                  }
                } else if (res.code == "1801") {
                  loading.hide();
                  weui.toast("该帐号已绑定微信", 1000);
                } else if (res.code == "1111") {
                  loading.hide();
                  weui.toast(res.msg || "该手机号已存在", 1000);
                }
              });
            }
            // return true; // 当return true时，不会显示错误
          });
        } else {
          if ((that.chineseNameX || that.chineseNameM) == "") {
            weui.alert("请输入孩子中文名！");
          } else {
            weui.alert("请输入孩子英文名！");
          }
        }
      },
      setSex() {
        let that = this;
        weui.actionSheet([{
            label: "男 孩",
            onClick: function () {
              that.defaultValue = {
                word: "男 孩",
                value: "1"
              };
            }
          },
          {
            label: "女 孩",
            onClick: function () {
              that.defaultValue = {
                word: "女 孩",
                value: "0"
              };
            }
          }
        ]);
      },
      setBirth() {
        let that = this;
        weui.datePicker({
          start: 1998,
          end: 2018,
          defaultValue: [1999, 6, 9],
          onChange: function (result) {
            console.log(result.toString());
          },
          onConfirm: function (result) {
            let a = result.toString().split(",");
            that.defaultBirth = `${a[0]}-${a[1]}-${a[2]}`;
          },
          id: "datePicker"
        });
      },
      setEnglish() {
        let that = this;
        weui.actionSheet([{
            label: "无",
            onClick: function () {
              that.defaultEnglish = "无";
            }
          },
          {
            label: "0 - 1年",
            onClick: function () {
              that.defaultEnglish = "0 － 1 年";
            }
          },
          {
            label: "1 - 2年",
            onClick: function () {
              that.defaultEnglish = "1 － 2 年";
            }
          },
          {
            label: "2 － 3年",
            onClick: function () {
              that.defaultEnglish = "2 － 3 年";
            }
          },
          {
            label: "3年以上",
            onClick: function () {
              that.defaultEnglish = "3年以上";
            }
          }
        ]);
      },
      getSoundValidate() {
        console.log("语音验证");
      }
    },
    created: function () {
      let that = this;
      that.$loading.hide();
    },
    mounted: function () {
      let that = this;

      var date_ele = $("#date-show");
      DatePicker({
        selectDateDom: date_ele,
        showDateDom: date_ele,
        callback: function (date_str) {
          that.defaultBirth = date_str;
          // date_ele.setAttribute("value", defaultBirth)
        }
      });
    }
  };
</script>
<style>
  @import "../../assets/css/common/variable.less";
  .information-wrapper {
    background: white;
    .content {
        display: flex;
        align-items: center;
        justify-content: center;
        background:@color;
        .logo {
            background: url('../../assets/images/logoTitle.png');
            width: 420px;
            height: 144px;
            background-size: cover;
        }
    }
    .inputWrapper {
        position: relative;
        text-align: center;
        span {
            left: 90px;
            top: 37px;
            position: absolute;
            display: inline-block;
            height: 45px;
            width: 45px;
            background-size: cover;
        }
        .mod {
            top: 23px;
        }
    }
    .tel {
        background: url('../../assets/images/phone.png');
    }
    .password {
        background: url('../../assets/images/password.png');
    }
    .valicode {
        background: url("../../assets/images/valicode.png") 90% 90%;
    }
    .getCode {
        position: absolute;
        display: inline-block;
        width: 180px;
        height: 65px;
        line-height: 70px;
        top: 27px;
        right: 90px;
        border-radius: 10px;
        font-size: 25px;
        background: @color;
    }
    a {
        width: 600px;
        margin-top: 20px;
    }
    #form {
        padding-top: 20px;
        padding-bottom: 30px;
    }
    .validate {
        margin: 10px auto 0;
        font-size: 20px;
    }
    .in1 {
        width: 500px;
        height: 80px;
        border: 1px solid grey;
        border-radius: 10px;
        position: relative;
        margin: 20px auto 0;
        padding-left: 100px;
        font-size: @rootFontSize;
        div {
            line-height: 82px;
        }
    }
    .weui-btn .btn1 {
        height: 80px;
        font-size: @rootFontSize;
        background: @color;
        margin-top: 20px;
    }
    p {
        text-align: center;
        margin-top: 30px;
    }
    p>span {
        display: inline-block;
        width: 200px;
    }
    .bottomTip {
        margin: 20px auto 10px;
        font-size: @rootFontSize;
        text-align: center;
    }
    .content {
        justify-content: flex-start;
        flex-direction: column;
        height: 450px;
        .text {
            text-align: center;
            font-size: 40px;
            margin-top: 20px;
            color: white;
        }
        .logo {
            width: 420px;
            height: 144px;
            background: url('../../assets/images/logoTitle.png');
            background-size: cover;
            margin-top: 140px;
        }
    }
    .in1 {
        padding-left: 130px;
        text-align: center;
        width: 460px;
        &.option {
            line-height: 82px;
        }
    }
    .inputWrapper {
        span {
            width: 110px;
            height: 100px;
            text-align: left;
        }
        .arr-down {
            display: inline-block;
             height: 30px;
             width: 30px;
             background: url('../../assets/images/arrdown.png');
             background-size: cover;
             position: absolute;
             left: 600px;
             top: 25px;
            }
    }
}
</style>
