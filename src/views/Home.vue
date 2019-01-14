<template>
  <div class="container">
    <div class="top">
      <div class="left">
        <span class="title">CCCC</span>
        <div class="identity">
          <div>
            <span>ID</span>
            <i>111111</i>
          </div>
        </div>
      </div>
      <div class="right">
        <el-button size="mini" type="success" round>开始上课</el-button>
        <div class="user-box">
          <i class="el-icon-setting set"></i>
          <div class="down-box">
            <div class="user-top">
              <span>
                <em>讲师</em>
                aa
              </span>
            </div>
            <div class="user-down">
              <div class="section">
                <div class="bg">
                  <i class="el-icon-picture-outline"></i>
                </div>
                <p>媒体设置</p>
              </div>
              <div class="section">
                <div class="bg">
                  <i class="el-icon-news"></i>
                </div>
                <p>角色退出</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="left">
        <ul class="edu-interact-slider">
          <li :class="{active:curMain == 'doc'}" @click="curMain = 'doc'">
            <i class="el-icon-document"></i>
            <span>文档</span>
          </li>
          <li :class="{active:curMain == 'whiteBoard'}" @click="curMain = 'whiteBoard'">
            <i class="el-icon-edit-outline"></i>
            <span>白板</span>
          </li>
          <li :class="{active:curMain == 'desk'}" @click="curMain = 'desk'">
            <i class="el-icon-picture-outline"></i>
            <span>桌面</span>
          </li>
        </ul>
      </div>
      <div class="mid">
        <div class="file_choose" v-show="curMain == 'doc' && !curDoc">
          <img src="@/assets/entry.png">
          <el-button size="mini" type="success" round @click="dialogFormVisible = true">选择文档</el-button>
        </div>
        <div class="doc_share" v-show="curMain == 'doc' && curDoc">
          <el-carousel
            :autoplay="false"
            arrow="always"
            height="100%"
            indicator-position="none"
            :loop="false"
            ref="pptlist"
          >
            <el-carousel-item v-for="(item,index) in pptList" :key="index">
              <div class="picItem">
                <img :src="item">
              </div>
            </el-carousel-item>
          </el-carousel>
          <div class="white_board" v-show="curMain == 'doc' && curDoc">
            <WhiteBoard class="board1" id="board2"></WhiteBoard>
          </div>
          <div class="doc_right">
            <el-scrollbar style="height:100%" id="ppt_scroll">
              <transition name="el-zoom-in-center">
                <div class="ppt_list" v-show="pptListFlag">
                  <div
                    class="ppt_item"
                    v-for="(item,index) in pptList"
                    :key="index"
                    @click="choosePpt(index)"
                  >
                    <img :src="item">
                  </div>
                </div>
              </transition>
            </el-scrollbar>

            <span class="changeFlag" @click="pptListFlag = !pptListFlag">
              <i class="el-icon-d-arrow-right main_clolor"></i>
            </span>
          </div>
        </div>
        <div class="white_board" v-show="curMain == 'whiteBoard'">
          <WhiteBoard class="board1" id="board1"></WhiteBoard>
        </div>
        <div class="desk_share" v-show="curMain == 'desk'">desk_share</div>
        <el-dialog title="文档" :visible.sync="dialogFormVisible" custom-class="file_dialog">
          <div class="file_top clearfix">
            <div class="fl">
              <el-input placeholder="请输入文档名称" v-model="docName" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
            <div class="fr">
              <el-upload
                class="upload_btn"
                :show-file-list="false"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-progress="uploadProgress"
                :on-success="uploadSuccess"
              >
                <el-button type="warning" icon="el-icon-upload" size="small">上传</el-button>
              </el-upload>

              <el-button type="warning" icon="el-icon-delete" size="small" disabled>删除</el-button>
            </div>
          </div>
          <div class="file_table">
            <el-table
              :data="fileList"
              height="350"
              border
              style="width: 100%"
              highlight-current-row
            >
              <el-table-column prop="date" label="名称" width="180"></el-table-column>
              <el-table-column prop="name" label="上传时间" width="180"></el-table-column>
              <el-table-column prop="address" label="页数"></el-table-column>
              <el-table-column prop="address" label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index)">演示</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-dialog>
      </div>
      <div class="right">
        <div class="right_top">
          <div class="teacher-placeholder">
            <img src="@/assets/user.png">
          </div>
        </div>
        <div class="right_chat">
          <el-tabs v-model="curTab" stretch id="mytabs">
            <el-tab-pane label="讨论" name="first">
              <div class="chat_list">
                <el-scrollbar style="height:100%" id="chat_scroll">
                  <ul>
                    <li v-for="(item, index) in chatList" :key="index" class="clearfix">
                      <div class="user fr teacher">
                        <i class="fas fa-user-graduate"></i>
                      </div>
                      <div class="msg fr">
                        <div class="title">819624</div>
                        <div class="content" v-html="item"></div>
                      </div>
                    </li>
                  </ul>
                </el-scrollbar>
              </div>
            </el-tab-pane>
            <el-tab-pane label="成员" name="second">
              <div class="chat_list user_list">
                <el-scrollbar style="height:100%">
                  <ul>
                    <li v-for="(item, index) in userList" :key="index" class="clearfix user-item">
                      <div class="user fl teacher">
                        <i class="fas fa-user-graduate ico"></i>
                      </div>
                      <span class="name">{{item}}</span>
                    </li>
                  </ul>
                </el-scrollbar>
              </div>
            </el-tab-pane>
            <el-tab-pane label="公告" name="third">
              <div class="chat_list notice_list">
                <el-scrollbar style="height:100%">
                  <ul>
                    <li v-for="(item, index) in noticeList" :key="index" class="clearfix">
                      <div class="user fr teacher">
                        <i class="fas fa-user-graduate"></i>
                      </div>
                      <div class="msg fr">
                        <div class="title">819624</div>
                        <div class="content" v-html="item"></div>
                      </div>
                    </li>
                  </ul>
                </el-scrollbar>
              </div>
            </el-tab-pane>
          </el-tabs>
          <div class="right_bottom">
            <div>
              <div class="clearfix" style="position:relative">
                <i class="far fa-smile icon-biaoqing_icon fl" @click="emoji = !emoji"></i>
                <div class="fr close-chat clearfix">
                  <span>全体禁言</span>
                  <el-switch active-color="#4bc388" v-model="chat_on"></el-switch>
                </div>
                <VueEmoji @emotion="onInput" v-show="emoji" ref="emoji"/>
              </div>
              <div class="write-box clearfix">
                <input
                  placeholder="按Enter发送消息"
                  class="fl text"
                  v-model="chat_input"
                  @keyup.enter="send"
                >
                <button
                  :class="chat_input.length > 0 ? 'fl send active' : 'fl send'"
                  @click="send"
                >发送</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueEmoji from "@/components/emoji";
import WhiteBoard from "@/components/whiteBoard";
import { validateEmpty } from "@/utils/validate";
export default {
  name: "Home",
  data() {
    return {
      chat_input: "",
      chat_on: false, //是否开启禁言
      emoji: false, //是否显示表情
      curTab: "first", //右侧聊天当前选项卡
      docName: "", //文档搜索名称
      dialogFormVisible: false, //文档窗口是否显示
      curMain: window.LS.get("curMain") || "doc", //当前主窗口显示内容
      curDoc: window.LS.get("curDoc") || false, //当前是否有演示文档
      pptListFlag: false,
      chatList: [],
      userList: ["1", "2", "3", "4"],
      noticeList: [],
      fileList: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      pptList: [
        "https://static01-class.e.vhall.com/vhallclass/document/fa7008921165e43db2021b70ad0af0b9/1.jpg",
        "https://static01-class.e.vhall.com/vhallclass/document/fa7008921165e43db2021b70ad0af0b9/2.jpg",
        "https://static01-class.e.vhall.com/vhallclass/document/fa7008921165e43db2021b70ad0af0b9/3.jpg",
        "https://static01-class.e.vhall.com/vhallclass/document/fa7008921165e43db2021b70ad0af0b9/4.jpg",
        "https://static01-class.e.vhall.com/vhallclass/document/fa7008921165e43db2021b70ad0af0b9/4.jpg",
        "https://static01-class.e.vhall.com/vhallclass/document/fa7008921165e43db2021b70ad0af0b9/4.jpg",
        "https://static01-class.e.vhall.com/vhallclass/document/fa7008921165e43db2021b70ad0af0b9/5.jpg"
      ]
    };
  },
  methods: {
    //选中表情后回调
    onInput(item, i) {
      this.emoji = !this.emoji;
      this.chat_input += item;
    },
    //聊天发送按钮
    send() {
      if (validateEmpty(this.chat_input)) return;
      if (this.curTab == "first") {
        const t = this.$refs.emoji.parse(this.chat_input);
        this.chatList.push(t);
        this.scroll("chat_scroll");
      } else if (this.curTab == "second") {
      } else if (this.curTab == "third") {
        const t = this.$refs.emoji.parse(this.chat_input);
        this.noticeList.push(t);
      }
      this.chat_input = "";
    },
    uploadProgress(event, file, fileList) {
      console.log(event);
    },
    uploadSuccess(response, file, fileList) {
      console.log(response);
    },
    //选择文档开始演示
    handleEdit(index) {
      this.dialogFormVisible = !this.dialogFormVisible;
      this.curDoc = true;
      this.curMain = "doc";
      window.LS.set("curMain", "doc");
      window.LS.set("curDoc", true);
      console.log(index);
    },
    choosePpt(index) {
      console.log(index);
      this.$refs.pptlist.setActiveItem(index);
    },
    //聊天自动滚到最底层
    scroll(id) {
      setTimeout(function() {
        var ele = document
          .getElementById(id)
          .getElementsByClassName("el-scrollbar__wrap")[0];
        ele.scrollTop = ele.scrollHeight;
      }, 200);
    }
  },
  components: { VueEmoji, WhiteBoard }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/assets/home.scss";
</style>
