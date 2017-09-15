//封装运动函数
// var time=null;
// var alpha=30;
//attr, iTatget  startMove(obj,{attr1:iTarget1,attr2:iTarget2},fn)
function startMove(obj, json, fn) {
    var flag = true; //假设所有运动都到达了目标值
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        //取当前值
        for (var attr in json) {
            var incur = 0;
            if (attr == "opacity") {
                incur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
            } else {
                incur = parseInt(getStyle(obj, attr));
            }
            //算速度
            var speed = (json[attr] - incur) / 8;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            //检测停止

            if (incur != json[attr]) {
                flag = false;
            }else{
                flag=true;
            }
            if (attr == "opacity") {
                obj.style.filter = 'alpha(opacity:' + (incur + speed) + ')';
                obj.style.opacity = (incur + speed) / 100;
            } else {
                obj.style[attr] = incur + speed + "px";
            }
            if (flag) {
                clearInterval(obj.timer);
                if (fn) {
                    fn();
                }
            }
        }
    }, 30);

}

function getStyle(obj, attr) {
    if (obj.currentStyle) { //ie
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj, false)[attr]; //firefox
    }

}
