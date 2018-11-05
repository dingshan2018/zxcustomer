<template>
  <div class="app-container" v-cloak>
    <div class="app-header">
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
      <div>
        <div class="scroll-loading">
          <van-loading class="loading" size="24"/>
          释放刷新...
        </div>
        <div class="device-item" v-for="item in deviceList" @click="toDeviceDetails(item)">
          <div class="device-img">
            <img :src="item.img">
          </div>
          <div class="device-info">
            <p class="device-title">{{item.name}}</p>
            <p class="device-details">{{item.details}}</p>
          </div>
        </div>
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
        search       : '',
        // BScrollEx实例
        mainBScrollEx: null,
        // 设备列表
        deviceList   : []
      };
    },
    watch  : {
      // 设备列表变化刷新BScroll
      deviceList (newValue, oldValue) {
        if (this.mainBScrollEx !== null) {
          this.mainBScrollEx.finishPullDown();
          this.mainBScrollEx.refresh();
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
              deviceId: '001',
              img     : 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541336099791&di=962bc16ed6ed5dc0b52239fc8e0dec65&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F5243fbf2b211931376d158d568380cd790238dc1.jpg',
              name    : '超级出纸机',
              details : '这里可以是描述'
            },
            {
              deviceId: '002',
              img     : 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541336099791&di=962bc16ed6ed5dc0b52239fc8e0dec65&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F5243fbf2b211931376d158d568380cd790238dc1.jpg',
              name    : '超级出纸机',
              details : '这里可以是描述'
            },
            {
              deviceId: '003',
              img     : 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541336099791&di=962bc16ed6ed5dc0b52239fc8e0dec65&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F5243fbf2b211931376d158d568380cd790238dc1.jpg',
              name    : '超级出纸机',
              details : '这里可以是描述'
            },
            {
              deviceId: '004',
              img     : 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541336099791&di=962bc16ed6ed5dc0b52239fc8e0dec65&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F5243fbf2b211931376d158d568380cd790238dc1.jpg',
              name    : '超级出纸机',
              details : '这里可以是描述'
            },
            {
              deviceId: '005',
              img     : 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541336099791&di=962bc16ed6ed5dc0b52239fc8e0dec65&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F5243fbf2b211931376d158d568380cd790238dc1.jpg',
              name    : '超级出纸机',
              details : '这里可以是描述'
            },
            {
              deviceId: '006',
              img     : 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541336099791&di=962bc16ed6ed5dc0b52239fc8e0dec65&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F5243fbf2b211931376d158d568380cd790238dc1.jpg',
              name    : '超级出纸机',
              details : '这里可以是描述'
            },
            {
              deviceId: '007',
              img     : 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541336099791&di=962bc16ed6ed5dc0b52239fc8e0dec65&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F5243fbf2b211931376d158d568380cd790238dc1.jpg',
              name    : '超级出纸机',
              details : '这里可以是描述'
            },
            {
              deviceId: '008',
              img     : 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541336099791&di=962bc16ed6ed5dc0b52239fc8e0dec65&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F5243fbf2b211931376d158d568380cd790238dc1.jpg',
              name    : '超级出纸机',
              details : '这里可以是描述'
            },
            {
              deviceId: '009',
              img     : 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541336099791&di=962bc16ed6ed5dc0b52239fc8e0dec65&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F5243fbf2b211931376d158d568380cd790238dc1.jpg',
              name    : '超级出纸机',
              details : '这里可以是描述'
            },
            {
              deviceId: '010',
              img     : 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541336099791&di=962bc16ed6ed5dc0b52239fc8e0dec65&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F5243fbf2b211931376d158d568380cd790238dc1.jpg',
              name    : '超级出纸机',
              details : '这里可以是描述'
            }];
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
      _this.mainBScrollEx = new _this.$BScroll(_this.$refs.mainBScroll, {
        click          : true,
        pullDownRefresh: {
          threshold: 50,
          stop     : 50
        }
      });
      _this.mainBScrollEx.on('pullingDown', function () {
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

  .device-item {
    position: relative;
    height: 132px;
    padding: 5px 0;
    border-bottom: 2px solid #f2f2f2;
    background-color: #fff;
    overflow: hidden;

    a {
      display: block;
      overflow: auto;
    }
  }

  .device-img {
    float: left;
    width: 120px;
    height: 120px;
    margin-right: 10px;
    overflow: hidden;

    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  .device-info {
    display: block;

    p {
      margin: 0;
    }

    .device-title {
      margin-top: 5px;
      max-height: 40px;
      line-height: 20px;
      font-size: 16px;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .device-details {
      margin-top: 5px;
      font-size: 14px;
      color: #888;
    }
  }
</style>
