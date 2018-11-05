<template>
  <div class="app-container device-bind">
    <van-cell-group class="input-group">
      <van-field
        v-model="deviceCode"
        label="设备编号"
        disabled/>

      <van-field
        v-model="boardCode"
        label="钢板号"
        placeholder="请输入钢板号"/>

    </van-cell-group>
    <van-button type="default" class="submit-btn" block :disabled="!(!!boardCode && !!deviceCode)" @click="submitClick">绑定</van-button>
  </div>
</template>

<script>
  export default {
    name: 'deviceBind',
    data () {
      return {
        boardCode: '',
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

        _this.$axios.post('/deviceBind', {
          boardCode: _this.boardCode,
          deviceCode: _this.deviceCode
        }).then(function (response) {

        }).catch(function (error) {
          setTimeout(function () {
            _this.$toast.success('绑定成功');
          }, 3000);
        });
      }
    },
    created(){
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
