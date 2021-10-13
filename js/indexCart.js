/**********主页面效果********/

// 遍历所有的tel
let telObj = document.querySelectorAll('#tel');
//  console.log(telObj[0]);
// 遍历 
telObj.forEach((m, n) => {
   // console.log(m,n);
   let telRObj = m.children;
   //  遍历文字两个 类名节点 phoneWord-r  
   let telRObjChild = telRObj[0].children;
   //  console.log(telRObjChild[1]);
   let telLObjChild = telRObj[1].children;
   telLObjChild = telLObjChild[0]
   // console.log(telLObjChild);
   let telUlObj = telRObj[2].children;
   telUlObj = telUlObj[0];
   let Url = "hot";
   telRObjChild[2].style.color = "orange";
   telRObjChild[2].style.borderBottom = "2px solid orange";

   // 侧边页面
   axios.get(`./json/mainL${n+1}.json`).then(data => {
      // console.log(data);
      // console.log(Url);
      let htmlUlLi = '';
      // 转换
      JSON.parse(data).forEach(function (v, i) {
         // console.log(v.src);
         htmlUlLi += `
         <li><a href="cart.html?id=${v.id}&order=${n-0+1}"><img src="${v.src}" alt=""></a></li>`;
      });
      //  console.log(htmlUlLi);
      telLObjChild.innerHTML = htmlUlLi;
   });
   //   主页面
   // 鼠标移入事件
   telRObj[0].onmouseover = function (eve) {
      // console.log(eve.target);
      // console.log(telRObjChild[1]);
      // console.log(telRObjChild[2]);
      //  获取phoneWord 节点 然后 使得 鼠标移入的时候 判定是哪一个 p 然后选择显示不同的数据 
      if (eve.target == telRObjChild[1]) {
         //  console.log(22);
         telRObjChild[1].style.color = "orange";
         telRObjChild[1].style.borderBottom = "2px solid orange";
         telRObjChild[2].style.color = "#333";
         telRObjChild[2].style.borderBottom = "none";
         Url = "main";
      }
      if (eve.target == telRObjChild[2]) {
         //  console.log(22);
         telRObjChild[1].style.color = "#333";
         telRObjChild[1].style.borderBottom = "none";
         telRObjChild[2].style.color = "orange";
         telRObjChild[2].style.borderBottom = "2px solid orange";
         Url = "hot";
      }
      axios.get(`./json/${Url}${n-0+1}.json`).then(data => {
         // console.log(Url);
         //  console.log(data);
         let htmlUlLi = '';
         // 转换
         JSON.parse(data).forEach(function (v, i) {
            // console.log(v,i);
            htmlUlLi += `<li class="tel-r-li"><a href="cart.html?id=${v.id}&order=${n-0+1}&url=${Url}" >
             <img src="${v.src}" alt="">
             <h3>${v.name}</h3>
             <p>${v.name}</p>
             <h4>${v.price}</h4>
         </a></li>`;
         });
         //  console.log(htmlUlLi);
         telUlObj.innerHTML = htmlUlLi;
      });

   };
   axios.get(`./json/${Url}${n+1}.json`).then(data => {
      // console.log(Url);
      let htmlUlLi = '';
      // 转换
      JSON.parse(data).forEach(function (v, i) {
         // console.log(v.id);
         // console.log(v,i);
         htmlUlLi += `<li class="tel-r-li">
        <a href="cart.html?id=${v.id}&order=${n-0+1}&url=${Url}" >
                   <img src="${v.src}" alt="">
                   <h3>${v.name}</h3>
                   <p>${v.name}</p>
                   <h4>${v.price}</h4>
               </a></li>`;
      });
      //  console.log(htmlUlLi);
      telUlObj.innerHTML = htmlUlLi;
   });
 

});

//  /*******侧边栏效果*************/&
//  遍历侧边栏所有隐藏div
let bannerSelectLi = document.querySelectorAll('.banner-select-ul-li');
// console.log(bannerSelectLi);
bannerSelectLi.forEach((v, j) => {
   //   console.log(v,i);
   //  console.log(j);
   let bannerShowUl = v.children[1];
   //   console.log(bannerShowUl);
   axios.get(`./json/aside${j+1}.json`).then(data => {
      // console.log(data);
      //  console.log(JSON.parse(data).length);
      // 一个ul里面放6个li
      // 看长度然后创建对应数量的ul
      let htmlUl = ''
      let num = parseInt((JSON.parse(data).length) / 6);
      //   console.log(num);
      for (let i = 0; i < num; i++) {
         htmlUl += `<ul class="banner-show-ul"></ul>`;
      }
      //   console.log(htmlUl);
      bannerShowUl.innerHTML = htmlUl;
      let bannerShowUlLi = bannerShowUl.children;
      // console.log(bannerShowUlLi[0]);
      let htmlLi1 = '';
      let htmlLi2 = '';
      let htmlLi3 = '';
      let htmlLi4 = '';
      JSON.parse(data).forEach(function (v, i) {
         //  console.log(v,i);
         if (i <= 5) {
            htmlLi1 += `<li><a href="cart.html?id=${v.id}&order=${j-0+1}&url=aside" ><img src="${v.src}" alt=""><span>${v.name}</span></a>
            </li>`;
         }
         if (i >= 6 && i <= 11) {
            htmlLi2 += `<li><a href="cart.html?id=${v.id}&order=${j-0+1}&url=aside" ><img src="${v.src}" alt=""><span>${v.name}</span></a>
            </li>`;
         }
         if (i >= 12 && i <= 17) {
            htmlLi3 += `<li><a href="cart.html?id=${v.id}&order=${j-0+1}&url=aside" ><img src="${v.src}" alt=""><span>${v.name}</span></a>
            </li>`;
         }
         if (i >= 18 && i <= 23) {
            htmlLi4 += `<li><a href="cart.html?id=${v.id}&order=${j-0+1}&url=aside" ><img src="${v.src}" alt=""><span>${v.name}</span></a>
            </li>`;
         }
      });
      bannerShowUlLi[0].innerHTML = htmlLi1;
      bannerShowUlLi[1].innerHTML = htmlLi2;
      bannerShowUlLi[2].innerHTML = htmlLi3;
      bannerShowUlLi[3].innerHTML = htmlLi4;
   });
})