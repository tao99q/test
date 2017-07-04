/**
 * Created by zhanghongtao on 2017/6/30.
 */
var vm = new Vue({
    el: "#app",
    data: {
        totalMoney: 0,
        productList: [],
        checkAllFlag: false,
        delFlag: false
    },
    filters: {
        formatMoney: function (value) {
            return "￥" + value.toFixed(2);
        },
        money: function (value, type) {
            return "￥" + value.toFixed(2) + type;
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.cartView();
        })
    },
    methods: {
        cartView: function () {
            this.$http.get("data/cartData.json").then((res) => {
                this.productList = res.data.result.list;
                // this.totalMoney = res.data.result.totalMoney
            });
        },
        changMoney: function (item, way) {
            if (way > 0) {
                item.productQuantity++;
            } else {
                if (item.productQuantity > 1) {
                    item.productQuantity--;
                }

            }
            this.calcTotalPrice();
        },
        selectedProject: function (item) {
            if (typeof item.checked == 'undefined') {
                // Vue.set(item,"checked",true);
                this.$set(item, "checked", true);
            } else {
                item.checked = !item.checked;
            }
            this.calcTotalPrice();
        },
        checkAll: function (flag) {
            var _this = this;
            this.checkAllFlag = flag;

            this.productList.forEach(function (item, index) {
                if (typeof item.checked == 'undefined') {
                    _this.$set(item, "checked", true);
                } else {
                    item.checked = flag;
                }
            });
            this.calcTotalPrice();
        },
        calcTotalPrice: function () {
            var _this = this;
            _this.totalMoney = 0;
            this.productList.forEach(function (item, index) {
                if (item.checked) {
                    _this.totalMoney += item.productPrice * item.productQuantity;
                }
            })
        },
        delConfirm: function (item) {
            this.delFlag = true;
            this.curProduct = item;
        },
        delProduct: function () {
            var index = this.productList.indexOf(this.curProduct);
            this.productList.splice(index, 1);
            this.delFlag = false;
            this.calcTotalPrice();
        }
    }
});