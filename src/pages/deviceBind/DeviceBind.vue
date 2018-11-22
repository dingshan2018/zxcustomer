<template>
  <div class="app-container device-bind">
    <van-cell-group class="input-group">
      <van-field
        v-model="termCode"
        label="终端编号"
        disabled/>

      <van-field
        v-model="deviceCode"
        label="设备号"
        placeholder="输入设备号"/>

    </van-cell-group>
    <van-button type="default" class="submit-btn" block :disabled="!(!!termCode && !!deviceCode)" @click="submitClick">绑定</van-button>
  </div>
</template>

<script>
  export default {
    name: 'deviceBind',
    data () {
      return {
        termCode: '',
        deviceCode: ''
      };
    },
    methods: {
      submitClick () {
        let _this = this;

        _this.$toast.loading({
          duration   : 0,
          forbidClick: true,
          message    : '绑定中...'
        });

        _this.$axios.get('/wx/activeTerminal', {
          params: {
            termCode  : _this.termCode,
            deviceCode: _this.deviceCode
          }
        }).then(function (response) {
          let data = response.data;
          _this.$toast.success(data.error.message);

        });
      }
    },
    created(){
      this.termCode = globalTools.getUrlParam('termCode');
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
