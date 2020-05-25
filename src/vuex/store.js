import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex);

// 1.state 在vuex用于存储数据
const state = {
  hosturl:'https://www.xdty.net',
  address:'',
  articlenum:0,
  userid:'0',
  userinfo:{
          id:0,
          username:"游客"
  }
  
}

// 2.mutations 里面放方法 主要用于改变state里面的数据
const mutations = {
  User(state, payload) {
    state.userinfo = payload;
  }
}

const actions = {
  saveUser(context, args) {
    context.commit('User', args)
  }
}

// 3. 实例化 Vuex.Store
const store = new Vuex.Store({
  // state:state
  state, //相当于上面的简写
  // mutations:mutations
  mutations, //相当于上面的简写
  actions,
  plugins: [createPersistedState()]
})

// 4. 把 store 暴露出去
export default store;
