/*****头部*********/
// 鼠标经过购物车
$(".shopping").hover(function () {
    $(".cars").stop().slideDown()
    $(this).css("background-color", "white")
}, function () {
    $(".cars").stop().slideUp();
    $(this).css("background-color", "rgba(85, 85, 85, 0.3)")
});

/********登录界面*********/
let loginObj = $$('#login');
loginObj.innerHTML = 'login';

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
/****** 获取？后面的值*******/
// 获取图片的节点 拿到img的src获取 商品样式介绍
let imgPhotoObj = $$('#photo>a>img');
let cartStyleP = $$('#cart-style>p');
let cartStylePSpan = $$("#cart-style>p>span");
// console.log(imgPhotoObj);
let pValue = location.search;
// console.log(pValue);
// 转化为数组
let pValueArr = pValue.split("&");
// console.log(pValueArr);
let pValueArrId = pValueArr[0];
// console.log(pValueArrId);
let pValueArrIdOrder = pValueArr[1];
// console.log(pValueArrIdOrder);
let pValueArrIdUrl = pValueArr[2];
// console.log(pValueArrIdUrl);
// console.log(pValueArr[1]);
pValueArrId = pValueArrId.split('=');
pValueArrIdOrder = pValueArrIdOrder.split('=');
pValueArrIdUrl = pValueArrIdUrl.split('=');
// console.log(pValueArrIdUrl);
// console.log(pValueArrId[1]);
// console.log(pValueArrIdOrder[1]);
console.log(pValueArrIdUrl[1]);
console.log(pValueArrIdOrder[1]);
// 只需要其中的id order url
axios.get(`./json/${pValueArrIdUrl[1]}${pValueArrIdOrder[1]}.json`).then(data => {
    // console.log(JSON.parse(data));
    JSON.parse(data).forEach(function (v, i) {
        // console.log(pValueArrId[1]);
        // console.log(v);
        // console.log(v.src1);
        if (v.id == pValueArrId[1] && v.src1) {
            imgPhotoObj.src = v.src1;
            cartStyleP.innerHTML = v.name;
            // console.log(cartStylePSpan);
            // console.log(v.intrduce);
        }

    });
});
/*****点击立即购买跳转********/
let cartButton = $$("#cart-style>button");
//  console.log(cartButton);
// 点击事件
cartButton.onclick = function () {
    // console.log(12);
    window.location.href = `shopping.html?id=${pValueArrId[1]}&order=${pValueArrIdOrder[1]}&url=${pValueArrIdUrl[1]}`;
}