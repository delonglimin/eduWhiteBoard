<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style rel="stylesheet/scss" lang="scss">
html,
body,
#app {
  height: 100%;
  .el-button--success {
    background-color: #4bc388;
    border-color: #4bc388;
  }
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  outline: none;
}
i,
em {
  font-style: normal;
}
#app .main_clolor {
  color: #4bc388;
}
#app .right_chat .el-tabs__item {
  color: #fff;
}
#app .right_chat .el-tabs__nav-wrap::after {
  background-color: #333438;
}
#app .right_chat .el-tabs__active-bar {
  background-color: #4bc388;
}
#app .fl {
  float: left;
}
#app .fr {
  float: right;
}
#app textarea {
  resize: none;
}
#app .clearfix:after {
  content: "";
  display: table;
  clear: both;
}
#app .container .el-tabs__content {
  height: calc(100% - 55px);
}
#app .container .el-tab-pane {
  height: 100%;
}
#app .el-scrollbar__wrap {
  overflow-x: hidden;
}
#app .container .el-dialog__header {
  background: #4bc388;
  padding: 15px;
  text-align: center;
}
#app .container .el-dialog__header .el-dialog__title {
  color: #fff;
}
#app .container .el-carousel .el-carousel__arrow--right {
  right: 200px;
  background-color: rgba(68, 68, 68, 0.5);
}
#app .container .el-carousel .el-carousel__arrow--left {
  left: 200px;
  background-color: rgba(68, 68, 68, 0.5);
}
.blue{
  color: #409EFF
}
.success{
  color:#52cc90
}
.warning{
  color:#E6A23C
}
.danger{
  color:#F56C6C
}
.info{
  color:#909399
}
.bluebg{
  background-color: #409EFF;
}
.successbg{
  background-color:#52cc90;
}
.warningbg{
  background-color:#E6A23C;
}
.dangerbg{
  background-color:#F56C6C;
}
.infobg{
  background-color:#909399;
}
</style>
