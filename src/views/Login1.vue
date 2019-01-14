<template>
  <div class="login">
    <div class="left">
      <h1 class="title">景蓝云课堂</h1>
      <p class="des">专注教育培训 互动轻课堂</p>
      <p class="des1">一键开启直播授课 让培训学习更有价值</p>
      <div class="login_bg">
        <img src="@/assets/login.png">
      </div>
    </div>
    <div class="right">
      <div class="loginC">
        <h3>欢迎登录微吼课堂</h3>
        <div class="tab">
          <span class>手机登录</span>
          <em>|</em>
          <span class="active">注册</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {};
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.login {
  height: 100%;
  overflow: hidden;
}
.left {
  width: 50%;
  height: 100%;
  float: left;
  background: linear-gradient(180deg, #22d28f, #00ab92);
  position: relative;
  color: #fff;
}
.right {
  width: 50%;
  height: 100%;
  float: left;
  position: relative;
  .loginC {
    width: 340px;
    position: absolute;
    left: 50%;
    top: 20%;
    margin-left: -170px;
    h3 {
      font-size: 32px;
      color: #444;
      font-weight: 300;
    }
    .tab {
      margin-top: 40px;
      font-weight: 300;
      em {
        margin: 0 20px;
        font-size: 18px;
        color: #000;
        vertical-align: middle;
        display: inline-block;
        font-style: normal;
      }
      span {
        font-size: 22px;
        color: #000;
        cursor: pointer;
        vertical-align: middle;
        display: inline-block;
      }
      .active{
        color: #52cc90;
      }
    }
  }
}
.title {
  font-size: 42px;
  margin: 30px;
}
.des {
  text-align: center;
  margin-top: 65px;
  font-size: 36px;
  font-weight: 300;
}
.des1 {
  text-align: center;
  font-size: 18px;
  margin-top: 10px;
  font-weight: 300;
}
.login_bg {
  text-align: center;
  img {
    display: block;
    width: 62%;
    margin: 30px auto 0;
  }
}
</style>
