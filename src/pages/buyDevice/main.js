import 'lib-flexible';
import Vue from 'vue';
import router from './router';
import Axios from 'axios';
import { Button, Search, NavBar, Swipe, SwipeItem, Icon, Loading, Toast } from 'vant';
import '../../assets/js/global-tools.js';
import BScroll from 'better-scroll';
import '../../assets/css/base.less';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.prototype.$axios = Axios;

Vue.prototype.$BScroll = BScroll;

Vue.use(Button).
  use(Search).
  use(NavBar).
  use(Swipe).
  use(SwipeItem).
  use(Icon).
  use(Loading).
  use(Toast);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
