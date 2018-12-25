<template>
  <div class="app-container animated fadeIn faster" v-cloak>
    <div class="app-header" @touchmove.stop.prevent>
      <van-nav-bar
        title="设备详情"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"/>
    </div>

    <div class="app-main" ref="mainBScroll">
      <div>
        <van-swipe :autoplay="5000" class="goods-swipe">
          <van-swipe-item v-for="src in goodsData.imgs">
            <img class="swipe-img" :src="src">
          </van-swipe-item>
        </van-swipe>

        <van-cell-group class="goods-info">
          <van-cell :border="false" style="font-size: 16px;">
            【{{goodsData.tag}}】 {{goodsData.name}}
          </van-cell>
          <van-cell>
            <span slot="title" class="goods-info__price">¥{{goodsData.price}}</span>
            <span class="goods-info__reference">市场价：¥{{goodsData.reference}}</span>
          </van-cell>
        </van-cell-group>

        <van-cell title="商品规格"
                  is-link
                  class="goods-cell"
                  @click="popupGoodsSummary = true">
          <span>购买数量：{{buyQuantity}}</span>
        </van-cell>

        <van-cell title="购买历史" is-link class="goods-cell" to="/buyHistory"/>

        <div class="goods-desc-wrap">
          <van-cell title="商品介绍" class="goods-desc-title goods-cell van-hairline--top-bottom"/>
          <div class="goods-desc-content">
            <p style="line-height: 16px; margin: 0px;">
              <img width="100%" src="../assets/img/background/mbsmall_1539147547939421.jpg" style="line-height: 0px;">
            </p>
            <p style="line-height: 16px; margin: 0px;">
              <img width="100%" src="../assets/img/background/mbsmall_1539147597448130.jpg" style="line-height: 0px;">
            </p>
            <p style="line-height: 16px; margin: 0px;">
              <img width="100%" src="../assets/img/background/mbsmall_1531982475327751.jpg" style="line-height: 0px;">
            </p>
            <p style="line-height: 16px; margin: 0px;">
              <img width="100%" src="../assets/img/background/mbsmall_1531982498939421.jpg" style="line-height: 0px;">
            </p>
            <p style="line-height: 16px; margin: 0px;">
              <img width="100%" src="../assets/img/background/mbsmall_1539147631695500.jpg" style="line-height: 0px;">
            </p>
            <p style="line-height: 16px; margin: 0px;">
              <img width="100%" src="../assets/img/background/mbsmall_1539147661814899.jpg" style="line-height: 0px;">
            </p>
            <p style="line-height: 16px; margin: 0px;"><br></p>
            <p style="line-height: 16px; margin: 0px;">
              <img width="100%" src="../assets/img/background/mbsmall_1539147697448130.jpg" style="line-height: 0px;">
            </p>
            <p style="line-height: 16px; margin: 0px;">
              <img width="100%" src="../assets/img/background/mbsmall_1531983536927987.jpg" style="line-height: 0px;">
            </p>
            <p style="line-height: 16px; margin: 0px;">
              <img width="100%" src="../assets/img/background/mbsmall_1531983560448130.jpg" style="line-height: 0px;">
            </p>
            <p style="line-height: 16px; margin: 0px;">
              <img width="100%" src="../assets/img/background/mbsmall_1531983592939421.jpg" style="line-height: 0px;">
            </p>

          </div>
        </div>

      </div>
    </div>

    <div class="app-footer van-hairline--top" @touchmove.stop.prevent>
      <van-submit-bar
        :price="buyTotalMoney"
        :disabled="!userInfo.openId"
        button-text="购买"
        @submit="wxpay"/>
    </div>

    <!-- 商品规格 -->
    <van-popup
      class="popup__goods-summary van-hairline--bottom"
      v-model="popupGoodsSummary"
      position="bottom"
      :lazy-render="false"
      ref="popupGoodsSummary">
      <van-card
        class="goods-summary van-hairline--bottom">
        <div class="goods-summary__img-wrap" slot="thumb">
          <img src="https://via.placeholder.com/90">
        </div>
        <p slot="title" class="goods-summary__title">
          【{{goodsData.tag}}】 {{goodsData.name}}
        </p>
        <p slot="desc" class="goods-summary__price">
          <span style="color: #f44;">¥{{goodsData.price}}</span><br>
          <span>剩余：{{goodsData.surplus}}</span>
        </p>
      </van-card>

      <van-cell title="数量" class="buy-quantity">
        <van-stepper
          v-model="buyQuantity"
          integer
          :min="1"
          :max="goodsData.surplus"
          :step="1"
          disable-input/>
      </van-cell>
      <van-cell>&nbsp;</van-cell>

    </van-popup>
  </div>
</template>

<script>
  export default {
    name: "deviceDetails",
    data () {
      return {
        // BScrollEx实例
        mainBScrollInstance: null,
        // 设备数据
        goodsData: {
          // id
          deviceId: "",
          // 轮播
          imgs: [],
          // 标签
          tag: "",
          // 名称
          name: "",
          // 价格
          price: "",
          // 参考价
          reference: "",
          // 剩余数
          surplus: "",
          // 介绍
          introduce: "",
          // 参数
          parameter: ""
        },
        // 详情tab
        tabActive: 0,
        // 购买数量
        buyQuantity: "1",
        // popup购买数量显示
        popupGoodsSummary: false,
        // 数字键盘显示
        keyboard: false,
        // 用户信息
        userInfo: {},
        // 微信支付参数
        payData: {}
      };
    },
    computed: {
      // 购买总金额
      buyTotalMoney () {
        let price = this.goodsData.price ? parseFloat(this.goodsData.price) * 100 : 0;

        return parseFloat(this.buyQuantity) * price;
      }
    },
    methods: {
      // 微信用户信息
      getWxUserInfo () {
        let _this = this;
        //获取公众号用户信息
        let accessCode = globalTools.getUrlParam("code");
        // alert("accessCode_____" + accessCode);
        if (accessCode == null) {
          //获取授权code的回调地址，获取到code，直接返回到当前页
          let fromurl = location.href;
          let url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4e2cf38426225453&redirect_uri=" +
            encodeURIComponent(fromurl) + "&response_type=code&scope=snsapi_userinfo&state=0#wechat_redirect";

          location.href = url;
        }
        else {
          // alert("请求/wx/userInfo_____");
          _this.$axios.get("/wx/userInfo", {
            params: {
              code: accessCode,
              state: 0
            }
          }).then(function (response) {
            // alert("获取用户信息成功:" + JSON.stringify(response.data));
            let data = response.data;

            if (!data && !data.userInfo) return _this.$dialog.alert({
              message: "获取用户信息失败"
            });

            // 用户数据
            _this.userInfo = data.userInfo;

            // alert("用户是否关注_____" + data.userInfo.subscribe);
            // 用户未关注
            if (!data.userInfo.subscribe) {
              // location.href = "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzAxNzcwODE2MA==&scene=110#wechat_redirect";
              location.href = "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzUyOTM0OTc2NQ==&scene=126#wechat_redirect";
            }

            if (!data.userInfo.userId) {
              _this.$dialog.alert({
                message: "为保障权益，建议您先注册成为加盟商。"
              });
            }
          }).catch(function (error) {
            _this.$dialog.alert({
              title: "系统发生错误",
              message: error
            });
          });
        }
      },
      // 请求后台预支付
      wxpay () {
        // $.showLoading("正在加载...");
        let _this = this;
        let total_fee = "1";
        // alert("支付wxpay_____"+_this.userInfo);
        _this.$axios.get("/wx/wxpay/dingshanPay", {
          params: {
            total_fee: total_fee,
            open_id: _this.userInfo.openId,
            equ_type: "00",
            count: _this.buyQuantity
          }
        }).then(function (res) {
          let data = res.data;
          // alert("支付请求回调_____" + data);
          if (parseInt(data.code) === 0) {
            _this.payData = data.data;

            if (typeof WeixinJSBridge === "undefined") {
              if (document.addEventListener) {
                document.addEventListener("WeixinJSBridgeReady", _this.onBridgeReady(_this.payData), false);
              }
              else if (document.attachEvent) {
                document.attachEvent("WeixinJSBridgeReady", _this.onBridgeReady(_this.payData));
                document.attachEvent("onWeixinJSBridgeReady", _this.onBridgeReady(_this.payData));
              }
            }
            else {
              _this.onBridgeReady(_this.payData);
            }
          }
          else {
            _this.$dialog.alert({
              message: res.message
            });
          }
        }).catch(function (error) {
          _this.$dialog.alert({
            title: "系统发生错误",
            message: error
          });

        });
      },
      // 调用微信支付
      onBridgeReady (json) {
        // alert("onBridgeReady:" + JSON.stringify(json));
        let _this = this;

        let data = JSON.parse(json);

        WeixinJSBridge.invoke("getBrandWCPayRequest", {
          "appId": data.appId,
          "nonceStr": data.nonceStr,
          "package": data.package,
          "paySign": data.paySign,
          "signType": data.signType,
          "timeStamp": data.timeStamp
        }, function (res) {
          // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
          if (res.err_msg === "get_brand_wcpay_request:ok") {
            _this.$dialog.alert({
              message: "支付成功"
            });
            _this.popupGoodsSummary = false;
          }
          else {
            _this.$dialog.alert({
              message: "支付失败" + JSON.stringify(res)
            });
          }
        });
      },
      // 购买数量函数
      buyQuantityClick () {
        document.activeElement.blur();
        let _this = this;

        if (_this.keyboard) return;

        _this.keyboard = true;

        setTimeout(function () {
          _this.$refs.popupGoodsSummary.$el.style.bottom = "246px";
          _this.$refs.popupGoodsSummary.$el.style.transitionDuration = "0.3s";
        }, 200);
      },
      // 购买
      submitClick () {
        let _this = this;

        _this.$toast.loading({
          duration: 0,
          forbidClick: true,
          message: "购买中..."
        });

        _this.$axios.post("/buyDevice", {
          deviceId: _this.$route.params.deviceId,
          quantity: _this.buyQuantity
        }).then(function (response) {

        }).catch(function (error) {
          setTimeout(function () {
            _this.$toast.success("购买成功");
          }, 3000);
        });
      },
      // 获取设备详情
      getGoodsData () {
        let _this = this;

        _this.$axios.post("/deviceData", {
          // deviceId: _this.$route.params.deviceId
        }).then(function (response) {

        }).catch(function (error) {
          _this.goodsData = {
            deviceId: _this.$route.params.deviceId,
            imgs: [
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541337717739&di=3b832a9ab3df64f36c0c92d6521bbdbd&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fb999a9014c086e064a76b12f0f087bf40bd1cbfc.jpg",
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541337717739&di=3b832a9ab3df64f36c0c92d6521bbdbd&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fb999a9014c086e064a76b12f0f087bf40bd1cbfc.jpg"
            ],
            tag: "服务商",
            name: "船舰",
            price: "0.01",
            reference: "0.1",
            surplus: "106",
            introduce: "商品介绍",
            parameter: "产品参数"
          };
        });
      }
    },
    created () {
      this.getWxUserInfo();
    },
    mounted () {
      let _this = this;

      // BScroll初始化
      _this.mainBScrollInstance = new _this.$BScroll(_this.$refs.mainBScroll, {
        click: true
      });

      // 获取设备详情
      _this.goodsData = {
        deviceId: _this.$route.params.deviceId,
        imgs: [
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541337717739&di=3b832a9ab3df64f36c0c92d6521bbdbd&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fb999a9014c086e064a76b12f0f087bf40bd1cbfc.jpg",
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541337717739&di=3b832a9ab3df64f36c0c92d6521bbdbd&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fb999a9014c086e064a76b12f0f087bf40bd1cbfc.jpg"
        ],
        tag: "服务商",
        name: "船舰",
        price: "0.01",
        reference: "0.1",
        surplus: "106",
        introduce: "商品介绍",
        parameter: "产品参数"
      };

      // _this.getGoodsData();

    }
  };
</script>

<style lang="less" scoped>
  @base-green: #00c292;

  .app-container {
    background-color: #f2f2f2;
  }

  .app-header {
    position: relative;
    height: 45px;
  }

  .app-main {
    position: relative;
    height: calc(100% - 45px - 50px);
  }

  .goods-swipe {

    .swipe-img {
      display: block;
      width: 100%;
      height: 300px;
    }
  }

  .goods-info__price {
    font-size: 16px;
    color: #db5442;
  }

  .goods-info__reference {
    text-decoration: line-through;
    font-size: 13px;
    color: #888;
  }

  .goods-desc-title:after {
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
  }

  .goods-desc-content {
    padding: 10px 15px;
    background-color: #fff;
  }

  .goods-cell {
    margin-top: 5px;
  }

  .goods-summary {
    background-color: #fff;
  }

  .goods-summary__img-wrap {
    display: block;
    position: relative;
    top: -15px;
    margin: 0 auto;
    padding: 10px;
    /*border: 1px solid #eee;*/
    border-radius: 6px;
    background-color: #fff;
  }

  .goods-summary__img-wrap:after {
    content: ' ';
    position: absolute;
    pointer-events: none;
    box-sizing: border-box;
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
    -webkit-transform: scale(.5);
    transform: scale(.5);
    border: 1px solid #eee;
    border-radius: 12px;
  }

  .goods-summary__title {
    line-height: 0.53333rem;
    margin: 0.13333rem;
    font-size: 0.37333rem;
    word-break: break-all;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    white-space: normal;
  }

  .goods-summary__price {
    margin: 10px 5px 5px 5px;
    line-height: 20px;
    font-size: 13px;
  }

  .app-footer {
    z-index: 2002;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;

    .van-submit-bar {
      position: absolute;
    }
  }

  .popup__goods-summary {
    z-index: 2001 !important;
    bottom: 50px;
    overflow-y: visible;
  }

  .buy-quantity /deep/ .van-stepper__input[disabled] {
    color: #000;
    background-color: #fff;
    opacity: 1;
  }
</style>
