import 'lib-flexible';
import Vue from 'vue';
import router from './router';
import Axios from 'axios';
import {
  Row,
  Col,
  List,
  Button,
  Search,
  NavBar,
  Swipe,
  SwipeItem,
  Cell,
  CellGroup,
  Tab,
  Tabs,
  Card,
  SubmitBar,
  Popup,
  NumberKeyboard,
  Stepper,
  Icon,
  Dialog,
  Loading,
  Toast
} from 'vant';
import '../../assets/js/global-tools.js';
import BScroll from 'better-scroll';
import 'animate.css';
import '../../assets/css/base.less';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.prototype.$axios = Axios;

Vue.prototype.$BScroll = BScroll;

Vue.use(Row).
  use(Col).
  use(List).
  use(Button).
  use(Search).
  use(NavBar).
  use(Swipe).
  use(SwipeItem).
  use(Cell).
  use(CellGroup).
  use(Tab).
  use(Tabs).
  use(Card).
  use(SubmitBar).
  use(Popup).
  use(NumberKeyboard).
  use(Stepper).
  use(Icon).
  use(Dialog).
  use(Loading).
  use(Toast);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
