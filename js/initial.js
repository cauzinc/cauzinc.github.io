/*
* 用于进行页面初始化的方法
* [initial description]
* @param    {[type]}    options   [要使用的一系列页面节点元素]
* */

function initial(options){
    setContactLocation(options);        //动态设置对话框的位置
    drawDialog(options);                //画出对话框的位置，需要传入对话框的画布dom对象
    drawSkillGraph(options);            //画出技能表，需要传入技能表的画布dom对象
    fillSkillList(options);

    //动态设置对话框的位置
    function setContactLocation(options){
        let dialogBox = options.dialogBoxDom,
            proPhoto = options.proPhotoDom,
            pWidth = parseInt(proPhoto.css('width')),
            pLeft = parseInt(proPhoto.css('left')),
            pTop = parseInt(proPhoto.css('top'));
        dialogBox.css({
            left: pLeft+pWidth/2,
            top: pTop-parseInt(dialogBox.css('height'))
        });
    }

    //画出对话框的效果
    function drawDialog(options){
        let can = options.dialogCanDom,
            cvs = can.getContext('2d');

        can.width=300;
        can.height=175;

        cvs.lineTo(50,150);
        cvs.lineTo(0,170);
        cvs.lineTo(25,150);

        cvs.fillStyle = 'white';
        cvs.fill();
    }

    //画出圆形技能图，从圆心延伸出一条线，来摆放技能描述
    function drawSkillGraph(options){
        let can = options.skillGraphDom,
            cvs = can.getContext('2d'),
            pi = Math.PI,
            //画一条线，参数为起点坐标，重点坐标
            drawLine = function(startX,startY,endX,endY){
                cvs.beginPath();
                cvs.moveTo(startX,startY);
                cvs.lineTo(endX,endY);
                cvs.stroke();
            },
            //画每个技能圈的描述，参数为目标坐标，半径，填充文字,描述延伸方向(默认为左上)
            drawSkilldes = function(x,y,radius,context,dir){
                let skewValue = Math.floor(radius/(Math.sqrt(2))),          //计算延伸线目标坐标的偏移
                    lenOfText = context ? context.length * 8 : 0;        //计算文本要占据的像素值
                cvs.beginPath();
                cvs.font = '16px Arial';
                cvs.fillStyle = 'white';
                cvs.moveTo(x,y);
                switch (dir){
                    case "up_right":
                        cvs.lineTo( x+skewValue , y-skewValue );
                        cvs.lineTo( x+skewValue+lenOfText+10,y-skewValue);
                        cvs.fillText(context,x+skewValue+10,y-skewValue-5);
                        break;
                    case "down_right":
                        cvs.lineTo( x+skewValue , y+skewValue );
                        cvs.lineTo( x+skewValue+lenOfText+10,y+skewValue);
                        cvs.fillText(context,x+skewValue+10,y+skewValue-5);
                        break;
                    case "down_left":
                        cvs.lineTo( x-skewValue , y+skewValue );
                        cvs.lineTo( x-skewValue-lenOfText-10,y+skewValue);
                        cvs.fillText(context,x-skewValue-lenOfText-10,y+skewValue-5);
                        break;
                    default:
                        cvs.lineTo( x-skewValue , y-skewValue );
                        cvs.lineTo( x-skewValue-lenOfText-10,y-skewValue);
                        cvs.fillText(context,x-skewValue-lenOfText-10,y-skewValue-5);
                }
                cvs.stroke();
            },
            //画一个圆，参数为圆心，半径，填充颜色,填充文字,描述延伸方向(默认为左上)
            drawCircle = function(x,y,radius,color,context,dir){
                cvs.beginPath();
                cvs.fillStyle = color || 'white';
                cvs.arc(x,y,radius,0,2*Math.PI);
                cvs.fill();
                drawSkilldes(x,y,radius,context,dir);
            };

        can.width=800;
        can.height=600;

        //绘制文字
        cvs.font = 'bold 16px 黑体';
        cvs.fillStyle = 'white';
        cvs.fillText('掌握',5,410);
        cvs.fillText('熟练',5,260);
        cvs.fillText('精通',5,110);
        cvs.fillText('前端',235,570);
        cvs.fillText('后端',435,570);
        cvs.fillText('工具类',625,570);

        //将画布进行平移，变化坐标轴
        // cvs.scale(1,-1);     由于画布翻转会让文字也进行翻转，此处由于绘画量不大，不采用多层画布的方案
        cvs.translate(50,550);

        //画坐标轴
        cvs.strokeStyle = 'white';
        drawLine(0,0,0,-500);
        drawLine(0,0,700,0);
        for(let i=1; i<4; i++){
            drawLine(0,-i*150,20,-i*150);
        }
        for(let i=1; i<4; i++){
            drawLine(i*200,0,i*200,-20);
        }

        //html+css
        drawCircle(145,-390,35,'orange','html+css');
        //javascript
        drawCircle(250,-370,50,'#43cd80','javascript','up_right');
        //jQuery
        drawCircle(60,-340,25,'lightgreen','jQuery','down_right');
        //ajax
        drawCircle(260,-280,20,'red','ajax','down_right');
        //vue
        drawCircle(160,-270,38,'skyblue','vue','down_left');
        //php
        drawCircle(440,-180,30,'#ab82ff','php','down_right');
        //mysql
        drawCircle(360,-150,25,'#ffd700','mysql');
        //webpack
        drawCircle(560,-225,35,'#ccc','webpack');
        //git
        drawCircle(625,-200,20,'#ff00ff','git','down_right');
    }

    //动态加载技能列表
    function fillSkillList(options){
        let subs = '',
            data = [
                [
                    {title:'常用图片效果'},
                    {url:'links/1_picAction/jquery_推拉门/slidingDoor.html',title:'推拉门效果'},
                    {url:'links/1_picAction/jquery_图片切换/picSwitch.html',title:'图片切换'},
                    {url:'links/1_picAction/jquery_多张图片切换/multi_picSwitch.html',title:'多张图片切换'},
                    {url:'links/1_picAction/图片放大缩小3D切换/picSwitchwithFunction.html',title:'图片放大缩小切换'},
                    {url:'links/1_picAction/放大镜效果/instance_magnifier.html',title:'放大镜效果'},
                ],
                [
                    {title:'常见内容展示'},
                    {url:'links/2_showContent/jquery_无缝滚动/autoScroll.html',title:'无缝滚动'},
                    {url:'links/2_showContent/jquery_自定义滚动条/customScrollBar.html',title:'自定义滚动条'},
                    {url:'links/2_showContent/实例图片轮播/picSwitch.html',title:'图片轮播'},

                ],
                [
                    {title:'表单类'},
                    {url:'links/3_form/form_select.html',title:'三级联动'},
                    {url:'links/3_form/form_text.html',title:'表单验证'},
                ],
                [
                    {title:'其他练习'},
                    {url:'links/4_other/typeGame.html',title:'打字游戏'},
                    {url:'links/4_other/购物车/instance_cart.html',title:'购物车'}
                ]
            ];

        for(let i=0; i<data.length; i++){
            let items = data[i];
            for(let j=0; j<items.length; j++){
                let str = '';
                switch (j){
                    case 0:
                        str += '<li><h1><a href="javascript:;" title="'+items[j].title+'">'+items[j].title+'</a></h1><dl class="sub-dl">';
                        break;
                    case items.length-1:
                        str += '<dd><a href="'+items[j].url+'" target="_blank" title="'+items[j].title+'">'+items[j].title+'</a></dd></dl></li>';
                        break;
                    default:
                        str += '<dd><a href="'+items[j].url+'" target="_blank" title="'+items[j].title+'">'+items[j].title+'</a></dd>';
                }
                subs += str;
            }
        }
        options.skillListDom.html(subs);

    }


}