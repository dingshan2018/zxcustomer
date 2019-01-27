<template>
  <div class="app-container">
    <van-cell-group class="input-group ">
      <van-field
        v-model="termCode"
        label="终端编号"
        disabled/>
      <van-field
        v-model="type.name"
        label="操作类型"
        placeholder="选择操作类型"
        @touchstart.native="onTypeTouchStart"/>
      <van-field
        v-model="device.name"
        label="设备"
        placeholder="选择设备"
        @touchstart.native="onDeviceTouchStart"/>
    </van-cell-group>
    <van-button type="default"
                class="submit-btn"
                block
                :disabled="!(!!termCode && !!type.name && !!device.name)"
                @click="submitClick">确认
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
      <van-picker :columns="devicePickerColumns"
                  value-key="name"
                  show-toolbar
                  title="选择设备"
                  @cancel="devicePopup = false"
                  @confirm="devicePickerConfirm"/>
    </van-popup>
  </div>
</template>

<script>
  export default {
    name: "replaceBoard",
    data () {
      return {
        // 终端号
        termCode: "",
        // 类型
        type: {},
        // 设备
        device: {},
        // 类型上拉菜单
        typeSheet: false,
        // 类型上拉菜单的数据
        typeActions: [
          {
            name: "换板",
            id: "01"
          },
          {
            name: "激活",
            id: "02"
          }
        ],
        // 设备弹出层
        devicePopup: false,
        // 设备选择器数据
        devicePickerColumns: [
          {
            name: "宝龙设备",
            code: "01"
          },
          {
            name: "爱琴海设备",
            code: "02"
          }
        ]
      };
    },
    methods: {
      // 微信用户信息
      getWxUserInfo () {
        let _this = this;
        //获取公众号用户信息
        let accessCode = globalTools.getUrlParam("code");

        if (accessCode == null) {
          //获取授权code的回调地址，获取到code，直接返回到当前页
          let fromurl = location.href;
          let url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4e2cf38426225453&redirect_uri=" +
            encodeURIComponent(fromurl) + "&response_type=code&scope=snsapi_userinfo&state=0#wechat_redirect";

          location.href = url;
        }
        else {
          _this.$axios.get("/wx/userInfo", {
            params: {
              code: accessCode,
              state: 0
            }
          }).then(function (response) {
            let data = response.data;
            // alert(JSON.stringify(data));
            if (data) {
              _this.userInfo = data.userInfo;

            }
          }).catch(function (error) {
            // alert('获取用户信息失败:' + JSON.stringify(error));
          });
        }
      },
      // 选择操作类型
      onTypeTouchStart (event) {
        event.preventDefault();
        this.typeSheet = true;
      },
      // 选择设备
      onDeviceTouchStart (event) {
        event.preventDefault();
        this.devicePopup = true;
      },
      // 类型选择事件
      typeSelect (item) {
        let _this = this;
        _this.type = item;
        _this.typeSheet = false;
      },
      // 设备选择确定
      devicePickerConfirm (item, index) {
        this.device = item;
        this.devicePopup = false;
      },
      // 提交确认按钮
      submitClick () {
        let _this = this;
        _this.$toast.loading({
          duration: 0,
          forbidClick: true,
          message: "加载中..."
        });
        _this.$axios.get("/http", {
          params: {
            termCode: _this.termCode,
            type: _this.type.id,
            deviceCode: _this.device.code
          }
        }).then(function (response) {
          let data = response.data;
          _this.$toast.clear();
          if (parseInt(data.code) !== 0) {
            return _this.$dialog.alert({
              title: "操作失败",
              message: data.error.message
            });
          }
          _this.$dialog.alert({
            title: "操作成功",
            message: data.error.message
          }).then(() => {
            WeixinJSBridge.call("closeWindow");
          });
        }).catch(function (error) {
          _this.$toast.fail("系统繁忙！");
        });
      }
    },
    created () {
      this.getWxUserInfo();
      this.termCode = globalTools.getUrlParam("termCode");
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
