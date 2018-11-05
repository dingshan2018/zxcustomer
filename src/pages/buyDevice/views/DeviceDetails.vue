<template>
  <div class="app-container" v-cloak>
    <div class="app-header">
      <van-nav-bar
        title="设备详情"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
      />
    </div>

    <div class="app-main" ref="mainBScroll">
      <div>
        <van-swipe :autoplay="3000" class="device-swipe">
          <van-swipe-item v-for="src in deviceDetails.imgs">
            <img class="swipe-img" :src="src">
          </van-swipe-item>
        </van-swipe>
        <div class="device-title">{{deviceDetails.name}}</div>
        <div class="device-details">{{deviceDetails.details}}</div>
      </div>
    </div>

    <div class="app-footer">
      <van-button type="default" class="submit-btn" block @click="submitClick">购买</van-button>
    </div>
  </div>
</template>

<script>
  export default {
    name   : 'deviceDetails',
    data () {
      return {
        // BScrollEx实例
        mainBScrollEx: null,
        // 设备详情
        deviceDetails: {}
      };
    },
    methods: {
      // 购买
      submitClick () {
        let _this = this;

        _this.$toast.loading({
          duration   : 0,
          forbidClick: true,
          message    : '购买中...'
        });

        _this.$axios.post('/buyDevice', {
          deviceId: _this.$route.params.deviceId
        }).then(function (response) {

        }).catch(function (error) {
          setTimeout(function () {
            _this.$toast.success('购买成功');
          }, 3000);
        });
      },
      // 获取设备详情
      getDeviceDetails () {
        let _this = this;

        _this.$axios.post('/deviceDetails', {
          deviceId: _this.$route.params.deviceId
        }).then(function (response) {

        }).catch(function (error) {
          _this.deviceDetails = {
            deviceId: _this.$route.params.deviceId,
            imgs    : [
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541337717739&di=3b832a9ab3df64f36c0c92d6521bbdbd&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fb999a9014c086e064a76b12f0f087bf40bd1cbfc.jpg',
              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541337717739&di=3b832a9ab3df64f36c0c92d6521bbdbd&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fb999a9014c086e064a76b12f0f087bf40bd1cbfc.jpg'],
            name    : '超级出纸机超级出纸机超级出纸机超级出纸机',
            details : '这里可以是描述这里可以是描述这里可以是描述这里可以是描述这里可以是描述这里可以是描述这里可以是描述这里可以是描述这里可以是描述这里可以是描述这里可以是描述这里可以是描述这里可以是描述这里可以是描述这里可以是描述这里可以是描述这里可以是描述这里可以是描述这里可以是描述这里可以是描述这里可以是描述这里可以是描述这里可以是描述这里可以是描述'
          };
        });
      }
    },
    mounted () {
      let _this = this;

      // BScroll初始化
      _this.mainBScrollEx = new _this.$BScroll(_this.$refs.mainBScroll, {
        click: true
      });

      // 获取设备详情
      _this.getDeviceDetails();

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
    height: calc(100% - 45px - 45px);
  }

  .device-swipe {

    .swipe-img {
      display: block;
      width: 100%;
      height: 375px;
    }
  }

  .device-title {
    position: relative;
    padding: 15px 10px;
    line-height: 1.5;
    font-size: 16px;
    font-weight: 600;
    background-color: #fff;
  }

  .device-details {
    position: relative;
    margin-top: 5px;
    padding: 10px;
    line-height: 1.5;
    font-size: 14px;
    background-color: #fff;
  }

  .app-footer {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    position: relative;
    height: 45px;

    .submit-btn {
      height: 100%;
      font-size: 18px;
      font-weight: 400;
      color: #fff;
      background-color: @base-green;
    }
  }

</style>
