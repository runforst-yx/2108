// 1 获取左边图片的节点 绑定滚动条事件
let imgL = document.querySelector('.img-left');
// console.log(imgL);
// window.onscroll = function () {
//     let Y = document.documentElement.scrollTop;
//     console.log(Y);
// }
imgL.style.height = window.innerHeight + 'px';
window.onresize = function () {
    let Y = window.innerHeight;
    // console.log(Y);
    // 把改变的高度值给赋值给左边div
    // console.log(imgL);
    imgL.style.height = Y + 'px';
}

// 登录判定
let userName = $$(".user");
let inpUserObj = $$('.inp-user');
let inpPwdObj = $$('.inp-pwd');
let btnObj = $$('.btn');

btnObj.onclick = function () {
    let userVal = userName.value;
    let telVal = inpUserObj.value;
    let pwdVal = inpPwdObj.value;
    // console.log(userVal);
    // console.log(telVal);
    // console.log(pwdVal);
    // console.log(12);
    //     // 从本地服务器取值 遍历是否一样  一样登陆成功 否则失败
    //     // 取值
    if (userVal && telVal && pwdVal) {
        axios.post('./php/login.php',{
            user: `${userVal}`,
            tel: `${telVal}`,
            pwd: `${pwdVal}`
        }).then(data => {
            // console.log(data);
            if(data==1){
                layer.confirm('登录成功', {
                    btn: ['跳转主页面'] //按钮
                }, function () {
                    window.location.href = `index.html?user=${userVal}`;
                });
            }
            if(data==2){
                layer.confirm('此账号未被注册', {
                    btn: ['点击注册'] //按钮
                }, function () {
                    window.location.href = `register.html?`;
                });
            }
        })

    }


    //     // if (inpUserObj.value && inpPwdObj.value) location.href = `index.html?${userName.value }`;
}
// console.log(inpPwdObj);


function $$(tag) {
    return document.querySelector(tag)
}