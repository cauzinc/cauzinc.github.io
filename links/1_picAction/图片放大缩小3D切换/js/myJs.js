

var btn2 = document.getElementById("btn2"),
    btn = document.getElementById("btn"),
    p1 = document.getElementById("p1"),
    p2 = document.getElementById("p2"),
    p3 = document.getElementById("p3"),
    p6 = document.getElementById("p6"),
    lis = document.getElementsByTagName("li"),
    oDiv = btn.getElementsByTagName("div");

var date = new Date();


/*
btn2.onclick = function(){
    p2.style.zIndex = 10;
    animate(p2,{
        "left":100,
        "top":0,
        "width":560,
        "height":420,
        "zIndex":10

    })
    animate(p1,{
        "left":0,
        "top":52,
        "width":420,
        "height":315,
        "zIndex":9
    })
}
*/

for(var i=0; i<oDiv.length; i++){
    oDiv[i].index = i;
    oDiv[i].onclick = function(){
        //每隔一秒以上才可以触发一次，每次触发都要重置一下date的时间
        if(new Date()-date >1000){
            fn(this.index);
            date = new Date();
        }
    }
}

function fn(idx){
    //把各项数据放入数组
    var arrW=[],arrH=[],arrL=[],arrT=[],arrZ=[],arrO=[];
    for(var i=0; i<lis.length; i++){
        arrW[i] = parseInt(getAttr(lis[i],"width"));
        arrH[i] = parseInt(getAttr(lis[i],"height"));
        arrL[i] = parseInt(getAttr(lis[i],"left"));
        arrT[i] = parseInt(getAttr(lis[i],"top"));
        arrZ[i] = parseInt(getAttr(lis[i],"zIndex"));
        arrO[i] = parseFloat(getAttr(lis[i].firstElementChild,"opacity"));
    }

    for(var i=0; i<lis.length; i++){
        //每次按下按钮，则根据按的按钮依次给每个图片新的属性
        if(idx === 1){
            //right button
            var index = i-1;
            if(index<0){
                index = 5;
            }

        }else{
            //left button
            var index = i+1;
            if(index>5){
                index = 0;
            }
        }

        lis[i].style.zIndex = arrZ[index];
        animate(lis[i].firstElementChild,{
            "opacity":arrO[index]*100
        })

        animate(lis[i],{
            "width":arrW[index],
            "height":arrH[index],
            "left":arrL[index],
            "top":arrT[index]
        })
    }


}









