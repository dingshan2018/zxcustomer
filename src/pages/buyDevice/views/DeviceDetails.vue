<template>
  <div class="app-container animated fadeIn faster" v-cloak>
    <div class="app-header" @touchmove.stop.prevent>
      <van-nav-bar
        title="设备详情"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
      />
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

        <van-tabs v-model="tabActive" class="goods-cell">
          <van-tab title="商品介绍" class="goods-desc-wrap">
            {{goodsData.introduce}}
          </van-tab>
          <van-tab title="产品参数" class="goods-desc-wrap">
            {{goodsData.parameter}}
          </van-tab>
        </van-tabs>
      </div>
    </div>

    <div class="app-footer van-hairline--top" @touchmove.stop.prevent>
      <van-submit-bar
        :price="buyTotalMoney"
        button-text="购买"
        @submit="submitClick"
      />
    </div>

    <van-popup
      class="popup__goods-summary van-hairline--bottom"
      v-model="popupGoodsSummary"
      position="bottom"
      :lazy-render="false"
      @click-overlay="popupOverlayClick"
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

      <van-cell>
        <div slot="title" style="line-height: 34px;">数量</div>
        <div class="number-count van-hairline--surround">
          <button class="number-count__less van-hairline--left" @click="countLess"></button>
          <input class="number-count__quantity"
                 type="number"
                 maxlength="3"
                 v-model="buyQuantity"
                 @click.stop.prevent="buyQuantityClick">
          <button class="number-count__plus van-hairline--right" @click="countPlus"></button>
        </div>
      </van-cell>

    </van-popup>

    <van-number-keyboard
      :show="keyboard"
      :z-index="2003"
      extra-key=""
      close-button-text="完成"
      :hide-on-click-outside="false"
      @blur="keyboard = false"
      @input="keyboardInput"
      @delete="keyboardDelete"
      @close="keyboardClose"
      ref="keyboard"
    />

  </div>
</template>

<script>
  export default {
    name    : 'deviceDetails',
    data () {
      return {
        // BScrollEx实例
        mainBScrollInstance: null,
        // 设备数据
        goodsData          : {
          // id
          deviceId : '',
          // 轮播
          imgs     : [],
          // 标签
          tag      : '',
          // 名称
          name     : '',
          // 价格
          price    : '',
          // 参考价
          reference: '',
          // 剩余数
          surplus  : '',
          // 介绍
          introduce: '',
          // 参数
          parameter: ''
        },
        // 详情tab
        tabActive          : 0,
        // 购买数量
        buyQuantity        : '1',
        // popup显示
        popupGoodsSummary  : false,
        // 数字键盘显示
        keyboard           : false
      };
    },
    computed: {
      // 购买总金额
      buyTotalMoney () {
        let price = this.goodsData.price ? parseFloat(this.goodsData.price) * 100 : 0;

        return parseFloat(this.buyQuantity) * price;
      }
    },
    methods : {
      // popup蒙层关闭
      popupOverlayClick(){
        this.keyboard = false;
        this.keyboardClose();
      },
      // 购买数量减
      countLess () {
        let quantity = parseInt(this.buyQuantity) - 1;

        this.buyQuantity = quantity > 0 ? quantity.toString() : '1';
      },
      // 购买数量加
      countPlus () {
        let quantity = parseInt(this.buyQuantity) + 1;

        this.buyQuantity = quantity > parseInt(this.goodsData.surplus) ? this.buyQuantity : quantity.toString();
      },
      // 数字键盘输入
      keyboardInput (value) {
        this.buyQuantity += value > 0 ? value : 1;

        if (parseInt(this.buyQuantity) > parseInt(this.goodsData.surplus)) {
          this.buyQuantity = this.goodsData.surplus.toString();
        }
      },
      // 数字键盘删除
      keyboardDelete () {
        this.buyQuantity = this.buyQuantity.slice(0, this.buyQuantity.length - 1);
        if (this.buyQuantity.length <= 0) {
          this.buyQuantity = '1';
        }
      },
      // 数字键盘关闭
      keyboardClose () {
        let _this = this;
        _this.$refs.popupGoodsSummary.$el.style.bottom = '50px';
        _this.$refs.popupGoodsSummary.$el.style.transitionDuration = '0.15s';
        setTimeout(function () {
          _this.$refs.popupGoodsSummary.$el.style.transitionDuration = '0.3s';
        }, 150);
      },
      // 购买数量函数
      buyQuantityClick () {
        document.activeElement.blur();
        let _this = this;

        if (_this.keyboard) return;

        _this.keyboard = true;

        setTimeout(function () {
          _this.$refs.popupGoodsSummary.$el.style.bottom = '246px';
          _this.$refs.popupGoodsSummary.$el.style.transitionDuration = '0.3s';
        }, 200);
      },
      // 购买
      submitClick () {
        let _this = this;

        _this.$toast.loading({
          duration   : 0,
          forbidClick: true,
          message    : '购买中...'
        });

        _this.$axios.post('/buyDevice', {
          deviceId: _this.$route.params.deviceId,
          quantity: _this.buyQuantity
        }).then(function (response) {

        }).catch(function (error) {
          setTimeout(function () {
            _this.$toast.success('购买成功');
          }, 3000);
        });
      },
      // 获取设备详情
      getGoodsData () {
        let _this = this;

        _this.$axios.post('/deviceData', {
          deviceId: _this.$route.params.deviceId
        }).then(function (response) {

        }).catch(function (error) {
          _this.goodsData = {
            deviceId : _this.$route.params.deviceId,
            imgs     : [
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541337717739&di=3b832a9ab3df64f36c0c92d6521bbdbd&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fb999a9014c086e064a76b12f0f087bf40bd1cbfc.jpg',
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541337717739&di=3b832a9ab3df64f36c0c92d6521bbdbd&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fb999a9014c086e064a76b12f0f087bf40bd1cbfc.jpg'],
            tag      : '服务商',
            name     : '船舰',
            price    : '6800.68',
            reference: '13800.02',
            surplus  : '106',
            introduce: '商品介绍',
            parameter: '产品参数'
          };
        });
      }
    },
    mounted () {
      let _this = this;

      // BScroll初始化
      _this.mainBScrollInstance = new _this.$BScroll(_this.$refs.mainBScroll, {
        click: true
      });

      // 获取设备详情
      _this.getGoodsData();

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

  .goods-desc-wrap {
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

  .number-count {
    display: inline-block;
    vertical-align: top;
    position: relative;
    width: 126px;
    height: 34px;
    overflow: hidden;
  }

  .number-count__quantity {
    display: inline-block;
    vertical-align: top;
    width: 57px;
    height: 34px;
    padding: 4px 5px;
    text-align: center;
  }

  .number-count__plus,
  .number-count__less {
    display: inline-block;
    vertical-align: top;
    width: 34px;
    height: 34px;
    line-height: 34px;
    text-align: center;
  }

  .number-count__plus {
    float: right;
    background: url("../assets/img/icon/plus.png") no-repeat center center/16px #f7f7f7;
  }

  .number-count__less {
    float: left;
    background: url("../assets/img/icon/less.png") no-repeat center center/16px #f7f7f7;
  }

  .app-footer {
    z-index: 2002;
    position: relative;
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

</style>
