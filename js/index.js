/*****头部*********/
// 鼠标经过购物车
$(".shopping").hover(function () {
    $(".shopping-select").stop().slideDown()
    // console.log($(".shopping-select"));
    $(this).css("background-color", "white")
    // console.log(12);
    // 获取购物车数据
    let cartG = localStorage.getItem('cart');
    // console.log(cartG);
    if (!cartG) {
        // console.log(12);
        let cars = document.querySelector('.shopping-select');
        cars.innerHTML = `<span class="cars-span">这里还什么都没有哦</span><ul class='cars-ul'>
                        
        </ul> `
    } else {
        let shopNum = document.querySelector('#shopNum');
        let cars = document.querySelector('.shopping-select');
        // 购物车有数据的话，先把购物车清空 然后遍历商品 添加进去
        cars.innerHTML = '';
        // console.log(13);
        // console.log(carsSpan);
        // carsSpan.innerHTML='';
        let html = '';
        let num = '';
        JSON.parse(cartG).forEach(data => {
            // console.log(data);
            num = num - 0 + data.num;
            html += `<li class="cars-ul-li">
            <img src="${data.src}" alt="" class="cars-ul-img">
            <span class="cars-ul-span">${data.name}</span>
            <span class="cars-ul-span1">${data.price}*${data.num}</span>
        </li>`

        });
        // console.log(html);
        shopNum.innerHTML = `(${num})`;
        cars.innerHTML = `<ul class="cars-ul">${html}</ul>`;
    }
}, function () {
    $(".shopping-select").stop().slideUp();
    $(this).css("background-color", "rgba(85, 85, 85, 0.3)")
});

/********登录界面*********/
let loginObj = $$('#login');
// console.log(loginObj);
// console.log(location.search);
// 判定 如果没有登录则给文字登录 如果登录了 获取登录网址后面附带的用户名然后赋值给a
let logUser = location.search;
if (logUser) {
    logUser = logUser.split('?');
    // console.log(logUser);
    // console.log(logUser[1]);
    logUser = logUser[1].split('=');
    // console.log(logUser[1]);
    logUser = logUser[1];
    // console.log(logUser);
    loginObj.innerHTML = decodeURIComponent(logUser);
    loginObj.href = '';
} else {
    loginObj.innerHTML = 'login';
}
// console.log(logUser);

// console.log(logUser[0]);


/********* 注册页面*********/
let registerObj = document.querySelector(".register");
// console.log(registerObj);
registerObj.onclick = function () {
    window.location.href = 'register.html';
}

/******导航栏*******/
// 鼠标经过li下拉菜单出现
$("#nav .nav-li").on({
    mouseover: function () {
        // 获取当前小li的索引号,然后找到对应索引号的盒子下拉
        var index = $(this).index()
        // console.log(index);
        $(".bigbox").eq(index).stop().slideDown("linear");
    },
    mouseout: function () {
        $(".bigbox").stop().slideUp();
    }
});
// 当鼠标移动到 .subnav 这个导航栏模块时移除 li 所有绑定的事件，鼠标离开重新给li 绑定事件
$('.bigbox').on({
    mouseover: function () {
        var index = $(this).index()
        $(".bigbox").eq(index).stop().slideDown();
    },
    mouseout: function () {
        $(".bigbox").stop().slideUp();
    }
})

/**********轮播***********/
// 1 获取节点 
let bannerUlObj = $$('.banner-screen-ul')
// console.log(bannerlObj);
let bannerLiObj = bannerUlObj.children;
// console.log(bannerLiObj[0]);
let bannerScreenObj = document.getElementById('banner-screen');
// console.log(bannerScreenObj);
let bannerImgW = bannerScreenObj.offsetWidth; //图片的宽度
// console.log(bannerImgW);
let bannerOlObj = $$('.banner-order');
//2 获取左右箭头
let bannerArr = $$('#banner-arr');
let bannerArrL = $$('#banner-arrleft');
let bannerArrR = $$('#banner-arrright');
let bannerIndex = 0;
// console.log(bannerArrR);
// console.log(bannerLiObj.length);
//  3 遍历创建li追加到ol中
for (let i = 0; i < bannerLiObj.length; i++) {
    // 2-1 创建新的节点
    let BannerNewLiobj = document.createElement('li');
    BannerNewLiobj.classList.add('bannerCurrent');
    //   2-4 追加到ol身上
    BannerNewLiobj.innerHTML = i;
    // console.log(BannerNewLiobj.innerHTML);
    // console.log(BannerNewLiobj);
    bannerOlObj.appendChild(BannerNewLiobj);
    // console.log(bannerLiObj.length);
    // 给li绑定点击事件 
    BannerNewLiobj.onclick = bannerClickFn;
};

// 点击小圆圈 
function bannerClickFn() {
    // console.log(this);
    // console.log($(this).index());
    let banIndex = $(this).index();
    // console.log(banIndex);
    let destination = -bannerImgW * banIndex;
    // console.log(destination);
    move(bannerUlObj, {
        left: destination
    });
}

//鼠标移入显示箭头 移出隐藏
bannerUlObj.parentNode.parentNode.onmouseover = function () {
    bannerArr.style.display = 'block';
    clearInterval(timess);
}
bannerUlObj.parentNode.onmouseout = function () {
    bannerArr.style.display = 'none';
    auto();
}
/***********箭头点击事件***********/
// 克隆第一张和最后一张图片图片
let bannerCloneImgF = bannerLiObj[0].cloneNode(true);
bannerUlObj.appendChild(bannerCloneImgF)
// console.log(bannerCloneImg);
// 右箭头事件

bannerArrR.onclick = function () {
    let bannerArrRWidth = '';
    let bannerStatus = false;
    // console.log(bannerStatus);
    // console.log(bannerLiObj.length);
    // console.log(bannerIndex);
    if (bannerIndex == bannerLiObj.length - 2) {
        bannerIndex++;
        bannerArrRWidth = bannerImgW * bannerIndex;
        // bannerUlObj.style.left = 0
        bannerIndex = 0;
        bannerStatus = true;
    } else {
        // 1 index增加
        bannerIndex++;
        bannerArrRWidth = bannerImgW * bannerIndex;
    }
    move(bannerUlObj, {
        left: -bannerArrRWidth
    }, function () {
        bannerStatus && (bannerUlObj.style.left = '0px');
    })
}

// 左箭头点击事件
bannerArrL.onclick = function () {
    // console.log(bannerIndex);
    bannerIndex--;
    // console.log(this);
    // console.log(bannerOlObj.children);
    // 判定是否为第一张
    if (bannerIndex == -1) {
        // 如果为第一张 点击过后跳转到最后一张
        bannerUlObj.style.left = -(bannerLiObj.length - 1) * bannerImgW + 'px';
        bannerIndex = bannerLiObj.length - 2;
        bannerStatusL = true;
    }
    let bannerArrLWidth = bannerImgW * bannerIndex;
    move(bannerUlObj, {
        left: -bannerArrLWidth
    })

}
/*****定时器,自动轮播******/
function auto() {
    timess = setInterval(() => {
        bannerArrR.onclick();
    }, 3000)
}
auto();

// move运动函数的封装
let onOff = true;
let times = '';

function move(ele, target, cb) {
    clearInterval(times);
    times = setInterval(function () {
        //  遍历运动的放心和目标
        for (let attr in target) {
            // console.log(attr);
            let tmpVal = parseInt(getPos(ele, attr));
            // console.log(ele);//ulObj
            // console.log(attr);//left
            // console.log(getPos(ele,attr));
            // console.log(tmpVal);
            // 计算speed
            let speed = (target[attr] - tmpVal) / 10;
            // console.log(tmpVal, attr);
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            // 当运动到目标 设置开关
            if (tmpVal == target[attr]) onOff = true;
            ele.style[attr] = tmpVal + speed + 'px';
        }
        // 判断开关的状态 清楚定时器
        for (let moveAttr in target) {
            // 如果不相等，就是有属性没有运动到位置，运动不能停
            if (target[moveAttr] !== parseInt(getPos(ele, moveAttr))) {
                onOff = false;
                break;
            }
        }
        if (onOff) {
            clearInterval(times);
            // console.log(cb);
            cb && cb();

        }
        //  console.log(222);
    }, 30)
}
// 获取元素的实时位置
function getPos(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj)[attr];
    }
}
// 封装获取节点函数 
function $$(tag) {
    return document.querySelector(tag);
}


/*********侧边栏***********/
// console.log(bannerShowObj);
$('.banner-select-ul>li').on('mouseenter', function () {

    var index = $(this).index();
    $('.banner-show').eq(index).css('display', 'block')

})

$('.banner-select-ul>li').on('mouseleave', function () {

    $('.banner-show').css('display', 'none')
})
// console.log($('.banner-select-ul>li'));
/************保障服务************/
// 添加类名给
// console.log(serverObj);
let serverObj = document.querySelectorAll('.server-r')
// console.log(serverObj.length);
for (let i = 0; i < serverObj.length; i++) {
    serverObj[i].onmouseover = function () {
        // console.log(this);
        this.classList.add('server-r-shadow');
    }
    serverObj[i].onmouseout = function () {
        this.classList.remove('server-r-shadow')
    }
}
/*******手机效果**********/
let phoneImgRLI = document.querySelectorAll('.phoneImg-r-li');
// console.log(phoneImgRLI);
let phoneImgL = $$('.phoneImg-l');
// console.log(phoneImgRLI);
// phoneImgL.onmouseenter = function () {
//     phoneImgL.classList.add('server-r-shadow');
// }
// phoneImgL.onmouseout = function () {
//     phoneImgL.classList.remove('server-r-shadow')
// }
// console.log(serverObj.length);