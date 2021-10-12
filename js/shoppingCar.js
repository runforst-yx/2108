class Cart {
    constructor() {
        // console.log(12);
        this.getCartGoods();
        // 获取全选按钮吗，绑定事件
        this.allCheck = document.querySelector('.shopping-table-check-all')
        // console.log(this.allCheck);
        this.oneCheck = document.querySelectorAll(".shopping-table-check-one");
        // console.log(this.oneCheck[0]);
        // 全选按钮绑定事件
        this.allCheck.addEventListener('click', this.allCheckFn.bind(this));
        // 单选按钮绑定事件
        this.oneCheckFn();
        // 总计数量和价格
        this.totalNumPrice();
        // 加减删除按钮点击事件
        this.$('tbody').addEventListener('click', this.tbodyFn.bind(this))
    }
    tbodyFn(eve) {
        // console.log(eve.target);
        // 判断点击的是哪一个节点对象
        // +
        if (eve.target.className == 'shopping-table-num-r') this.addFn(eve.target);
        // -
        if (eve.target.className == 'shopping-table-num-l') this.reduceFn(eve.target);
        // X
        if (eve.target.className == 'shopping-table-done-btn') this.deleteFn(eve.target);

    }
    // 总计数量和价格
    totalNumPrice() {
        // 总计
        let totalNum = 0;
        // 总计价格
        let totalPrice = 0;
        let AlltotalNum = 0;
        // 循环遍历选出被选中的商品
        this.oneCheck.forEach(goods => {
            // console.log(goods);
            // 找出被选中的商品
            if (goods.checked) {
                // 找到他的tr 从他的tr找到这个商品信息的数量和价格
                let goodsTrObj = goods.parentNode.parentNode;
                // console.log(goodsTrObj);
                // value-0的作用是把得到的value字符串变成数字类型
                let num = goodsTrObj.querySelector('.shopping-table-num-m').innerHTML - 0;
                // console.log(num);
                let price = goodsTrObj.querySelector('.shopping-table-total').innerHTML - 0;
                // console.log(price);
                // 总计和总计价格++;
                totalNum += num;
                totalPrice += price;
            }
            let goodsAllTrObj = goods.parentNode.parentNode;
            let AllNum = goodsAllTrObj.querySelector('.shopping-table-num-m').innerHTML - 0;
            AlltotalNum += AllNum;
        });
        // console.log(totalNum,totalPrice);
        // 把获取的总计值显示到总计innerHTML上
        // console.log(this.$('.tfoot-Total'));
        this.$('.tfoot-Total').innerHTML = `总计:${totalPrice}`;
        this.$('.tfoot-Select').innerHTML = `已选择${totalNum}件商品`
        this.$('.tfoot-TotalNum').innerHTML = `一共有${AlltotalNum}件商品`
    };
    // 6 更新local数量
    updateLocal(goodsId, num = 0) {
        // console.log(goodsId, num);
        let gd = localStorage.getItem('cart');
        // 没有数据则清空
        if (!gd) return;
        gd = JSON.parse(gd);
        gd.forEach((goods, index) => {
            if (goodsId == goods.id) {
                if (num) goods.num = num; // 修改数量
                else { // 删除当前商品
                    gd.splice(index, 1)

                }
            }
        });
        // console.log(gd);
        // console.log(gd);
        // 更新到local中
        localStorage.setItem('cart', JSON.stringify(gd))
    }
    // 5 删除
    deleteFn(del) {
        // console.log(del);
        let trObj = del.parentNode.parentNode;
        // console.log(trObj);
        let id = trObj.getAttribute('goods-id');
        let that = this;
        // console.log((trObj.children)[0].firstElementChild.checked);
        //询问框
        layer.confirm('您确定要删除此商品？', {
            btn: ['确认', '取消 '] //按钮
        }, function (index) {
            layer.close(index);
            // console.log(this);
            trObj.remove();
            // 更新local中的数据
            // 如果删除的商品被选中 则删除的时候要更新
            if ((trObj.children)[0].firstElementChild.checked) {
                (trObj.children)[0].firstElementChild.checked = false;
                that.totalNumPrice();
            }
            that.updateLocal(id);
        }, )
    }
    // 4 减号按钮点击事件 shopping-table-num-l
    reduceFn(reduce) {
        // console.log(reduce);
        // 获取数量节点
        let numObj = reduce.nextElementSibling;
        // console.log(numObj);
        // 判定是否为1 为1 则不能减
        let tdPriceObj = reduce.parentNode;
        let trObj = tdPriceObj.parentNode;
        let num = '';
        if (numObj.innerHTML == 1) {
            alert('数量至少为1');
            num = 1;
        } else {
            num = numObj.innerHTML - 1;
            numObj.innerHTML = num;
            // 取出商品单价和小计
            let addPrice = tdPriceObj.previousElementSibling.innerHTML;
            tdPriceObj.nextElementSibling.innerHTML = addPrice * num;
        }
        // console.log(num);
        let goodsId = trObj.getAttribute('goods-id');
        this.updateLocal(goodsId, num);
        this.totalNumPrice();
    }
    // 3 加号按钮点击事件 shopping-table-num-r
    addFn(tar) {
        // console.log(tar);
        // tar是传输过来的节点对象 我们需要找到他的上一级数量对象
        let numObj = tar.previousElementSibling;
        // console.log(numObj);
        // console.log(numObj.innerHTML);
        // 点击一次数量增加一次
        let num = numObj.innerHTML - 0 + 1;
        // 把值再给innerHTML
        numObj.innerHTML = num;
        // 找出此商品的单价 ，然后总计得数量乘以单价
        let tdPriceObj = tar.parentNode;
        let trObj = tdPriceObj.parentNode;
        // console.log(tdPriceObj);
        // 上一级为单价，下一级为总计
        let addPrice = tdPriceObj.previousElementSibling.innerHTML;
        // console.log(addPrice);
        tdPriceObj.nextElementSibling.innerHTML = addPrice * num;
        let goodsId = trObj.getAttribute('goods-id');
        this.updateLocal(goodsId, num);
        this.totalNumPrice();
    }


    // 2 单选按钮的点击事件
    oneCheckFn() {
        let that = this;
        let oneCheckNum = 0;
        let checkLength = this.oneCheck.length;
        // console.log(checkLength);
        // console.log(that);
        this.oneCheck.forEach(v => {
            // console.log(v);
            v.checked && oneCheckNum++;
            v.onclick = function () {
                // console.log(this.check);
                if (v.checked) {
                    oneCheckNum++;
                    oneCheckNum == checkLength && (that.allCheck.checked = true)
                } else {
                    oneCheckNum--;
                    that.allCheck.checked = false;

                }
                that.totalNumPrice();
            }
        })
    }
    // 1 全选按钮的点击事件
    allCheckFn(eve) {
        // console.log(12);
        // console.log(eve.target.checked);
        let allStatus = eve.target.checked;
        // 让单个商品跟随全选状态
        this.oneCheck.forEach(v => {
            // console.log(v);
            v.checked = allStatus;
        })
        this.totalNumPrice();
    }
    //0 获取购物车数据
    getCartGoods() {
        let cartG = localStorage.getItem('cart');
        let html = '';
        JSON.parse(cartG).forEach(data => {
            // console.log(data.price);
            html += `<tr class="shopping-table-border" goods-id=${data.id}>
            <td class="shopping-table-box shopping-table-border">
                <input type="checkbox" class="shopping-table-check-one">
            </td>
            <td class="shopping-table-img shopping-table-border">
                <img src="${data.src}" alt="" title="这是一张图片 ">
            </td>
            <td class="shopping-table-name shopping-table-border">
                    ${data.name}
            </td>
            <td class="shopping-table-price shopping-table-border">
                ${data.price}
            </td>
            <td class="shopping-table-num shopping-table-border">
                <button class="shopping-table-num-l">-</button><i class="shopping-table-num-m">${data.num}</i><button class="shopping-table-num-r">+</button>
            </td>
            <td class="shopping-table-total">
                ${data.num*data.price}
            </td>
            <td class="shopping-table-done">
            <button class="shopping-table-done-btn">X</button>
            </td>
        </tr>`
        });
        this.$('tbody').innerHTML = html;
        // console.log(cartG);
    }
    $(tag) {
        return document.querySelector(tag);
    }
}
new Cart;