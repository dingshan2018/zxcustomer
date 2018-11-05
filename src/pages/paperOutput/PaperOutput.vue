<template>
  <div id="app" v-cloak>
    <!-- 未关注 -->
    <!--<div class="subscribe-wrapper" v-if="!subscribe">
      <h1 class="subscribe-title">公司名称</h1>
      <p class="subscribe-introduction">公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介</p>
      &lt;!&ndash; 跳转到公众号关注 &ndash;&gt;
      <a href="#">
        <van-button type="default" class="subscribe-btn" block>关注公众号</van-button>
      </a>
      <p class="subscribe-warm-description">
        哎呀！！亲您是第一次来<br/>
        微信关注一次，即可免费使用
      </p>
    </div>-->
    <!-- 已关注 -->
    <div class="ad-wrapper">
      <iframe class="ad-src" :src="adSrc" @load="adCountdownStart" frameborder="0" scrolling="no" seamless></iframe>
      <div class="ad-mask">
        <a :href="adLink" class="ad-link"></a>
        <span class="ad-countdown" :class="adCountdownShow ? 'ad-countdown--show' : false">{{adCountdown}}</span>
        <van-button type="default" class="confirm-btn" :class="!adCountdownShow && adCountdownInterval <= 0 ? 'confirm-btn--show' : false" block @click="confirmBtnClick">出纸</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name   : 'paperOutput',
    data () {
      return {
        mounted            : false,
        subscribe          : false,
        adSrc              : null,
        adLink             : null,
        adCountdown        : '',
        adCountdownShow    : false,
        adCountdownInterval: 10
      };
    },
    methods: {
      // ad倒计时
      adCountdownStart () {
        var _this = this;
        _this.adCountdownShow = true;
        _this.adCountdown = (_this.adCountdownInterval + 's');
        var interval = setInterval(function () {
          if (_this.adCountdownInterval <= 0) {
            clearInterval(interval);
            _this.adCountdownShow = false;
          } else {
            _this.adCountdown = (--_this.adCountdownInterval + 's');
          }
        }, 1000);
      },
      // 出纸
      confirmBtnClick () {
        var _this = this;

        _this.$toast.loading({
          duration   : 0,
          forbidClick: true,
          message    : '出纸中...'
        });

        _this.$axios.get('/paperOutput').then(function (response) {

        }).catch(function (error) {
          setTimeout(function () {
            _this.$toast.success('出纸成功');
          }, 3000);
        });
      }
    },
    created () {
      let _this = this;

      _this.adSrc = 'https://cn.vuejs.org/index.html';
      _this.adLink = 'https://cn.vuejs.org/index.html';
      // this.adSrc = globalTools.getUrlParam('adSrc');
      // this.adLink = globalTools.getUrlParam('adLink');

      // 后台获取用户数据
      /*_this.$axios.get('/user').then(function (response) {
        let data = response.data.user;
        // 状态完成
        _this.mounted = true;
        // 用户关注状态
        _this.subscribe = data.subscribe;
        // 已关注获取url参数
        if (data.subscribe) {
          _this.adSrc = 'https://cn.vuejs.org/index.html';
          _this.adLink = 'https://cn.vuejs.org/index.html';
          // this.adSrc = globalTools.getUrlParam('adSrc');
          // this.adLink = globalTools.getUrlParam('adLink');
        }
      }).catch(function (error) {
        // 模拟回传数据
        let data = {
          subscribe: false
        };
        // 状态完成
        _this.mounted = true;
        // 用户关注状态
        _this.subscribe = data.subscribe;
        // 已关注获取url参数
        if (data.subscribe) {
          _this.adSrc = 'https://cn.vuejs.org/index.html';
          _this.adLink = 'https://cn.vuejs.org/index.html';
          // this.adSrc = globalTools.getUrlParam('adSrc');
          // this.adLink = globalTools.getUrlParam('adLink');
        }
      });*/
    }
  };
</script>

<style lang="less" scoped>
  @base-green: #00c292;

  #app {
    overflow-y: auto;
  }

  .subscribe-wrapper {
    padding: 10px;
  }

  .subscribe-title {
    text-align: center;
  }

  .subscribe-introduction {
    line-height: 1.5;
    text-align: left;
    text-indent: 28px;
    font-size: 14px;
  }

  .subscribe-btn {
    width: 280px;
    margin: 30px auto;
    border-radius: 4px;
    font-size: 16px;
    color: #fff;
    background-color: @base-green;
  }

  .subscribe-warm-description {
    line-height: 1.2;
    text-align: center;
    font-size: 13px;
    color: #666;
  }

  .ad-wrapper {
    z-index: 10;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .ad-src,
  .ad-mask,
  .ad-link {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .ad-mask {
    z-index: 1;
  }

  .ad-countdown {
    opacity: 0;
    visibility: hidden;
    z-index: 1;
    position: absolute;
    top: 10px;
    right: 10px;
    width: 44px;
    height: 44px;
    line-height: 44px;
    border: 1px solid #e0e0e0;
    border-radius: 50%;
    text-align: center;
    font-size: 18px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.75);
    transition: opacity 0.3s ease-out;
  }

  .ad-countdown--show {
    opacity: 1;
    visibility: visible;
    transition: opacity 0.3s ease-in;
  }

  .confirm-btn {
    z-index: 1;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 55px;
    margin: 0;
    border: none;
    outline: none;
    opacity: 0;
    visibility: hidden;
    font-size: 18px;
    font-weight: 600;
    color: #fff;
    background-color: @base-green;
    transition: opacity 0.3s linear;
  }

  .confirm-btn--show {
    opacity: 1;
    visibility: visible;
  }
</style>
