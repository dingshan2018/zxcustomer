<template>
  <div class="app-container animated fadeIn faster">
    <div class="app-header" @touchmove.stop.prevent>
      <van-nav-bar
        title="购买历史"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
      />
    </div>

    <main class="app-main" ref="mainBScroll">
      <div class="record-list">
        <van-row class="record-list__head">
          <van-col span="6" class="van-ellipsis">购买日期</van-col>
          <van-col span="6" class="van-ellipsis">商品名称</van-col>
          <van-col span="6" class="van-ellipsis">购买数量</van-col>
          <van-col span="6" class="van-ellipsis">支付金额</van-col>
        </van-row>
        <van-row v-for="item in list" :key="item.id">
          <van-col span="6" class="van-ellipsis">{{item.buyDate}}</van-col>
          <van-col span="6" class="van-ellipsis">{{item.deviceName}}</van-col>
          <van-col span="6" class="van-ellipsis">{{item.quantity}}</van-col>
          <van-col span="6" class="van-ellipsis">¥{{item.money}}</van-col>
        </van-row>
      </div>
    </main>
  </div>
</template>

<script>
  export default {
    name   : 'buyHistory',
    data () {
      return {
        // BScroll实例
        mainBScrollInstance: null,
        // 列表list
        list               : []
      };
    },
    watch  : {
      // 设备列表变化刷新BScroll
      list (newValue, oldValue) {
        if (this.mainBScrollInstance !== null) {
          this.mainBScrollInstance.refresh();
        }
      }
    },
    methods: {
      getHistory () {
        let _this = this;
        _this.$axios.get('/buyDevice').then(function (response) {

        }).catch(function (error) {
          _this.list = [
            {
              id        : '1',
              buyDate   : '2018-12-12 12:12:12',
              deviceName: '出纸机',
              quantity  : 1,
              money     : 6800
            },
            {
              id        : '2',
              buyDate   : '2018-12-12 12:12:12',
              deviceName: '出纸机',
              quantity  : 1,
              money     : 6800
            },
            {
              id        : '3',
              buyDate   : '2018-12-12 12:12:12',
              deviceName: '出纸机',
              quantity  : 1,
              money     : 6800
            },
            {
              id        : '4',
              buyDate   : '2018-12-12 12:12:12',
              deviceName: '出纸机',
              quantity  : 1,
              money     : 6800
            },
            {
              id        : '5',
              buyDate   : '2018-12-12 12:12:12',
              deviceName: '出纸机',
              quantity  : 1,
              money     : 6800
            },
            {
              id        : '6',
              buyDate   : '2018-12-12 12:12:12',
              deviceName: '出纸机',
              quantity  : 1,
              money     : 6800
            },
            {
              id        : '7',
              buyDate   : '2018-12-12 12:12:12',
              deviceName: '出纸机',
              quantity  : 1,
              money     : 6800
            },
            {
              id        : '8',
              buyDate   : '2018-12-12 12:12:12',
              deviceName: '出纸机',
              quantity  : 1,
              money     : 6800
            },
            {
              id        : '9',
              buyDate   : '2018-12-12 12:12:12',
              deviceName: '出纸机',
              quantity  : 1,
              money     : 6800
            }
          ];
        });
      }
    },
    created () {
      this.getHistory();
    },
    mounted () {
      let _this = this;

      // BScroll初始化
      _this.mainBScrollInstance = new _this.$BScroll(_this.$refs.mainBScroll, {
        click: true
      });

    }
  };
</script>

<style lang="less" scoped>
  @base-green: #00c292;

  .app-main {
    position: relative;
    height: calc(100% - 46px);
    padding: 0 10px;
  }

  .record-list {
    position: relative;
    margin: 0 -10px;
    padding: 0 10px;

    .van-row {
      border-bottom: 1px solid #eee;
      animation-delay: 0.4s;
    }

    .van-col {
      padding: 0 5px;
      line-height: 40px;
      text-align: center;
      font-size: 12px;
    }
  }

  .record-list__head .van-col {
    font-size: 13px;
  }
</style>
