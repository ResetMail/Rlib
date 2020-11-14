/*封装*/
function RfullScroll() {
    var RfullScrollView = $('#RfullScroll');
    var switchTime = 10000;//防抖时间
    var switchTime = RfullScrollView.attr('Rspeed');//防抖时间
    var Rposition = "top";
    var Rposition = RfullScrollView.attr('Rposition');
    var aniTime;
    var Rsection = $('.Rsection');//单屏集合
    var duration = 300;//滚动后摇
    var curIndex = 0;//当前屏标

    console.log(Rsection)

    /*取消滚轮对鼠标的控制*/
    document.addEventListener('mousewheel',function (evt,delta) {
        evt.preventDefault();
        // evt.stopImmediatePropagation();
    },{ passive: false })
    /*取消滚轮对鼠标的控制*/

    /*监听鼠标滚动*/
    function init(){
        if (document.addEventListener) {
            document.addEventListener('DOMMouseScroll', Rscroll, false);
        }//W3C
        window.onmousewheel = document.onmousewheel = Rscroll;//IE/Opera/Chrome
    }
    /*监听鼠标滚动*/

    var Rscroll = function(e) {
        //如果动画还没执行完，则return
        if(new Date().getTime() < aniTime + duration){
            return;
        }
        e.preventDefault();
        e = e || window.event;
        var t = 0;
        if (e.wheelDelta) {//IE/Opera/Chrome
            t = e.wheelDelta;
            
            console.log(curIndex);
            if (t > 0 && curIndex > 0) {//上滚动
                
                // beforeSwitch();
                movePrev();
                // afterSwitch();
                console.log(curIndex);

            } else if (t < 0 && curIndex < Rsection.length - 1) {//下滚动
                
                // beforeSwitch();
                moveNext();
                // afterSwitch();
                console.log(curIndex);

            }
        } 
        else if (e.detail) {//Firefox
            t = e.detail;
            if (t < 0 && curIndex > 0) {//上滚动

                // beforeSwitch();
                movePrev();
                // afterSwitch();

            } else if (t > 0 && curIndex < Rsection.length - 1) {//下滚动
                
                // beforeSwitch();
                moveNext();
                // afterSwitch();

            }
        }

    }

    /*上移动*/
    function movePrev() {
        aniTime = new Date().getTime();
        curIndex--;
        var scrollH = $($(".Rsection")[curIndex]).offset().top;

        /* 设置位置 */
        if(Rposition == "bottom"){
            scrollH = $($(".Rsection")[curIndex]).offset().top - $(window).height() + $($(".Rsection")[curIndex]).height();
        }
        /* 设置位置 */

        $("html,body").animate({scrollTop:scrollH},switchTime);
        
        
    }

    /*下移动*/
    function moveNext() {
        aniTime = new Date().getTime();
        curIndex++;
        var scrollH = $($(".Rsection")[curIndex]).offset().top;

        /* 设置位置 */
        if(Rposition == "bottom"){
            scrollH = $($(".Rsection")[curIndex]).offset().top - $(window).height() + $($(".Rsection")[curIndex]).height();
        }
        /* 设置位置 */
        
        $("html,body").animate({scrollTop:scrollH},switchTime);
        
    }

    init();
}
/*封装*/

/*运行*/
RfullScroll()