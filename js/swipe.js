/*
*  封装用于控制页面滚动的方法
* [Swipe discription]
* @param    {[type]}  container   [页面容器节点]
* @param    {[type]}    options [传入的参数]
* */
function Swipe(container,options){
    let element = container.find(":first"),
        pages = element.find('>'),  //取得每个页面
        visualWidth = container.outerWidth(),     //容器的可视宽
        visualHeight = container.outerHeight(),   //容器的可视高
        swipe = {}, //要返回的对象
        idx = 0,    //记录当前页面的索引
        AniController = options.AniController;      //进行异步动画操作的对象


    //设置网页的总宽高
    element.css({
        width:visualWidth+'px',
        height:visualHeight*pages.length+'px'
    });

    //设置每个页面的宽高
    $.each(pages,function(index){
        pages.eq(index).css({
            width:visualWidth+'px',
            height:visualHeight+'px'
        })
    });

    //返回当前页面的索引
    function getPageIndex(){
        return idx;
    }

    //修改当前页面的索引
    function setPageIndex(index){
        idx = index;
    }

    //切换页面时，同时切换导航栏样式
    function switchNavCol(event){
        event.navDom.find('.active').removeClass('active');
        event.navDom.find('li').eq(swipe.getIdx()).addClass('active');
    }

    //页面进行滚动的函数
    function scrollTo(distance,speed,way){
        let movingWay = way || 'linear',
            runTime = speed || 2000;

        //使用动画的三种方式：1、css3的transition   2、animate()方法   3、transit插件

        element.css({
            'transition-timing-function': movingWay,
            'transition-duration':speed+'ms',
            //比起修改top属性，translate不会引起页面的重绘，性能更好
            'transform':'translateY(-'+distance+'px)'
        });

/*        element.animate({
            top:'-'+distance+'px'
        },speed,movingWay);*/

/*       element.transition({
           top:'-'+distance+'px'
       },runTime,movingWay);*/
    }

    //滚动到下一页
    function scrollToNextPage(runTime){
        if(idx < 3){
            idx++;
            swipe.scrollTo(visualHeight*idx,runTime);
        }
    }

    //滚动到上一页
    function scrollToLastPage(runTime){
        if(idx > 0){
            idx--;
            swipe.scrollTo(visualHeight*idx,runTime);
        }
    }

    //在页面跳转的时候，对对话框的内容进行修改
    let defaultCon = options.dialogConDom.html();
    function switchContext(event){
        AniController.hideDialog()
            .then(function(){
                if(event.default === true){
                    options.dialogConDom.html(defaultCon);
                }else{
                    options.dialogConDom.html("<p class='motto'>"+event.firstLine+"<br />"+event.secondLine+"</p>");
                }
                return AniController.showDialog();
            });
    }



    return swipe = {
        scrollTo,
        getIdx:getPageIndex,
        setIdx:setPageIndex,
        nextPage:scrollToNextPage,
        lastPage:scrollToLastPage,
        switchNavCol,
        switchContext
    };

}