/**
 * 自己的js脚本
 * Created by Deng on 2017/8/4.
 */
'use strict';

$(function(){
    // 当文档加载完成才会执行

    /*
    * 根据屏幕宽度的变化决定轮播图片应该展示什么
    * @return {[type]}[description]
    * */
    function resize(){
        // 获取屏幕的宽度
        var windowWidth = $(window).width();
        // 判断屏幕属于大还是小
        var isSmallScreen = windowWidth < 768;
        // 根据大小为界面上的一张轮播图设置背景
        // $('#main_ad > .carousel-inner > .item') // 获取到的是DOM数组（多个元素）
        $('#main_ad > .carousel-inner > .item').each(function (i, item) {
            // 因为拿到是DOM对象 需要转换
            var $item = $(item);
            // var imgSrc = $item.data(isSmallScreen ? 'image-xs' : 'image-lg');
            var imgSrc = isSmallScreen ? $item.data('image-xs') : $item.data('image-lg');

            //
            // $element.data()
            // 是一个函数，专门用于元素上的自定义属性（data-xxx）
            // 函数的参数是我们要取得属性名称（abc）


            // 设置背景图片
            $item.css('backgroundImage', 'url("'+ imgSrc +'")');
            //
            // 因为我们需要小图时 尺寸等比例变化，所以小图时我们使用img方式
            if(isSmallScreen){
                $item.html('<img src="' + imgSrc + '" alt="" />');
            }else{
                $item.empty();
            }
        });
    }
    // $(window).on('resize',resize);
    // // 让window对象立即触发一下resize
    // $(window).triggered('resize');
    $(window).on('resize',resize).trigger('resize');

    //  初始化toopltips插件
    $('[data-toggle="tooltip"]').tooltip();
    /**
     * 控制标签页的标签容器宽度
     */

    var $ulContainer = $('.nav-tabs');
//    获取所有子元素的宽度和
    var width = 30; // 因为原本UL上有padding-left
//    遍历子元素
    $ulContainer.children().each(function(index,element){
       // console.log(element.clientWidth)
       // console.log($(element).width());
        width += element.clientWidth;
    });
//    此时width等于所有LI的宽度的和
//    判断当前UL的宽度是否超出了屏幕，如果超出就显示横向滚动条
    if(width > $(window).width()){
        $ulContainer
            .css('width',width)
            .parent().css('overflow-x','scroll');
    }
//    a点击注册时间
    var $newTitle = $('.news-title');
    $('#news .nav-pills a').on('click', function(){
        //获取当前点击元素
        var $this = $(this);
        // 获取对应的title值
        var title = $this.data('title');
        // 将title设置到相应的位置
        $newTitle.text(title);
    });


    // 1.获取手指在轮播图元素上的一个滑动方向（左右）


    // 结束触摸一瞬间记录最后的手指所在坐标X
    // 比大小

    // 获取界面上的轮播图容器
    var $carousel = $('.carousel');
    var startX,endX;
    var offset = 50;
    // 注册滑动事件
    $carousel.on('touchstart',function(e){
        // 手指触摸开始时记录一下手指所在的坐标X
        startX= e.originalEvent.touches[0].clientX;
        // console.log(startX);
    });
    $carousel.on('touchmove',function(e){
        // 变量重复赋值
        endX=e.originalEvent.touches[0].clientX;
        // console.log(endX);
    });
    $carousel.on('touchend',function(e){
        // 结束触摸一瞬间记录最后的手指所在坐标x
        // 比大小
        console.log(endX);
        // 控制精度
        // 获取每次运动的距离，当距离大于一定值时认为是有方向变化
        var distance = Math.abs(startX - endX);
        if(distance>offset){
            // 有方向变化
            // console.log(startX > endX ? '左' : '右');
            // 2.根据获得到的方向选择上一张或者下一张
            //      - $('a').click();
            //      - 原生的carousel方法实现  http://v3.bootcss.com/javascript/#carousel-methods
            $(this).carousel(startX > endX ? 'next' : 'prev');

        }

    });

});