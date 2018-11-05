import 'lib-flexible';
import Vue from 'vue';
import Axios from 'axios';
import { Button, Toast } from 'vant';
import '../../assets/js/global-tools.js';
import '../../assets/css/base.less';
import App from './PaperOutput.vue';

Vue.config.productionTip = false;

Vue.prototype.$axios = Axios;

Vue.use(Button).use(Toast);

new Vue({
  render: h => h(App)
}).$mount('#app');
