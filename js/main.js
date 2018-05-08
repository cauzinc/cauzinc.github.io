
$(document).ready(function () {
    let container = $('#container'),
        nav = $('.navBox'),
        visualWidth = container.width(),
        visualHeight = container.height(),
        AniController = AsyncAni(),     //执行异步动画的对象
        swipe = Swipe(container,{
            dialogConDom:$('.contact'),
            AniController:AniController
        }),   //取得封装页面切换功能的对象，由于页面切换的CSS在这个函数中进行，必须在代码的开头调用
        date = new Date();      //取得一个时间，作为判断点击按钮间隔的计数

    initial({
        containerDom:container,
        dialogBoxDom:$('.dialogBox'),
        dialogCanDom:$('.dialogCan').get(0),
        proPhotoDom:$('.profilePhoto'),
        skillGraphDom:$('.skillGraph').get(0),
        skillListDom:$('.skillList')
    });

    ////////////////
    //页面切换效果//
    ////////////////

    /**
    * 增加页面切换的自定义事件
    * 自定义事件加强了程序的语义化，同时减少了页面滚动时触发的行为和滚动行为之间的耦合
    * 但是另一方面，却加深了swipe组件和eventTarget组件之间的耦合；如果将页面切换行为从swipe组件中切割出来，可以减少这种耦合，但是会降低程序的语义化和易读性
    */
    let eventTarget = new EventTarget();
    eventTarget.addHandler('onpageSwitch',swipe.switchNavCol);
    eventTarget.addHandler('onpageSwitch',swipe.switchContext);

    //根据页面不同，传入不同的参数
    function handleSwitchEvent(index){
        switch(index){
            case 0:
                eventTarget.fire({type:'onpageSwitch',navDom: nav,default:true});
                break;
            case 1:
                eventTarget.fire({ type:'onpageSwitch',navDom: nav,firstLine:'不积跬步',secondLine:'无以至千里'});
                break;
            case 2:
                eventTarget.fire({ type:'onpageSwitch',navDom: nav,firstLine:'不积小流',secondLine:'无以成江海'});
                break;
            case 3:
                eventTarget.fire({ type:'onpageSwitch',navDom: nav,firstLine:'尚未上线',secondLine:'敬请期待！'});
                break;
        }
    }



    //点击导航栏切换页面
    nav.on('click',function(event){
        let e = event || window.event,
            index = $(e.target).index();

        if(swipe.getIdx() !== index){
            swipe.setIdx(index);
            swipe.scrollTo(visualHeight*index,1000);
            handleSwitchEvent(index);
        }
    });

    //增加滚轮事件，firefox和chorm/ie/safiri浏览器的滚轮事件名不同，要注意
    $(document).on('mousewheel DOMMouseScroll',function(event){
        let e = event||window.event,
            dir = true,
            index = nav.find('.active').index();

        //对滚轮的正负方向进行判断，火狐浏览器和其他浏览器滚轮方向不同，而且滚动的变量名也不同
        if(e.originalEvent.wheelDelta){
            dir = e.originalEvent.wheelDelta<0;
        }else if(e.originalEvent.detail){
            dir = e.originalEvent.detail>0;
        }
        if(new Date() - date > 600 && dir){
            if( index !== 3){
                swipe.nextPage(500);
                index = nav.find('.active').index();
                index++;
                handleSwitchEvent(index);
                date = new Date();
            }
        }else if(new Date() - date > 300 && !dir){
            if( index !== 0){
                swipe.lastPage(500);
                index = nav.find('.active').index();
                index--;
                handleSwitchEvent(index);
                date = new Date();
            }
        }
    });

    ///////////////////
    //技能列表点击事件//
    ///////////////////
    let skillItems = $('.skillList').find('li');

    for(let i=0; i<skillItems.length; i++){
        let show = false;

        skillItems.eq(i).on('click',function(){
            show = !show;
            show ? $(this).find('dl').show(): $(this).find('dl').hide();
        });
    }

    /////////////////////
    //进行动画测试的按钮//
    /////////////////////
  /*  $('button:first').click(function () {

        eventTarget.fire({ type:'onpageSwitch',firstLine:'不积跬步',secondLine:'无以至千里'})
    });
*/
    AniController.actionPageA();

});



