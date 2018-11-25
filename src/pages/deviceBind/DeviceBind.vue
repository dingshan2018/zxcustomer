<template>
  <div class="app-container" @touchmove.stop.prevent @click="appContainerClick">
    <van-cell-group class="input-group">
      <van-field
        v-model="termCode"
        label="终端编号"
        disabled/>

      <!--           icon="more-o"
          @click-icon="devicePopup = true" -->
      <div class="field-query">
        <van-field
          v-model="deviceCode"
          label="设备号"
          placeholder="填写设备号"
          required
          clearable
          @click.native.stop/>

        <div class="field-query__list" v-show="queryListShow">
          <ul @touchmove.stop>
            <li class="field-query__item van-ellipsis van-hairline--bottom"
                v-for="item in onlineDevice"
                :key="item.deviceId"
                @click.stop="onlineDeviceClick(item)">{{item.deviceSn}}
            </li>
          </ul>
        </div>
      </div>

    </van-cell-group>

    <van-button type="default"
                class="submit-btn"
                block
                :disabled="!(!!termCode && !!deviceCode)"
                @click="submitClick">绑定
    </van-button>

    <!-- 设备列表 -->
    <van-popup v-model="devicePopup" position="bottom">
      <van-picker :columns="deviceCodeList"
                  value-key="code"
                  show-toolbar
                  title="选择设备"
                  @cancel="devicePopup = false"
                  @confirm="devicePickerConfirm"/>
    </van-popup>
  </div>
</template>

<script>
  export default {
    name    : "deviceBind",
    data () {
      return {
        // 终端号
        termCode      : "",
        // 设备号
        deviceCode    : "",
        // 模糊查询列表点击时记录的旧设备号value
        oldDeviceCode : "",
        // 模糊查询列表点击
        queryListClick: false,
        // 模糊查询设备列表
        onlineDevice  : [],
        // 设备弹出层
        devicePopup   : false,
        // 设备选择器数据
        deviceCodeList: []
      };
    },
    watch   : {
      // 监听设备号，模糊查询
      "deviceCode": function (newV, oldV) {
        if (!oldV || oldV !== this.oldDeviceCode)
          this.queryListClick = false;

        this.queryOnlineDevice();
      }
    },
    computed: {
      // 模糊查询下拉列表显示
      "queryListShow": function () {
        if (this.queryListClick) {
          return false;
        } else if (!this.onlineDevice.length) {
          return false;
        }
        return true;
      }
    },
    methods : {
      // appContainer点击
      appContainerClick () {
        if (!this.queryListClick)
          this.queryListClick = true;
      },
      // 获取设备号列表
      getDeviceCodeList () {
        let _this = this;

        _this.$axios.get("/http", {
          params: {
            type: _this.type.id
          }
        }).then(function (response) {
          let data = response.data;
          _this.deviceCodeList = data.deviceCodeList;
        }).catch(function (error) {

        });
      },
      // 设备选择确定
      devicePickerConfirm (item, index) {
        this.deviceCode = item.code;
        this.devicePopup = false;
      },
      // 模糊查询
      queryOnlineDevice () {
        let _this = this;

        _this.$axios.get("/wx/queryOnlineDevice", {
          params: {
            deviceCode  : _this.deviceCode,
            deviceStatus: "02",
            pageNo      : "",
            pageSize    : ""
          }
        }).then(function (response) {
          let data = response.data;

          _this.onlineDevice = data.onlineDevice;
        }).catch(function () {
          _this.$toast.fail("系统繁忙！");

          /*let data = [];
          for (var i = 0; i < 10; i++) {
            data.push({
              deviceId: i,
              deviceSn: new Date().getTime()
            });
          }
          _this.onlineDevice = data;*/
        });
      },
      // 查询设备item的点击
      onlineDeviceClick (item) {
        this.oldDeviceCode = this.deviceCode.toString();
        this.queryListClick = true;
        this.deviceCode = item.deviceSn;
      },
      // 提交确认按钮
      submitClick () {
        let _this = this;

        _this.$toast.loading({
          duration   : 0,
          forbidClick: true,
          message    : "加载中..."
        });

        _this.$axios.get("/wx/activeTerminal", {
          params: {
            userId    : _this.userId,
            termCode  : _this.termCode,
            deviceCode: _this.deviceCode
          }
        }).then(function (response) {
          let data = response.data;
          _this.$toast.success(data.error.message);

          if (parseInt(data.code) === 0) {
            setTimeout(function () {
              WeixinJSBridge.call("closeWindow");
            }, 3000);
          }
        }).catch(function () {
          _this.$toast.fail("系统繁忙！");

        });
      }
    },
    created () {
      this.termCode = globalTools.getUrlParam("termCode");
      this.userId = globalTools.getUrlParam("userId");

      // this.getDeviceCodeList();
    }
  };
</script>

<style lang="less" scoped>
  @base-green: #00c292;

  .field-query__list {
    position: relative;

    ul {
      z-index: 1;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      max-height: 190px;
      padding: 10px 0 10px calc(15px + 10px);
      overflow-x: hidden;
      overflow-y: scroll;
      background-color: #fff;
      box-shadow: 0px 2px 1px 0 #efefef;
      -webkit-overflow-scrolling: touch;
    }

    .field-query__item {
      padding: 0 10px 0 90px;
      line-height: 44px;
      font-size: 14px;
    }
  }

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
