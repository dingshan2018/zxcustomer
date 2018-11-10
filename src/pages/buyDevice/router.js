import Vue from 'vue';
import Router from 'vue-router';
import DeviceList from './views/DeviceList';
import DeviceDetails from './views/DeviceDetails';
import BuyHistory from './views/BuyHistory';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path      : '/',
      name      : 'deviceList',
      components: {
        main: DeviceList
      }
    },
    {
      path     : '/deviceDetails/:deviceId',
      name     : 'deviceDetails',
      components: {
        mainSub: DeviceDetails
      }
    },
    {
      path     : '/buyHistory',
      name     : 'buyHistory',
      components: {
        mainSub: BuyHistory
      }
    }
  ]
});
