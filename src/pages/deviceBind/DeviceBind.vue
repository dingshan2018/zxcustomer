<template>
  <div class="app-container" @touchmove.stop.prevent @click="appContainerClick">
    <template v-if="role !== 'FACTORY'">
      <van-cell-group class="input-group">
        <van-field
          v-model="termCode"
          label="终端编号"
          disabled/>

        <van-field
          v-model="activeType.name"
          label="操作类型"
          placeholder="选择操作类型"
          required
          @click.native="typeSheet = true"/>

        <div class="field-query">
          <van-field
            v-model="deviceCode"
            label="资产编号"
            placeholder="填写资产编号"
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
                  :disabled="!(!!termCode && !!activeType && !!deviceCode)"
                  @click="submitClick">绑定
      </van-button>

      <!-- 操作类型上拉菜单 -->
      <van-actionsheet
        v-model="typeSheet"
        :actions="typeActions"
        cancel-text="取消"
        @select="typeSelect"/>

      <!-- 设备列表 -->
      <van-popup v-model="devicePopup" position="bottom">
        <van-picker :columns="deviceCodeList"
                    value-key="code"
                    show-toolbar
                    title="选择设备"
                    @cancel="devicePopup = false"
                    @confirm="devicePickerConfirm"/>
      </van-popup>
    </template>
    <template v-if="role === 'FACTORY'">
      <van-button type="default"
                  class="submit-btn"
                  block
                  @click="onFactory">老化
      </van-button>
    </template>
  </div>
</template>

<script>
  export default {
    name    : "deviceBind",
    data () {
      return {
        // 用户信息
        userInfo      : {},
        // 用户角色
        role          : "",
        // 终端号
        termCode      : "",
        // 操作类型
        activeType    : {
          name : "",
          value: ""
        },
        // 类型上拉菜单
        typeSheet     : false,
        // 类型上拉菜单的数据
        typeActions   : [
          {
            name : "激活",
            value: "1"
          },
          {
            name : "换版",
            value: "2"
          }
        ],
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
        }
        else if (!this.onlineDevice.length) {
          return false;
        }
        return true;
      }
    },
    methods : {
      // 微信用户信息
      getWxUserInfo () {
        let _this = this;
        //获取公众号用户信息
        let accessCode = globalTools.getUrlParam("code");
        // alert("accessCode_____" + accessCode);
        if (accessCode == null) {
          //获取授权code的回调地址，获取到code，直接返回到当前页
          let fromurl = location.href;
          let url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4e2cf38426225453&redirect_uri=" +
            encodeURIComponent(fromurl) +
            "&response_type=code&scope=snsapi_userinfo&state=0#wechat_redirect";

          location.href = url;
        }
        else {
          // alert("请求/wx/userInfo_____");
          _this.$axios.get("/wx/userInfo", {
            params: {
              code : accessCode,
              state: 0
            }
          }).then(function (response) {
            // alert("获取用户信息成功:" + JSON.stringify(response.data));
            let data = response.data;

            if (!data && !data.userInfo) {
              return _this.$dialog.alert({
                message: "获取用户信息失败"
              });
            }

            // 用户数据
            _this.userInfo = data.userInfo;

            // 角色 FACTORY
            if (_this.userInfo.role &&
              _this.userInfo.role.indexOf("FACTORY") !== -1) {
              return _this.role = "FACTORY";
            }

            // alert("用户是否关注_____" + data.userInfo.subscribe);
            // 用户未关注
            if (!data.userInfo.subscribe) {
              // location.href = "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzAxNzcwODE2MA==&scene=110#wechat_redirect";
              location.href = "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzUyOTM0OTc2NQ==&scene=126#wechat_redirect";
            }

          }).catch(function (error) {
            _this.$dialog.alert({
              title  : "系统发生错误",
              message: error
            });
          });
        }
      },
      // appContainer点击
      appContainerClick () {
        if (!this.queryListClick)
          this.queryListClick = true;
      },
      // 类型选择事件
      typeSelect (item) {
        let _this = this;

        _this.activeType = item;
        _this.typeSheet = false;
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
            deviceStatus: "01,02,03",
            pageNo      : "",
            pageSize    : "",
            activeType  : _this.activeType.value
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
            userId    : _this.userInfo.userId,
            termCode  : _this.termCode,
            deviceCode: _this.deviceCode,
            activeType: _this.activeType.value
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
      },
      // 角色 FACTORY 按钮
      onFactory () {
        let _this = this;

        _this.$toast.loading({
          duration   : 0,
          forbidClick: true,
          message    : "加载中..."
        });

        _this.$axios.get("http://mp.dingscm.com/wx/factoryTest", {
          params: {
            userId  : _this.userInfo.userId,
            termCode: _this.termCode
          }
        })
          .then(function (response) {})
          .catch(function (e) {})
          .then(function () {
            _this.$toast.clear();
          });
      }
    },
    created () {
      this.termCode = globalTools.getUrlParam("termCode");
      let userId = globalTools.getUrlParam("userId");
      userId ? this.userInfo.userId = userId : this.getWxUserInfo();

      // this.getDeviceCodeList();
    }
  };
</script>

<style lang="less" scoped>
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
    background-color: #00c292;
  }
</style>
