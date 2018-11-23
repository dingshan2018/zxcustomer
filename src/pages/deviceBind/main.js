import 'lib-flexible';
import Vue from 'vue';
import Axios from 'axios';
import { Button, Field, CellGroup, Picker, Popup, Actionsheet, Toast } from 'vant';
import '../../assets/js/global-tools.js';
import '../../assets/css/base.less';
import App from './DeviceBind.vue';

Vue.config.productionTip = false;

Vue.prototype.$axios = Axios;

Vue.use(Button).use(Field).use(CellGroup).use(Picker).use(Popup).use(Actionsheet).use(Toast);

new Vue({
  render: h => h(App)
}).$mount('#app');
