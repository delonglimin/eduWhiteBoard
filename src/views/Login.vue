<template>
  <div class="wapper workClass">
    <div class="login-box">
      <div class="logoWrap">
        <h3 class="logo">景蓝云课堂</h3>
      </div>
      <div class="fl class-info">
        <span class="back">回放</span>
        <p class="tit">CCCC</p>
        <div class="line">
          <div class="bold-line"></div>
        </div>
        <div class="time">
          <p>上课时间：2019-01-10 16:53</p>
          <p>课堂时长：3小时 45分钟</p>
        </div>
        <div class="desc">CCCCC</div>
      </div>

      <div class="write-box">
        <div class="img"></div>

        <div class="ipt-box">
          <el-input placeholder="请输入姓名" prefix-icon="el-icon-mobile-phone" v-model="name"></el-input>
        </div>
        <div class="ipt-box">
          <el-input placeholder="请输入口令" prefix-icon="el-icon-view" v-model="pass"></el-input>
        </div>
        <el-button type="success" class="btn">进入课堂</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      name: "",
      pass: ""
    };
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.wapper {
  width: 100%;
  height: 100%;
  background-color: #4bc388;
  position: relative;
}
.fl {
  float: left;
}
.login-box {
  width: 800px;
  height: 500px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -300px;
  margin-left: -400px;
  padding: 30px 44px 67px;
  .logo {
    font-size: 30px;
    margin-bottom: 10px;
    color: #42c082;
  }
  .class-info {
    margin-right: 68px;
    span {
      min-width: 62px;
      height: 24px;
      border-radius: 100px;
      font-size: 14px;
      color: #fff;
      text-align: center;
      line-height: 24px;
      font-weight: 500;
      margin-bottom: 30px;
      margin-top: 30px;
      padding: 0 5px;
      display: inline-block;
    }
    span.back {
      background-color: #ff9f5b;
    }
    .tit {
      width: 308px;
      font-size: 18px;
      font-weight: 600;
      color: #2d3330;
      line-height: 30px;
      word-wrap: break-word;
      word-break: break-all;
      margin-bottom: 20px;
    }
    .line {
      width: 380px;
      height: 1px;
      background-color: #ccc;
      position: relative;
    }
    .time {
      margin: 10px 0 18px;
      p {
        font-size: 14px;
        color: #444;
        margin-bottom: 6px;
      }
    }
    .desc {
      width: 380px;
      height: 160px;
      line-height: 23px;
      color: #444;
      font-size: 12px;
      word-wrap: break-word;
      word-break: break-all;
      overflow: auto;
    }
  }
  .write-box {
    overflow: hidden;
    width: 260px;
    .img {
      width: 210px;
      height: 180px;
      background: url("~@/assets/entry.png") no-repeat;
      background-size: 100% 100%;
      margin: 0 auto 10px;
    }
    .ipt-box {
      width: 260px;
      margin-bottom: 10px;
    }
  }
  .btn {
    width: 100%;
    margin-top: 42px;
  }
}
</style>
