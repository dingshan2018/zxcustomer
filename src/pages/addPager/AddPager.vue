<template>
  <div class="app-container">

    <van-cell-group class="input-group ">
      <van-field
        v-model="termCode"
        label="终端编号"
        disabled/>

      <van-field
        v-model="surplusPager"
        label="剩余纸张"
        disabled/>

    </van-cell-group>

    <van-button type="default"
                class="submit-btn"
                block
                @click="submitClick">确认补纸
    </van-button>

  </div>
</template>

<script>
  export default {
    name   : 'addPager',
    data () {
      return {
        termCode    : '',
        surplusPager: ''
      };
    },
    methods: {
      // 提交确认按钮
      submitClick () {
        let _this = this;

        _this.$toast.loading({
          duration   : 0,
          forbidClick: true,
          message    : '加载中...'
        });

        _this.$axios.get('/http', {
          params: {
            termCode: _this.termCode
          }
        }).then(function (response) {

        }).catch(function (error) {
          _this.$toast.fail('系统繁忙！');

        });
      }
    },
    created () {
      let _this = this;

      this.termCode = globalTools.getUrlParam('termCode');

      // 获取剩余纸张
      _this.$axios.get('/http').then(function (response) {
        let data = response.data;
        _this.surplusPager = '';
      }).catch(function (error) {
        // _this.$toast.fail('出错了！');

      });
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
