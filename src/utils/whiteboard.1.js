let canvas = document.getElementById("drawing-board");
let ctx = canvas.getContext("2d");
var cPushA = new Array();
var ctep = -1;
var clearRct = 0;
var img = new Image();
var lastPoint = [];
var scaleW = '';
var scaleH = '';
var qrCode = '';

function GetRequest() { 
    var url = location.search; //获取url中"?"符后的字串 
    var theRequest = new Object(); 
    if (url.indexOf("?") != -1) {
        var str = url.substr(1); 
        strs = str.split("&"); 
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]); 
        } 
    } 
    return theRequest; 
} 
var req = GetRequest(); 
var user_token = req['user_token'];
var groupId = req['groupId'];
var role = req['role'];
var name = req['name'];
var currentdate = '';
var userFrom = '';
var Code = '';
var qrCode = '';
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}
getNowFormatDate();
var ws = new WebSocket("ws://116.62.129.180:58282?app=app123&token="+user_token);
ws.onopen = function() {
    var temp = {
        "type":"join",
        "platform":"web",
        'groupId':groupId,
        "message":"自定义消息内容",
        "extras":"扩展消息"
    };
    var tempMes = JSON.stringify(temp);
    ws.send(tempMes);
};
ws.onmessage = function(evt) {
    receivedMsg = evt.data; 
    var rcdMsg=eval("("+receivedMsg+")");
    
    if(rcdMsg.type == 'join' && userFrom == ''){
        userFrom = rcdMsg.from;
    }
    if(rcdMsg.type == 'join' && rcdMsg.from != userFrom){
        if(img.src.substring(22) != '' && img.src.substring(22) != undefined){
            var temp = {
                "type":"TxtMsg",
                "platform":"web",
                "from":"55wanxue",
                "message":{"action":"canvasInit",
                        "alpha":255,
                        "canvasData":img.src.substring(22),
                        "canvasHeight":canvas.height,
                        "canvasWidth":canvas.width,
                        "color":'',
                        "editMode":'',
                        "endPoint":'',
                        "eraserSize":'',
                        "paintSize":'',
                        "startPoint":'',
                        "type":2
                    },
                "name":"wanxue",
                "time":currentdate,
                "to":[rcdMsg.from],
                "extras":"扩展消息"
            };
            var tempMes = JSON.stringify(temp);
            ws.send(tempMes);
        };
        if(Code != '' && Code != undefined){
            var temp = {
                "type":"TxtMsg",
                "platform":"web",
                "from":userFrom,
                "message":{
                        "action":"picture",
                        "alpha":alpha,
                        "canvasData":Code,
                        "canvasHeight":canvas.height,
                        "canvasWidth":canvas.width,
                        "color":'',
                        "editMode":'',
                        "endPoint":'',
                        "eraserSize":'',
                        "paintSize":'',
                        "startPoint":'',
                        "type":2,
                        "text":''
                    },
                "name":"wanxue",
                "time":currentdate,
                "to":[rcdMsg.from],
                "extras":"扩展消息"
            };
            var tempMes = JSON.stringify(temp);
            ws.send(tempMes);
        }; 
    }
    var jsonObject = rcdMsg.message;
    if(jsonObject != '' && jsonObject != 'success' && jsonObject != undefined){
        var sHex = jsonObject.color;
        var alpha = jsonObject.alpha/255;
        var activeColor = sHex.colorRgb(alpha);
        var paintSize = jsonObject.paintSize;
        var eraserSize = jsonObject.eraserSize;
        var ponitSaid = jsonObject.arrPoint;
        var painting = jsonObject.painting;
        var fontSize = 24;
        scaleW = canvas.width/jsonObject.canvasWidth;
        scaleH = canvas.height/jsonObject.canvasHeight;
        
        function push(){
            ctep++;
            if (ctep < cPushA.length) { cPushA.length = ctep;}
            cPushA.push(canvas.toDataURL('image/png'));
            img.src = canvas.toDataURL('image/png');
        }
        var action = jsonObject.action;
        var type = jsonObject.type;
        var endPoint = jsonObject.endPoint;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.save(); 
        switch (action)
            {
            case "changeCurrentPath":
                lastPoint = endPoint;
                if(type == 6){
                    var ponitSaid = jsonObject.endPoint
                    var main = jsonObject.text;
                    if( paintSize != 4){
                        fontSize = paintSize;
                    }
                    var font = 'bold '+ fontSize +'px 宋体';
                    ctx.font = font;
                    ctx.fillStyle = activeColor;
                    ctx.fillText(main,ponitSaid[0]*scaleW,ponitSaid[1]*scaleH);
                    clearRct = 0
                }
                break;
            case 'appendToCurrentPath':
                switch (type)
                    {
                    case 2:
                        ctx.beginPath();
                        ctx.moveTo(lastPoint[0]*scaleW,lastPoint[1]*scaleH);
                        ctx.lineTo(endPoint[0]*scaleW,endPoint[1]*scaleH);
                        ctx.lineWidth = paintSize;
                        ctx.strokeStyle = activeColor;
                        ctx.closePath();
                        ctx.stroke(); 
                        ctx.closePath();
                        clearRct = 0;
                        lastPoint = endPoint;
                        break;
                    case 1:
                        ctx.beginPath();
                        ctx.moveTo(lastPoint[0]*scaleW,lastPoint[1]*scaleH);
                        ctx.lineTo(endPoint[0]*scaleW,endPoint[1]*scaleH);
                        ctx.lineWidth = eraserSize;
                        ctx.strokeStyle = 'white';
                        ctx.globalCompositeOperation = "destination-out";
                        ctx.closePath();
                        ctx.stroke(); 
                        ctx.restore();
                        clearRct = 0;
                        lastPoint = endPoint;
                        break;
                    case 3:
                        ctx.clearRect(0,0, canvas.width,canvas.height);
                        ctx.drawImage(img, 0, 0);
                        ctx.beginPath();
                        ctx.moveTo(lastPoint[0]*scaleW,lastPoint[1]*scaleH);
                        ctx.lineTo(endPoint[0]*scaleW,endPoint[1]*scaleH);
                        ctx.lineWidth = paintSize;
                        ctx.strokeStyle = activeColor;
                        ctx.closePath();
                        ctx.stroke();
                        clearRct = 0
                        break;
                    case 4:
                        ctx.clearRect(0,0, canvas.width,canvas.height);
                        ctx.drawImage(img, 0, 0);
                        ctx.beginPath();
                        var newOrigin = lastPoint;

                        if(endPoint[0]*scaleW < lastPoint[0]*scaleW){
                            newOrigin[0] = endPoint[0]*scaleW;
                        }
                        if(endPoint[1]*scaleH < lastPoint[1]*scaleH){
                            newOrigin[1] = endPoint[1]*scaleH;
                        }
                        ParamEllipse(ctx, newOrigin[0]*scaleW, newOrigin[1]*scaleH, Math.abs(endPoint[0]*scaleW-lastPoint[0]*scaleW)/2, Math.abs(endPoint[1]*scaleH-lastPoint[1]*scaleH)/2); 
                        function ParamEllipse(context, x, y, a, b){
                            var step = (a > b) ? 1 / a : 1 / b;
                            context.beginPath();
                            context.moveTo(x + a, y); 
                            for (var i = 0; i < 2 * Math.PI; i += step)
                            {
                            context.lineTo(x + a * Math.cos(i), y + b * Math.sin(i));
                            }
                            context.strokeStyle = activeColor;
                            context.lineWidth = paintSize;
                            context.closePath();
                            context.stroke();
                        };
                        ctx.strokeStyle = activeColor;
                        ctx.lineWidth = paintSize;
                        ctx.stroke();
                        ctx.closePath();
                        clearRct = 0
                        break;
                    case 5:
                        ctx.clearRect(0,0, canvas.width,canvas.height);
                        ctx.drawImage(img, 0, 0);
                        ctx.beginPath();
                        ctx.fillStyle = activeColor;
                        var newOrigin = lastPoint;

                        if(endPoint[0]*scaleW < lastPoint[0]*scaleW){
                            newOrigin[0] = endPoint[0]*scaleW;
                        }
                        if(endPoint[1]*scaleH < lastPoint[1]*scaleH){
                            newOrigin[1] = endPoint[1]*scaleH;
                        }
                        ctx.rect(newOrigin[0]*scaleW,newOrigin[1]*scaleH,Math.abs(endPoint[0]*scaleW-lastPoint[0]*scaleW),Math.abs(endPoint[1]*scaleH-lastPoint[1]*scaleH));
                        ctx.strokeStyle = activeColor;
                        ctx.lineWidth = paintSize;
                        ctx.stroke();
                        ctx.closePath();
                        clearRct = 0
                        break;
                     }
                break;
                case 'addPath':
                    push();
                    break;
                case 'undo':
                    if(clearRct == 1){
                        img.src = cPushA[ctep];
                        img.onload = function () { ctx.clearRect(0,0, canvas.width,canvas.height); ctx.drawImage(img, 0, 0); } 
                        clearRct = 0
                    }else{
                        if (ctep > 0) {
                            ctep--;
                            img.src = cPushA[ctep];
                            img.onload = function () {ctx.clearRect(0,0, canvas.width,canvas.height); ctx.drawImage(img, 0, 0); }    
                        }
                        else{
                            ctx.clearRect(0,0, canvas.width,canvas.height);
                            setCanvasBg('transparent');   
                            ctep = -1;
                        } 
                    }    
                    break;
                case 'redo':
                    if (ctep < cPushA.length-1) {
                        ctep++;
                        img.src = cPushA[ctep];
                        img.onload = function () {ctx.clearRect(0,0, canvas.width,canvas.height); ctx.drawImage(img, 0, 0); }
                    }
                    clearRct = 0;
                    break;
                case 'clear':
                    ctx.clearRect(0,0, canvas.width,canvas.height);
                    setCanvasBg('transparent');
                    img.src = canvas.toDataURL('image/png');
                    cPushA = [];
                    clearRct = 1;
                    ctep = -1;
                    Code = '';
                    qrCode='';
                    bground.style.display = 'none';
                    break;
                case 'picture':
                    Code = jsonObject.canvasData;
                     if(Code !=''){
                        bground.style.display = 'block';
                        var urlData = 'data:image/png;base64,'+Code;
                        var oImg = new Image();
                        oImg.src=urlData;
                        oImg.style.width = bground.style.width;
                        oImg.style.height = bground.style.height;
                        oImg.style.position = "absolute";
                        oImg.style.zIndex = -2;
                        oImg.className = 'oImg';
                        bground.appendChild(oImg);
                    }
                    break;
                case 'canvasInit':
                    var qrCode = jsonObject.canvasData;
                    if(qrCode !=''){
                        bground.style.display = 'block';
                        var imgUrl = new Image();
                        imgUrl.src = 'data:image/png;base64,'+qrCode;
                        imgUrl.style.width = bground.style.width;
                        imgUrl.style.height = bground.style.height;
                        imgUrl.style.position = "absolute";
                        imgUrl.style.zIndex = -1;
                        imgUrl.style.background = 'transparent';
                        imgUrl.className = 'imgUrl';
                        bground.appendChild(imgUrl);
                    }
                    // imgUrl.onload = function () { ctx.drawImage(imgUrl,0,0,canvas.width,canvas.height); }   
                    break;
                case 'save':
                    var imgUrl = canvas.toDataURL("image/png");
                    let saveA = document.createElement("a");
                    document.body.appendChild(saveA);
                    saveA.href = imgUrl;
                    saveA.download = "zspic" + (new Date).getTime();
                    saveA.target = "_blank";
                    saveA.click();
                    clearRct = 0
                    break;
            }
    } 
};
ws.onerror = function(evt) {
    // console.log(evt)
};
ws.onclose = function() {
    // 关闭 websocket
    alert("连接已关闭...");
};
let range = document.getElementById("range");
var erserRange = document.getElementById("erserRange");
var rangeAlpha = document.getElementById("rangeAlpha");
let aColorBtn = document.getElementsByClassName("color-item");
let text = false;
let color = '#000000';
var alpha = 255;
let paintSize = 4;
let eraserSize = 20;
let textIn = document.getElementById("textIn");
let arrPoint = [];
let type = 2;
let undoR = false;
let bground = document.getElementById('bground');
var imageData = '';
autoSetSize(canvas);

setCanvasBg('transparent');

listenToUser(canvas);

getColor();

window.onbeforeunload = function(){
    return "Reload site?";
};

function autoSetSize(canvas) {
    canvasSetSize();

    function canvasSetSize() {
        
        let pageWidth = document.documentElement.clientWidth;
        let pageHeight = document.documentElement.clientHeight;
        
        canvas.width = pageWidth;
        canvas.height = pageHeight;
        if(imageData != ''){
            ctx.putImageData(imageData,0,0);
        } 
    }

    window.onresize = function () {
        canvasSetSize();
    }
}

function setCanvasBg(color) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
}
var startX;
var startY;

function listenToUser(canvas) {
    let painting = false;
    let lastPoint = {x: undefined, y: undefined};

    if (document.body.ontouchstart !== undefined) {
        canvas.ontouchstart = function (e) {
            painting = true;
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY; 
            lastPoint = {"x": startX, "y": startY};
            imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
            arrPoint=[startX,startY];
            if(text){
                textIn.style.display='block'
                if(textIn.value ==''){
                    textIn.style.left = startX +'px';
                    textIn.style.top = startY +'px';  
                }
                var main = textIn.value;
                arrPoint=[startX,startY];
                if(main!=''){
                    getMessage('changeCurrentPath',alpha,canvas.height,canvas.width,color,1,arrPoint,eraserSize,paintSize,'',main,6,'');
                }  
            }else{
                textIn.style.display='none';
                StorkeType('changeCurrentPath',arrPoint,type)
            }
            textIn.value = ''
            ctx.save();
        };
        let addPoint = ''
        canvas.ontouchmove = function (e) {
            if (painting) {
                let x = e.touches[0].clientX;
                let y = e.touches[0].clientY;
                let newPoint = {"x": x, "y": y};
                arrPoint = [x,y];
                addPoint = arrPoint;
                ctx.lineCap = "round";
                ctx.lineJoin = "round";
                if(text == false){
                    StorkeType('appendToCurrentPath',arrPoint,type)
                }
            }
            event.preventDefault();
        };

        canvas.ontouchend = function (e) {
            getMessage('addPath',alpha,canvas.height,canvas.width,color,1,addPoint,eraserSize,paintSize,'','','','');
            painting = false;
        }
    } else {
        canvas.onmousedown = function (e) {
            painting = true;
            let startX = e.clientX;
            let startY = e.clientY;
            lastPoint = {"x": startX, "y": startY};
            arrPoint=[startX,startY];
            if(text){
                textIn.style.display='block'
                if(textIn.value ==''){
                    textIn.style.left = startX +'px';
                    textIn.style.top = startY +'px';  
                }
                var main = textIn.value;
                arrPoint=[startX,startY];
                getMessage('changeCurrentPath',alpha,canvas.height,canvas.width,color,1,arrPoint,eraserSize,paintSize,'',main,6,'');
            }else{
                textIn.style.display='none';
                StorkeType('changeCurrentPath',arrPoint,type);
            }
            textIn.value = ''
            ctx.save();
        };
        let addPoint = ''
        canvas.onmousemove = function (e) {
            if (painting) {
                let x = e.clientX;
                let y = e.clientY;
                let newPoint = {"x": x, "y": y};
                arrPoint = [x,y];
                addPoint = arrPoint;
                ctx.lineCap = "round";
                ctx.lineJoin = "round";
                if(text == false){
                    StorkeType('appendToCurrentPath',arrPoint,type)
                }
            }
        };
        canvas.onmouseup = function () {
            getMessage('addPath',alpha,canvas.height,canvas.width,color,1,addPoint,eraserSize,paintSize,'','','','');
            painting = false;
        };
        canvas.mouseleave = function () {
            painting = false;
        }
    }
}
function StorkeType(action,arrPoint,type){
    switch(type)
    {
        case 1:
        getMessage(action,alpha,canvas.height,canvas.width,color,1,arrPoint,eraserSize,paintSize,'','',type,'');
        break;
        case 2:
        getMessage(action,alpha,canvas.height,canvas.width,color,1,arrPoint,eraserSize,paintSize,'','',type,'');
        break;
        case 3:
        getMessage(action,alpha,canvas.height,canvas.width,color,1,arrPoint,eraserSize,paintSize,'','',type,'');
        break;
        case 4:
        getMessage(action,alpha,canvas.height,canvas.width,color,1,arrPoint,eraserSize,paintSize,'','',type,'');
        break;
        case 5:
        getMessage(action,alpha,canvas.height,canvas.width,color,1,arrPoint,eraserSize,paintSize,'','',type,'');
        break;
    }
}
function getMessage(action,alpha,canvasHeight,canvasWidth,color,editMode,endPoint,eraserSize,paintSize,startPoint,text,type,canvasData){
    var message = {"action":action,
                    "alpha":alpha,
                    "canvasHeight":canvasHeight,
                    "canvasWidth":canvasWidth,
                    "color":color,
                    "editMode":editMode,
                    "endPoint":endPoint,
                    "eraserSize":eraserSize,
                    "paintSize":paintSize,
                    "startPoint":startPoint,
                    "text":text,
                    "type":type,
                    "canvasData":canvasData
                }
        sendDrow(message);
}
function sendDrow(message){
    var temp = {
        "type":"TxtMsg",
        "platform":"web",
        'groupId':groupId,
        'from':'132465',
        'to':'all',
        "message":message,
        "time":currentdate,
        "extras":"扩展消息"
    };
    var tempMes = JSON.stringify(temp);        
    if(role == "teacher"){
        ws.send(tempMes);
    }else if(role == "student"){

    }
    arrPoint = [];
}
window.classMethods =classMethods;
function classMethods(obj){
    var id = obj.getAttribute("id");
    switch(id)
    {
        case "eraser":
            type = 1;
            text = false;
            textIn.style.display='none';
            break;
        case "brush":
            text = false;
            type = 2;
            textIn.style.display='none';
            break;
        case "textare":
            text = true;
            break;
        case "line":
            text = false;
            type = 3;
            textIn.style.display='none';
            break;
        case "acal":
            text = false;
            type = 4;
            textIn.style.display='none';
            break;
        case "rect":
            text = false;
            type = 5;
            textIn.style.display='none';
            break;
        case "clear":
            getMessage('clear',alpha,canvas.height,canvas.width,color,1,'',eraserSize,paintSize,'','','','');
            textIn.style.display='none';
            break;
        case "undo":
            getMessage('undo',alpha,canvas.height,canvas.width,color,1,'',eraserSize,paintSize,'','','','');
            textIn.style.display='none';
            break;
        case "redo":
            getMessage('redo',alpha,canvas.height,canvas.width,color,1,'',eraserSize,paintSize,'','','','');
            textIn.style.display='none';
            break;
        case "save":
            getMessage('save',alpha,canvas.height,canvas.width,color,1,'',eraserSize,paintSize,'','','','');
            textIn.style.display='none';
            break;
        case "photo":
            var input = document.getElementById('upload');
            input.onchange =function(e){
                var dom =document.getElementById('upload')[0];
                var reader = new FileReader();
                reader.onload = (function (file) {
                    return function (e) {
                        getMessage('picture',alpha,canvas.height,canvas.width,color,1,'',eraserSize,paintSize,'','','',this.result.substring(22));
                    };
            })(e.target.files[0]);
                reader.readAsDataURL(e.target.files[0]);
            }
            textIn.style.display='none';
            break;
    }
}

function drawCircle(x, y, radius) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}
range.onchange = function(){
    paintSize = this.value;
};

erserRange.onchange = function(){
    eraserSize = this.value;
};
rangeAlpha.onchange = function(){
    alpha = this.value;
};
function getColor(){
    for (let i = 0; i < aColorBtn.length; i++) {
        aColorBtn[i].onclick = function () {
            for (let i = 0; i < aColorBtn.length; i++) {
                aColorBtn[i].classList.remove("active");
                this.classList.add("active");
                color = this.getAttribute("id");
            }
        }
    }
}   
var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;  
String.prototype.colorRgb = function(alpha){  
    var sColor = this.toLowerCase();  
    if(sColor && reg.test(sColor)){  
        if(sColor.length === 4){  
            var sColorNew = "#";  
            for(var i=1; i<4; i+=1){  
                sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));     
            }  
            sColor = sColorNew;  
        }   
        var sColorChange = [];  
        for(var i=1; i<7; i+=2){  
            sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));    
        } 
        return "rgba(" + sColorChange.join(",") + ","+alpha+")"; 
    }else{  
        return sColor;    
    }  
};