<template>
  <div class="app-container device-bind">
    <van-cell-group class="input-group">
      <van-field
        v-model="deviceCode"
        label="设备编号"
        disabled/>

    </van-cell-group>
    <van-button type="default" class="submit-btn" block @click="submitClick">测试出纸</van-button>
  </div>
</template>

<script>
  export default {
    name   : 'deviceBind',
    data () {
      return {
        deviceCode: ''
      };
    },
    methods: {
      submitClick () {
        let _this = this;

        _this.$toast.loading({
          duration   : 0,
          forbidClick: true,
          message    : '加载中...'
        });

        _this.$axios.get('/deviceBind', {
          params: {
            deviceCode: _this.deviceCode
          }
        }).then(function (response) {
          let data = response.data;
          _this.$toast.success(data.error.message);

          if (parseInt(data.code) === 0) {
            setTimeout(WeixinJSBridge.call('closeWindow'), 3000);
          }
        }).catch(function (error) {
          _this.$toast.fail('系统繁忙！');

        });
      }
    },
    created () {
      this.deviceCode = 'boardCode0123456';
      // this.deviceCode = globalTools.getUrlParam('deviceCode');
    }
  };
</script>

<style lang="less" scoped>
  @base-green: #00c292;

  .input-group {
    margin-top: 40px;

    .van-field {
      width: calc(100% - 10px);
      margin-left: 10px;
    }
  }

  .submit-btn {
    width: 320px;
    margin: 30px auto;
    border-radius: 4px;
    font-size: 18px;
    font-weight: 400;
    color: #fff;
    background-color: @base-green;
  }
</style>
