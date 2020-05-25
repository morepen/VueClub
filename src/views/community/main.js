import Vue from 'vue'
import Vuex from 'vuex';
import App from './App.vue'
import gallery from './gallery'
import store from './store'
import VueScroller from 'vue-scroller'
Vue.use(Vuex);
Vue.use(store);
Vue.use(gallery, {
  swipeThreshold: 100,
  isIndexShow: true,
  useCloseButton: true,
  preload: false,
})

// new Vue({
//   el: '#app',
//   render: h => h(App),
// })
new Vue({
  store,
  //components: { App }  //vue1.0的写法
  render: h => h(App)    //vue2.0的写法
}).$mount('#app')

// demo 实例创建
