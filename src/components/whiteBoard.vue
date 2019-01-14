<template>
  <div class="board_c">
    <div class="toobar">
      <div class="toollist">
        <el-popover placement="bottom">
          <el-slider v-model="pencilSize" :show-tooltip="false"></el-slider>
          <i @click="curTool=1" :class="[{ success: curTool==1 }, 'fas','fa-pen']" slot="reference"></i>
        </el-popover>
        <el-popover placement="bottom">
          <div>
            <i @click="curColor='blue'" class="color_item bluebg"></i>
            <i @click="curColor='success'" class="color_item successbg"></i>
            <i @click="curColor='warning'" class="color_item warningbg"></i>
            <i @click="curColor='danger'" class="color_item dangerbg"></i>
            <i @click="curColor='info'" class="color_item infobg"></i>
          </div>
          <i :class="[curColor,'fas','fa-palette']" slot="reference"></i>
        </el-popover>
        <i
          @click="curTool=2"
          :class="[{ success: curTool==2 },'fas', 'fa-external-link-square-alt']"
        ></i>
        <i @click="curTool=3" :class="[{ success: curTool==3 },'far', 'fa-square']"></i>
        <el-popover placement="bottom">
          <el-slider v-model="eraserSize" :show-tooltip="false"></el-slider>
          <i
            @click="curTool=4"
            :class="[{ success: curTool==4 },'fas', 'fa-eraser']"
            slot="reference"
          ></i>
        </el-popover>

        <i @click="doDel()" :class="[{ success: curTool==5 },'far', 'fa-trash-alt']"></i>
        <i @click="doSave()" :class="[{ success: curTool==6 },'fas', 'fa-save']"></i>
      </div>
    </div>
    <canvas :id="id+'_canvas'" class="main_canvas"></canvas>
  </div>
</template>

<script>
let canvas;
let ctx;
let lastX, lastY;
let scaleW = 1;
let scaleH = 1;
let recordList = [];
let curImgData;
export default {
  name: "WhiteBoard",
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      pencilSize: 20,
      eraserSize: 50,
      curColor: "success", //blue  success warning danger info
      colorList: {
        blue: "#409EFF",
        success: "#52cc90",
        warning: "#E6A23C",
        danger: "#F56C6C",
        info: "#909399"
      },
      curTool: 1 //1 铅笔2 直线 3 square 4 eraser
    };
  },
  methods: {
    doDel() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
    doSave() {
      var url = canvas.toDataURL("image/png");
      var a = document.createElement("a");
      var event = new MouseEvent("click");
      a.download = Date.now();
      a.href = url;
      a.dispatchEvent(event);
    },
    setContext(ctx) {
      ctx.lineWidth = this.pencilSize / 10;
      ctx.strokeStyle = this.colorList[this.curColor];
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      if (this.curTool == 4) {
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineWidth = this.eraserSize;
      } else {
        ctx.globalCompositeOperation = "source-over";
      }
    },
    resizeCanvas() {
      canvas.width = window.innerWidth - 320 - 64; //设置全屏占用宽高
      canvas.height = window.innerHeight - 50;
    },
    initCanvas(canvas, ctx) {
      var _this = this;
      let beginDraw = false;
      canvas.onmousedown = function(e) {
        lastX = e.offsetX;
        lastY = e.offsetY;
        beginDraw = true;
        _this.setContext(ctx);
        _this.curImgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      };
      canvas.onmousemove = function(e) {
        if (beginDraw) {
          switch (_this.curTool) {
            case 1:
              ctx.beginPath();
              ctx.moveTo(lastX, lastY);
              ctx.lineTo(e.offsetX, e.offsetY);
              ctx.stroke();
              lastX = e.offsetX;
              lastY = e.offsetY;
              break;
            case 2:
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              ctx.putImageData(_this.curImgData, 0, 0);
              ctx.beginPath();
              ctx.moveTo(lastX, lastY);
              ctx.lineTo(e.offsetX, e.offsetY);
              ctx.stroke();
              break;
            case 3:
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              ctx.putImageData(_this.curImgData, 0, 0);
              ctx.beginPath();
              ctx.rect(lastX, lastY, e.offsetX - lastX, e.offsetY - lastY);
              ctx.stroke();
              break;
            case 4:
              ctx.beginPath();
              ctx.moveTo(lastX, lastY);
              ctx.lineTo(e.offsetX, e.offsetY);
              ctx.stroke();
              lastX = e.offsetX;
              lastY = e.offsetY;
              break;
          }
        }
      };
      canvas.onmouseup = function() {
        beginDraw = false;
      };
    }
  },
  mounted: function() {
    canvas = document.getElementById(this.id + "_canvas");
    ctx = canvas.getContext("2d");
    this.resizeCanvas();
    this.initCanvas(canvas, ctx);
  }
};
</script>
<style scoped lang="scss">
$bg: #404248;
.board_c {
  height: 100%;
  position: relative;
  .main_canvas {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
  }
  .toobar {
    text-align: center;
    position: relative;
    .toollist {
      display: inline-block;
      padding: 5px;
      background-color: $bg;
      margin: auto;
      font-size: 25px;
      color: #fff;
      margin-top: 10px;
      position: relative;
      z-index: 5;
      i {
        margin: 5px;
        cursor: pointer;
      }
    }
  }
}
.color_item {
  width: 20px;
  height: 20px;
  display: inline-block;
  margin: 5px;
  cursor: pointer;
}
</style>
