/*
* 所有异步动画效果的代码
* */

function AsyncAni(){
    let $screen = $('.screen'),
        $dialog = $('.dialogBox');


    //掀开幕布
    function openScreen(){
        let dfd = $.Deferred();
        $screen.css({
            'transition-timing-function':'linear',
            'transition-duration': '1s',
            '-webkit-transition-timing-function':'ease-out',
            '-webkit-transition-duration': '2s',
            'transform':'translateX(-'+$(this).width()+'px)'
        });

        setTimeout(function(){
            dfd.resolve();
        },1000);
        return dfd;
    }

    //拉上幕布
    function closeScreen(){
        let dfd = $.Deferred();
        $screen.css({
            width:'100%'
        });

        setTimeout(function(){
            dfd.resolve();
        },1000);
        return dfd;
    }

    //显示分栏内容
    function showCon_col(){
        let dfd = $.Deferred();
        $('.mainCon_col').css({
            opacity:1
        });

        setTimeout(function(){
            dfd.resolve();
        },1000);
        return dfd;
    }

    //取消分栏的边角半径
    function clearRadius(){
        let dfd = $.Deferred();
        $('.mainCon_col_icon,.mainCon_col').css({
            'transition-property':'all',
            'transition-duration': '1s',
            '-webkit-transition-property':'all',
            '-webkit-transition-duration': '1s',
            'border-radius':'0',
        });

        setTimeout(function(){
            dfd.resolve();
        },1000);
        return dfd;
    }

    //展开每一栏
    function unfold(){
        let dfd = $.Deferred();
        $('.mainCon_col').css({
            'transition-property':'all',
            'transition-duration': '1s',
            '-webkit-transition-property':'all',
            '-webkit-transition-duration': '1s',
            'border-radius':'0',
            height:130,
        });
        $('.mainCon_col_info').css({
            'transition-property':'all',
            'transition-duration': '1s',
            '-webkit-transition-property':'all',
            '-webkit-transition-duration': '1s',
            'border-top':'1px solid white'
        });
        setTimeout(function(){
            dfd.resolve();
        },1000);
        return dfd;
    }

    //隐藏对话框
    function hideDialog(){
        let dfd = $.Deferred();
        $dialog.css({
            'transition-property':'all',
            'transition-duration': '0.6s',
            '-webkit-transition-property':'all',
            '-webkit-transition-duration': '0.6s',
            'width':0,
            'height':0
        });
        setTimeout(function(){
            dfd.resolve();
        },600);
        return dfd;
    }

    //显示对话框
    function showDialog(){
        let dfd = $.Deferred();
        $dialog.css({
            'transition-property':'all',
            'transition-duration': '0.6s',
            '-webkit-transition-property':'all',
            '-webkit-transition-duration': '0.6s',
            'width':300,
            'height':175
        });
        setTimeout(function(){
            dfd.resolve();
        },600);
        return dfd;
    }


    //第一页的异步动画
    function pageA_ani(){
        openScreen()
            .then(function () {
                return showCon_col();
            })
            .then(function(){
                return clearRadius();
            })
            .then(function(){
                return unfold();
            });

    }

    //第二页的异步动画
    function pageB_ani(){
        $('.skillCon').addClass('runIntoPage');

    }


    //重置第一页的画面
    function resetPageA(){


    }

    //重置第二页的画面
    function resetPageB(){


    }

    return {
        actionPageA:pageA_ani,
        actionPageB:pageB_ani,
        hideDialog,
        showDialog

    }

}

