<template>
  <div class="app-container animated fadeIn faster" v-cloak>
    <div class="app-header" @touchmove.stop.prevent>
      <van-search
        v-model.trim="search"
        placeholder="请输入搜索关键词"
        show-action
        @search="searchClick"
      >
        <div slot="action" @click="searchClick">搜索</div>
      </van-search>
    </div>

    <div class="app-main" ref="mainBScroll">
      <div style="overflow: hidden;">
        <div class="scroll-loading">
          <van-loading class="loading" size="24"/>
          释放刷新...
        </div>
        <van-card
          :price="item.price"
          :title="item.title"
          :thumb="item.imgSrc"
          :origin-price="item.originPrice"
          @click.native="toDeviceDetails(item)"
          v-for="item in deviceList">
          <p class="device-title van-card__title" slot="title">【{{item.tag}}】 {{item.name}}</p>
          <p class="device-desc" slot="desc">{{item.desc}}</p>
        </van-card>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name   : 'buyDevice',
    data () {
      return {
        // 搜索
        search             : '',
        // BScrollEx实例
        mainBScrollInstance: null,
        // 设备列表
        deviceList         : []
      };
    },
    watch  : {
      // 设备列表变化刷新BScroll
      deviceList (newValue, oldValue) {
        if (this.mainBScrollInstance !== null) {
          this.mainBScrollInstance.finishPullDown();
          this.mainBScrollInstance.refresh();
        }
      }
    },
    methods: {
      // 搜索
      searchClick () {
        if (!this.search) return;
        this.getDeviceList();
      },
      // 获取设备列表
      getDeviceList () {
        let _this = this;

        _this.$axios.get('/deviceList', {
          search: _this.search
        }).then(function (response) {

        }).catch(function (error) {
          _this.deviceList = [
            {
              deviceId   : '001',
              imgSrc     : 'https://via.placeholder.com/90',
              tag        : '服务商',
              name       : '超级出纸机',
              desc       : '这里可以是描述',
              price      : '2.00',
              originPrice: '10.00'
            },
            {
              deviceId   : '001',
              imgSrc     : 'https://via.placeholder.com/90',
              tag        : '服务商',
              name       : '超级出纸机',
              desc       : '这里可以是描述',
              price      : '2.00',
              originPrice: '10.00'
            },
            {
              deviceId   : '001',
              imgSrc     : 'https://via.placeholder.com/90',
              tag        : '服务商',
              name       : '超级出纸机',
              desc       : '这里可以是描述',
              price      : '2.00',
              originPrice: '10.00'
            },
            {
              deviceId   : '001',
              imgSrc     : 'https://via.placeholder.com/90',
              tag        : '服务商',
              name       : '超级出纸机',
              desc       : '这里可以是描述',
              price      : '2.00',
              originPrice: '10.00'
            },
            {
              deviceId   : '001',
              imgSrc     : 'https://via.placeholder.com/90',
              tag        : '服务商',
              name       : '超级出纸机',
              desc       : '这里可以是描述',
              price      : '2.00',
              originPrice: '10.00'
            },
            {
              deviceId   : '001',
              imgSrc     : 'https://via.placeholder.com/90',
              tag        : '服务商',
              name       : '超级出纸机',
              desc       : '这里可以是描述',
              price      : '2.00',
              originPrice: '10.00'
            },
            {
              deviceId   : '001',
              imgSrc     : 'https://via.placeholder.com/90',
              tag        : '服务商',
              name       : '超级出纸机',
              desc       : '这里可以是描述',
              price      : '2.00',
              originPrice: '10.00'
            },
            {
              deviceId   : '001',
              imgSrc     : 'https://via.placeholder.com/90',
              tag        : '服务商',
              name       : '超级出纸机',
              desc       : '这里可以是描述',
              price      : '2.00',
              originPrice: '10.00'
            },
            {
              deviceId   : '001',
              imgSrc     : 'https://via.placeholder.com/90',
              tag        : '服务商',
              name       : '超级出纸机',
              desc       : '这里可以是描述',
              price      : '2.00',
              originPrice: '10.00'
            },
            {
              deviceId   : '001',
              imgSrc     : 'https://via.placeholder.com/90',
              tag        : '服务商',
              name       : '超级出纸机',
              desc       : '这里可以是描述',
              price      : '2.00',
              originPrice: '10.00'
            }
          ];
        });
      },
      // 跳转详情
      toDeviceDetails (item) {
        this.$router.push({name: 'deviceDetails', params: {deviceId: item.deviceId}});
      }
    },
    mounted () {
      let _this = this;

      // BScroll初始化
      _this.mainBScrollInstance = new _this.$BScroll(_this.$refs.mainBScroll, {
        click          : true,
        pullDownRefresh: {
          threshold: 50,
          stop     : 50
        }
      });
      _this.mainBScrollInstance.on('pullingDown', function () {
        _this.getDeviceList();
      });

      // 获取设备列表
      _this.getDeviceList();

    }
  };
</script>

<style lang="less" scoped>
  @base-green: #00c292;

  .app-header {
    position: relative;
    height: 45px;
  }

  .app-main {
    position: relative;
    height: calc(100% - 45px);
    margin: 0 -10px;
    padding: 0 10px;
    overflow: hidden;
  }

  .scroll-loading {
    position: absolute;
    top: -50px;
    left: 0;
    width: 100%;
    height: 50px;
    vertical-align: text-top;
    text-align: center;
    font-size: 14px;
    overflow: hidden;

    .loading {
      display: inline-block;
      width: 26px;
      height: 26px;
      margin-right: 10px;
    }
  }

  .device-title {
    margin: 0;
    font-size: 14px;
  }

  .device-desc {
    margin: 7px 0 0 0;
    line-height: 18px;
    color: #666;
    word-break: break-all;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
</style>
