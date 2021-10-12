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

// 注册判定
let registerObj = $$('.img-right-b-register');

registerObj = registerObj.children
// console.log(registerObj[0]);
// console.log(registerObj.length);
let userObj = $$('.user')
let inpTelObj = $$('.inp-tel');
let inpPwdObj = $$('.inp-pwd');
let inpSexObj = document.querySelectorAll('.inp-sex');
let inpAgeObj = $$('.inp-age');
let btnObj = $$('.btn');
let userVal = '';
let telVal = '';
let pwdVal = '';
let ageVal = '';
let sexVal = '';
// 用户名失去焦点的时候判定输入值是否为邮箱或者手机号
for (let i = 1; i < registerObj.length - 4; i++) {
    // console.log(registerObj[i]);
    registerObj[i].onblur = function (eve) {
        // console.log(eve.target);
        if (eve.target == userObj) {
            // console.log(13);
            // console.log(eve.target.value);
            userVal = eve.target.value
        }
        if (eve.target == inpTelObj) {
            // console.log(14);
            let regTel = /^1[3578]{1}\d{9}/;
            // 邮箱的规则:数字+字母，3~15位 @ 字母2~9位 . 字母2~3
            let regEmail = /^[a-z\d]{3,15}@[a-z0-9]{2,9}\.[a-z]{2,3}$/;
            // console.log(regTel.test(str)||regEmail.test(str)); 
            // 判定是否为true 如果不是弹出 错误
            if (!regTel.test(eve.target.value) && !regEmail.test(eve.target.value)) {
                // alert('你输入了错误的账号');
                layer.open({
                    content: '你输入了错误的邮箱或者手机号'
                });
            }
            telVal = eve.target.value;

        }
        if (eve.target == inpPwdObj) {
            // console.log(15);
            let regPwd = /\S{6,}/
            // console.log(regPwd.test(strPwd));
            if (!regPwd.test(eve.target.value)) {
                layer.open({
                    content: '密码不能少于6位数以及不能出现空白符'
                });
            }
            pwdVal = eve.target.value;
        }
        if (eve.target == inpAgeObj) {
            // console.log(16);
            let regPwd = /^[1-9]\d{1}/
            if (!regPwd.test(eve.target.value)) {
                layer.open({
                    content: '年龄必须为数字且不能以0开头'
                });
            }
            ageVal = eve.target.value;
        }
    }
}
btnObj.onclick = function () {
    // console.log(12);
    // console.log(userVal);
    // console.log(telVal);
    // console.log(pwdVal);
    // console.log(ageVal);
    // console.log( inpSexObj[0]);
    // console.log(inpSexObj[1]);
    inpSexObj[0].checked ? sexVal = inpSexObj[0].value : sexVal = inpSexObj[1].value;
    // console.log(sexVal);
    if (userVal && telVal && pwdVal && ageVal && sexVal) {
        // console.log(15);
        // AddRegister(userVal, telVal, pwdVal, ageVal, sexVal)
        // 传值给php 然后放入本地服务器  登陆的时候拿出来进行判定
        axios.post('./php/register.php', {
            user: `${userVal}`,
            tel: `${telVal}`,
            pwd: `${pwdVal}`,
            age: `${ageVal}`,
            sex: `${sexVal}`
        }).then(data => {
            // console.log(data);
            if (data == 1) {
                layer.open({
                    content: '此用户已被注册'
                });
            }
            if (data == 2) {
                // layer.open({
                //     content: '注册成功！！'
                // });
                layer.confirm('注册成功', {
                    btn: ['登录'] //按钮
                }, function () {
                    window.location.href = "login.html";
                });
            }
        })
    }

}

function $$(tag) {
    return document.querySelector(tag)
}