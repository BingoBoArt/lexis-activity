<template>
  <div class="myOrder-wrapper">
    <div class="head">
      <a @click="goBack" href="javascript:void(0)" class="back-btn"></a>
      <span>我的订单</span>
    </div>
    <div class="title">
      <ul class="flex">
        <li class='items flex-1' v-for='(item, index) in title' v-bind:key='index' v-bind:class="item==selected?'active':'inactive'"
          @click="click(item)">
          <span>{{item}}</span>
          <span class="bottomLine"></span>
        </li>
      </ul>
    </div>
    <div class="content">
      <div class="infoWrapper" v-if='currentOrder.length'>
        <div class="contentItem" v-for='(item,index) in currentOrder ' v-bind:key='index'>
          <p>
            <span>订单状态：</span>{{status_str(item.status)}}
          </p>
          <p>
            <span>订单金额：</span>{{item.receiveAmount / 100}}元
          </p>
          <p>
            <span>产品名称：</span>{{item.skuName}}
          </p>
          <p>
            <span>订单编号：</span>{{item.orderId}}
          </p>
          <p>
            <span>支付时间：</span>{{item.payTime}}
          </p>
          <!--
          <p>
            <span>创建时间：</span>{{item.createdTime}}
          </p>
          <p>
            <span>支付成功时间：</span>{{item.payTime}}</p>
          <p>
            <span>订单应收金额：</span>{{item.receivableAmount}}</p>
          <p>
            <span>订单实收金额：</span>{{item.receiveAmount}}</p>
          <p>
            <span>订单状态：</span>{{item.status}}</p>
          <p>
          -->
         
        </div>
      </div>
      <p v-if='!(currentOrder.length)' class="tip">暂无订单信息</p>
    </div>
  </div>
</template>
<script>
  import Request from "@/common/request.js";
  import weui from "weui.js";
  export default {
    data: () => {
      return {
        title: ["全部订单", "已支付", "退款中", "已退款"],
        selected: "全部订单",
        orderList: "", //所有订单信息
        currentOrder: "", //当前展示的订单信息
        toPay: "", //代付款
        over: "", //已支付
        backPay: "", //退款中
        hasBack: "" //退款完成
      };
    },
    methods: {
      // status 10待支付 11订单超时未支付（终态）12订单取消（终态） 20支付成功（正向流程终态） 30退款中 31退款失败（终态） 32退款完成（终态）
      status_str(status) {
        var status_obj = {
          '10': '待支付',
          '11': '订单超时',
          '12': '已取消',
          '20': '已支付',
          '30': '退款中',
          '31': '退款失败',
          '32': '退款完成'
        }
        return status_obj[status] || '未知状态'
      },
      goBack() {
        window.history.back();
      },
      click(item) {
        this.selected = item;
        switch (item) {
          case "全部订单":
            this.currentOrder = this.orderList;
            break;
          case "待付款":
            this.currentOrder = this.toPay;
            break;
          case "已支付":
            this.currentOrder = this.over;
            break;
          case "退款中":
            this.currentOrder = this.backPay;
            break;
          case "已退款":
            this.currentOrder = this.hasBack;
            break;
        }
      }
    },
    created: function () {
      let that = this;
      that.$loading.show();
      Request({
          url: "/order/query/list",
          data: {
            page: 1,
            rows: 20,
            status: 0
          },
          // mock: require("@/mock/personalCenter"),
          type: "POST"
        })
        .then(res => {
          if (res.code == "0000") {
            let orders = res.data.dataList;
            that.orderList = orders.filter(item => {
              return item.status !== 10;
            });
            that.currentOrder = orders.filter(item => {
              return item.status !== 10;
            }); //默认显示全部
            that.toPay = orders.filter(item => {
              return item.status == "10";
            });
            that.over = orders.filter(item => {
              return item.status == "20";
            });
            that.backPay = orders.filter(item => {
              return item.status == "30";
            });
            that.hasBack = orders.filter(item => {
              return item.status == "32";
            });
          } else {
            weui.alert(res.msg);
          }
        })
        .always(function () {
          that.$loading.hide();
        });
    }
  };
</script>
<style lang="less" scoped>
  @import "../../../assets/css/common/variable.less";
  .myOrder-wrapper {
    text-align: center;
    .head {
      height: 80px;
      line-height: 80px;
      font-size: 35px;
      position: relative;
      border-bottom: 1px solid #efefef;
      span {}
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
      overflow: hidden; // border-bottom: 3px solid #33cdec
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