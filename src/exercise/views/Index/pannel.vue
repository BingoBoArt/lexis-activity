<template>
    <div class="pannel" :class="{'pannel-hastitle': title}">
      <h2 class="title" v-if="title">{{title}}</h2>
      <div class="pannel-content">
        <slot></slot>
      </div>
      <p class="comment" v-if="comment">{{comment}}</p>
    </div>
</template>
<script>
export default {
    name: 'pannel',
    components: {

    },
    data: () => {
      return {

      }
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      comment: {
        type: String,
        default: ''
      }
    },
    methods: {

    },
    created: function() {

    },
    mounted: function() {

    }
}
</script>
<style lang="less" scoped>
@border-radius: 40px;
@min-height: 200px;
.pannel{
  box-shadow: 2.5px 4.33px 9.7px 0.3px rgba(161, 150, 170, 0.5);
  width: 680px;
  position: relative;
}
.pannel-content{
  background-color: white;
  width: 100%;
  height: 100%;
  min-height: @min-height;
  padding: 45px 0;
  box-sizing: border-box;
}
.comment{
  background-color: #4d75ea;
  width: 593px;
  padding: 10px;
  color: white;
  font-size: 28px;
  padding: 10px;
  box-sizing: border-box;
  text-shadow: 2.5px 4.33px 9.7px rgba(90, 25, 156, 0.58);
  font-weight: 600;
  line-height: 44px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate3d(-50%, 50%, 0);
  text-align: center;
}
.title{
  background-color: #4d75ea;
  position: absolute;
  left: 50%;
  top: -12px;
  transform: translateX(-50%);
  padding: 0 10px;
  height: 84px;
  line-height: 84px;
  color: white;
  min-width: 269px;
  box-sizing: border-box;
  text-align: center;
  font-weight: 600;
  font-size: 44px;
  &:before,&:after{
    width: 45px;
    height: 84px;
    content: " ";
    position: absolute;
    top: 0;
  }
  &:before{
    background: url(~@/assets/images/v3/title-left.png) no-repeat;
    background-size: cover;
    left: -43px;
  }
  &:after{
    background: url(~@/assets/images/v3/title-right.png) no-repeat;
    background-size: cover;
    right: -43px;
  }
}
.pannel-hastitle{
  .pannel-content{
    padding: 95px 0 30px;
  }
}
</style>
