<template>
  <div class="app-container device-bind">
    <van-cell-group class="input-group">
      <van-field
        v-model="termCode"
        label="终端编号"
        disabled/>

     <!--<van-field
        v-model="type.name"
        label="操作类型"
        placeholder="选择操作类型"
        @click.native="typeSheet = true"/>-->

      <!-- icon="more-o"
        @click-icon="devicePopup = true" -->
      <van-field
        v-model="deviceCode"
        label="设备号"
        placeholder="填写设备号"
        required
        clearable/>

    </van-cell-group>

    <van-button type="default"
                class="submit-btn"
                block
                :disabled="!(!!termCode && !!deviceCode)"
                @click="submitClick">绑定
    </van-button>

    <!-- 上拉菜单 -->
    <van-actionsheet
      v-model="typeSheet"
      :actions="typeActions"
      cancel-text="取消"
      @select="typeSelect"
      @cancel="typeActionSheet = false"/>

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
    name   : 'deviceBind',
    data () {
      return {
        // 终端号
        termCode      : '',
        // 类型
        type          : {
          name: '换板',
          id  : '01'
        },
        // 设备号
        deviceCode    : '',
        // 类型上拉菜单
        typeSheet     : false,
        // 类型上拉菜单的数据
        typeActions   : [
          {
            name: '换板',
            id  : '01'
          },
          {
            name: '激活',
            id  : '02'
          }
        ],
        // 设备弹出层
        devicePopup   : false,
        // 设备选择器数据
        deviceCodeList: []
      };
    },
    methods: {
      // 类型选择事件
      typeSelect (item) {
        let _this = this;

        _this.type = item;
        _this.typeSheet = false;

        _this.getDeviceCodeList();
      },
      // 获取设备号列表
      getDeviceCodeList () {
        let _this = this;

        _this.$axios.get('/http', {
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
      // 提交确认按钮
      submitClick () {
        let _this = this;

        _this.$toast.loading({
          duration   : 0,
          forbidClick: true,
          message    : '加载中...'
        });

        _this.$axios.get('/wx/activeTerminal', {
          params: {
            termCode  : _this.termCode,
            deviceCode: _this.deviceCode
          }
        }).then(function (response) {
          let data = response.data;
          _this.$toast.success(data.error.message);

          if (parseInt(data.code) === 0) {
            setTimeout(WeixinJSBridge.call('closeWindow'), 3000);
          }
        }).catch(function () {
          _this.$toast.fail('系统繁忙！');

        });
      }
    },
    created () {
      this.getDeviceCodeList();
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
