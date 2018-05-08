
//回调函数，重新调用自身，但是此时注意，第四个参数不可以直接调用animate，因为animate函数中调用fn时，并没有带上任何参数

function animate(dom,target,attr,fn){
    clearInterval(dom.timer);
    dom.timer = setInterval(function(){
        var domAttr = parseFloat(getAttr(dom,attr));
        var speed = (target - domAttr)/10;
        console.log(speed);
        if(attr == "opacity"){
            domAttr *= 100;
        }

        if(target>domAttr){
            speed = Math.ceil(speed);
        }else{
            speed = Math.floor(speed);
        }
        if(target == domAttr){
            clearInterval(dom.timer);
            //进行判断，当没有第四个参数，即不需要回调函数时，则不执行
            if(fn){
                //当重复调用时，this的指向会改变，因此要在dom的作用域下调用fn函数才不会出错
                fn.call(dom);
            }
        }else{
            if(attr=="opacity"){
                dom.style[attr] = (domAttr + speed)/100;
                dom.style.filter = "alpha(opacity:"+(domAttr + speed)+");"
            }else{
                dom.style[attr] = domAttr + speed +"px";
            }
        }
    },30);
}

function getAttr(dom,attr){
    if(dom.currentStyle){
        return dom.currentStyle[attr];
    }else{
        return getComputedStyle(dom,null)[attr];
    }
}
