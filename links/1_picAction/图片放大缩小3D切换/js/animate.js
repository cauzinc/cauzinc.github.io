//传入的参数:
//dom   执行函数的节点对象
//target    发生改变的属性的目标值 ==>obj.k
//attr  要改变的属性  ==>k
//fn    回调的函数
//如果要进行同时运动，就要传入复数个属性；此时一个个传入属性会使函数臃肿，而且不能确定要传入多少个属性
//因此要将需要改变的函数封装为对象obj

//传入的参数:
//dom   执行函数的节点对象
//target    发生改变的属性的目标值 ==>obj[k]
//attr  要改变的属性  ==>k
//fn    回调的函数
//如果要进行同时运动，就要传入复数个属性；此时一个个传入属性会使函数臃肿，而且不能确定要传入多少个属性
//因此要将需要改变的函数封装为对象obj

function animate(dom,obj,fn){
    clearInterval(dom.timer);
    //for循环应当写在定时器的里面，如果把定时器卸载for循环里面，那么循环后最后的定时器会覆盖前面的，导致最后只有最后一个属性得到修改
    //ifSrtop用来判断是否停止定时器，只有当循环结束后，这个值依然为true时，才停止定时器

    dom.timer = setInterval(function(){
        var ifStop = true;
        for(var k in obj){
            var tarAttr = getAttr(dom,k);
            tarAttr = parseFloat(tarAttr);
            if(k == "opacity"){
                tarAttr*=100;
            }
            var speed = (obj[k]-tarAttr)/10;

            if(obj[k]!=tarAttr){
                ifStop = false;
            }

            if(tarAttr<obj[k]){
                speed = Math.ceil(speed);
            }else{
                speed = Math.floor(speed);
            }

            if(k == "opacity"){
                dom.style[k] = (tarAttr + speed)/100;
                dom.style.filter = "alpha(opacity:"+(tarAttr + speed)+")";
            }else{
                dom.style[k] = tarAttr + speed + "px";
            }
        }
        if(ifStop) {
            // alert("stop");
            clearInterval(dom.timer);
            if (fn) {
                fn.call(dom);
            }
        }
    },30);

}

//写一个函数来返回特定的属性的值，同时要做一下兼容，ie中取得属性值的方法是dom.currentStyle，非ie中的方法是getComputedStyle(dom,null)[attr]；
function getAttr(dom,attr){
    if(dom.currentStyle){
        return dom.currentStyle[attr];
    }else{
        return getComputedStyle(dom,null)[attr];
    }
    //注意，返回的不是数值，而是一个字符串，因此记得做一下数据类型转换。
}

