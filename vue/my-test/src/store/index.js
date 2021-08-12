import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    add(state) {
      state.count += 1
    }
  },
  getters: {
    dubboCount(state) {
      return state.count * 2
    }
  },
  actions: {
    add({ commit }) {
      setTimeout(() => {
        commit('add')
      }, 1000)
    }
  },
  modules: {
  }
})
