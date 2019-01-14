
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
    painting = false;
};
canvas.mouseleave = function () {
    painting = false;
}