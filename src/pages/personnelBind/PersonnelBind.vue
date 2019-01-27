<template>
  <div class="app-container">
    <van-cell-group class="input-group">
      <van-field
        v-model="name"
        label="用户名"
        disabled/>
      <van-field
        v-model="phone"
        label="手机号"
        disabled/>
    </van-cell-group>
    <van-button type="default" class="submit-btn" :disabled="!userInfo.openId" block @click="submitClick">绑定</van-button>
  </div>
</template>

<script>
  export default {
    name: "PersonnelBind",
    data () {
      return {
        userId: "",
        name: "",
        phone: "",
        userInfo: {}
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
      // 绑定
      submitClick () {
        let _this = this;
        _this.$toast.loading({
          duration: 0,
          forbidClick: true,
          message: "加载中..."
        });
        _this.$axios.get("/wx/bindWxUser", {
          params: {
            userId: _this.userId,
            openId: _this.userInfo.openId
          }
        })
          .then(function (response) {
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
          })
          .catch(function (error) {
            _this.$toast.fail("系统繁忙，请稍后再试！");
          });
      }
    },
    created () {
      this.getWxUserInfo();
      this.userId = globalTools.getUrlParam("userId");
      this.name = globalTools.getUrlParam("name");
      this.phone = globalTools.getUrlParam("phone");
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
