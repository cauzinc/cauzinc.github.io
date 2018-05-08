var ul = document.getElementById("ul"),
    lis = document.getElementsByTagName("li"),
    box = document.getElementById("box"),
    lbtn = document.getElementById("Lbtn"),
    rbtn = document.getElementById("Rbtn");

//还有一个问题，左键可以无限点击，但是右键必须等待效果执行完毕才可以继续点击

lbtn.onclick = function(){
    ul.insertBefore(ul.lastElementChild,lis[0]);
    ul.style.left = "-520px";
    animate(ul,0,"left");
};

rbtn.onclick = function(){
    animate(ul,-520,"left",function(){
        ul.appendChild(ul.firstElementChild);   //注意这里firstChild和firstElementChild是不同的，firstChild是text对象，不能直接拿走图片
        ul.style.left="0px";  //因为把往左拉的第一张图片重新放在最后了，因此将left的值重新设置为0
    });
};

box.onmouseover = function(){
    lbtn.style.display = "block";
    rbtn.style.display = "block";
};
box.onmouseout = function(){
    lbtn.style.display = "none";
    rbtn.style.display = "none";
};