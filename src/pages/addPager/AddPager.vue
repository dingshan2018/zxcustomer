<template>
  <div class="app-container">

    <van-cell-group class="input-group ">
      <van-field
        v-model="devSn"
        label="设备编号"
        disabled/>

      <van-field
        v-model="deviceId"
        label="设备ID"
        disabled/>

      <van-field
        v-model="placeName"
        label="投放场所"
        disabled/>

      <van-field
        v-model="remainPager"
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
    name   : "addPager",
    data () {
      return {
        userId     : "",
        termCode   : "",
        devSn      : "",
        deviceId   : "",
        placeName  : "",
        remainPager: ""
      };
    },
    methods: {
      // 查询剩余纸张数
      queryRemainTissue () {
        let _this = this;

        // 以termCode查询数据
        _this.$axios.get("/wx/queryRemainTissue", {
          params: {
            termCode: _this.termCode
          }
        }).then(function (response) {
          let data = response.data;

          _this.devSn = data.devSn;
          _this.deviceId = data.deviceId;
          _this.placeName = data.placeName;
          _this.remainPager = data.remainLen;

        }).catch(function (error) {
          // _this.$toast.fail('系统繁忙！');

        });
      },
      // 提交确认按钮
      submitClick () {
        let _this = this;

        _this.$toast.loading({
          duration   : 0,
          forbidClick: true,
          message    : "加载中..."
        });

        _this.$axios.get("/wx/supplyTissue", {
          params: {
            userId  : _this.userId,
            deviceId: _this.deviceId
          }
        }).then(function (response) {
          let data = response.data;
          _this.$toast.success(data.error.message);

          if (parseInt(data.code) === 0) {
            setTimeout(function () {
              WeixinJSBridge.call("closeWindow");
            }, 3000);
          }
        }).catch(function (error) {
          _this.$toast.fail("系统繁忙！");

        });
      }
    },
    created () {
      this.termCode = globalTools.getUrlParam("termCode");
      this.userId = globalTools.getUrlParam("userId");
      // 获取剩余纸张
      this.queryRemainTissue();
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
