/*****头部*********/
// 鼠标经过购物车
$(".shopping").hover(function () {
    $(".cars").stop().slideDown()
    $(this).css("background-color", "white")
}, function () {
    $(".cars").stop().slideUp();
    $(this).css("background-color", "rgba(85, 85, 85, 0.3)")
});


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
let imgPhotoObj = $$('.shopping-img-l>a>img');
let cartStyleP = $$('#cart-style>p');
let cartStylePSpan = $$("#cart-style>p>span");
let shoppingBorder = $$('#shopping-border');
let shoppingH2 = $$(".shopping-img-r>h2");
let shoppingP = $$(".shopping-img-r>p")
let shoppingH3 = $$(".shopping-img-r>h3");
let shoppingBtn = $$(".shopping-img-r>button");
let shoppingType = document.querySelectorAll('.shopping-img-r-type');
// console.log(shoppingImgR);
// console.log(shoppingType);
shoppingBorder.onclick = function (eve) {
    // console.log(shoppingBorder.children[0].children[0]);
    // console.log(eve.target);
    // eve.target.classList.add('shoppingImg-border');
    for (let j = 0; j < 3; j++) {
        if (eve.target == shoppingBorder.children[j].children[0]) {
            eve.target.classList.add('shoppingImg-border');
            shoppingBorder.children[j].children[1].classList.remove('shoppingImg-border');
        };
        if (eve.target == shoppingBorder.children[j].children[1]) {
            eve.target.classList.add('shoppingImg-border');
            shoppingBorder.children[j].children[0].classList.remove('shoppingImg-border');
        };
    }

}

// console.log(shoppingType[1].children[1]);
// console.log(shoppingType);
// console.log(imgPhotoObj);
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
// console.log(pValueArrIdUrl[1]);
// console.log(pValueArrIdOrder[1]);
axios.get(`./json/${pValueArrIdUrl[1]}${pValueArrIdOrder[1]}.json`).then(data => {
    // console.log(JSON.parse(data));
    JSON.parse(data).forEach(function (v) {
        if (v.id == pValueArrId[1]) {
            // console.log(v.type);
            let type = v.type.split('?');
            // console.log(type);
            // console.log(type.length);
            for (let j = 0; j < type.length; j++) {
                type[j] = type[j].split('=');
                // console.log(type[j][1]);
                // console.log(shoppingType[j].children[1]);
                shoppingType[j].children[0].innerHTML = type[j][0];
                shoppingType[j].children[1].innerHTML = type[j][1];
            }
            imgPhotoObj.src = v.shoppingImg
            cartStyleP.innerHTML = v.name;
            // console.log(cartStylePSpan);
            // console.log(v.intrduce);
            shoppingH2.innerHTML = v.name;
            shoppingH3.innerHTML = `<span>总计:</span> ` + v.price;
            shoppingP.innerHTML = v.mesge1 + `<span>${v.mesge2}</span>`
            shoppingBtn.innerHTML = `<a href="shoppingCar.html" onclick="addCart('${v.id}','${v.name}','${v.src}','${v.price}',1)">加入购物车</a>`
        }
    });
});
// 点击加入购物车 然后跳转到购物车
function addCart(id, name, src, price, num) {
    // console.log(12);
    //1 获取购物车数据
    let cartGoods = localStorage.getItem('cart')
    // 2 判断购物车是否为空
    if (cartGoods) { // 3 不为空
        cartGoods = JSON.parse(cartGoods);
        // console.log(cartGoods);
        // 3-1 判断商品是否存在
        let exists = false;
        cartGoods.forEach(v => {
            // console.log(v);
            if (v.id == id) {
                // 存在则增加数量
                // num += v.num;
                v.num = v.num - 0 + (num - 0)
                exists = true;
            }
        })
        // console.log(cartGoods);
        // 4-1不存在则添加商品数据
        if (!exists) {
            cartGoods.push({
                id,
                name,
                src,
                price,
                num
            })
        }

        // 5 存入local
        localStorage.setItem('cart', JSON.stringify(cartGoods))




    } else { // 4 为空
        // 4-1 以数组的形式保存         {id:1,name:''}  [id,name,src]

        let tmpGoods = {
            id,
            name,
            src,
            price,
            num
        };
        let goodsArr = [tmpGoods];

        // console.log(JSON.stringify(goodsArr));
        localStorage.setItem('cart', JSON.stringify(goodsArr))

    }
}