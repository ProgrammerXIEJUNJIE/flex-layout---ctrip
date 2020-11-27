window.onload = function () {
    //1获取元素
    var focus = document.querySelector('.focus');
    var ul = focus.children[0];
    var ol = focus.children[1]
    //获取focus的宽度
    var w = focus.offsetWidth;
    //利用定时器自动轮播图片
    var index = 0;
    var timer = setInterval(function () {
        index++;
        var translateX = -index * w
        ul.style.transition = 'all .3s'
        ul.style.transform = 'translateX(' + translateX + 'px)'
    }, 3000);
    //过渡完之后执行无缝滚动 监听过渡事件
    ul.addEventListener('transitionend', function () {
        //无缝滚动
        if (index >= 5) {
            index = 0;
            ul.style.transition = 'none';
            var translateX = -index * w;
            ul.style.transform = 'translateX(' + translateX + 'px)'
        } else if (index < 0) {
            index = 4
            ul.style.transition = 'none';
            var translateX = -index * w;
            ul.style.transform = 'translateX(' + translateX + 'px)'
        }
        //小圆点跟随变化
        //把ol里面li带有的current类名的选出来去掉类名 remove
        ol.querySelector('li.curent').classList.remove('curent')
        //让当前索引号的li加上current类 add
        ol.children[index].classList.add('curent')

    })
    //手指滑动轮播图
    //触摸元素 touchstart:获取手指初始坐标
    var startX = 0;
    var moveX = 0;
    var flag = false;
    ul.addEventListener('touchstart', function (e) {
        startX = e.targetTouches[0].pageX;
        clearInterval(timer);
    })
    //移动手指 touchmove:计算手指的滑动距离，
    ul.addEventListener('touchmove', function (e) {
        //计算移动的距离
        moveX = e.targetTouches[0].pageX - startX
        var translateX = -index * w + moveX;
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translateX + 'px)'
        flag = true //如果用户手指移动过才做判断 没有则不做判断
        e.preventDefault(); //阻止滚动屏幕的行为
    })
    //手指离开 根据移动的距离是回弹还是播放上一张和下一张
    ul.addEventListener('touchend', function (e) {
       if(flag){
            //如果移动距离大于50px我们就播放上一张或者下一张
        if (Math.abs(moveX) > 50) {
            //如果是右滑 播放的是上一张 moveX 是正值
            if (moveX > 0) {
                index--;
            } else {
                //如果是左滑 播放的是下一张 moveX 是负值
                index++;
            }
            var translateX = -index * w;
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX(' + translateX + 'px)';
        }else{
            var translateX = -index * w;
            ul.style.transition = 'all .1s';
            ul.style.transform = 'translateX(' + translateX + 'px)';
        }
    }
        //手指离开时重新启动定时器
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            var translateX = -index * w;
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX(' + translateX + 'px)';
        }, 3000);
    })

    //回到顶部
    var backTop = document.querySelector('.backTop');
    var nav = document.querySelector('nav')
    window.addEventListener('scroll', function(){
        if(window.pageYOffset >= nav.offsetTop){
            backTop.style.display = 'block';
        }else{
            backTop.style.display = 'none';
        }
    })
    backTop.addEventListener('click',function(){
        window.scroll(0,0)
    })
}