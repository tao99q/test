/**
 * Created by zhanghongtao on 2017/7/3.
 */
new Vue({
    el: ".container",
    data: {
        limitNum: 3,
        addressList: [],
        currentIndex: 0,
        shippingMethod: 1,
        delFlag:false
    },
    computed: {
        filterAddress: function () {
            return this.addressList.slice(0, this.limitNum);
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getAddressList();
        });
    },
    methods: {
        getAddressList: function () {
            this.$http.get("data/address.json").then(resp => {
                var res = resp.data;
                if (res.status == 0) {
                    this.addressList = res.result;
                }
            });
        },
        loadMore: function () {
            this.limitNum += this.limitNum;
            if (this.limitNum > this.addressList.length) {
                this.limitNum = this.addressList.length;
            }
        },
        setDefault: function (addressId) {
            this.addressList.forEach(function (address, index) {
                if (address.addressId == addressId) {
                    address.isDefault = true;
                } else {
                    address.isDefault = false;
                }
            });
        },
        delConfirm: function (address) {
           this.curAddress = address;
           this.delFlag = true;
        },
        delAddress:function () {
           var index =  this.addressList.indexOf(this.curAddress);
           this.addressList.splice(index,1);
           this.delFlag = false;
           this.curAddress = null;
        }
    }
});