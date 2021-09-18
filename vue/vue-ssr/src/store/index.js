import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

/* eslint-disable no-new */

export function createStore() {
  return new Vuex.Store({
    state: {
      count: 1
    },
    mutations: {
      add(state) {
        state.count++
      },
      init(state, payload) {
        state.count = payload.count
      }
    },
    actions: {
      async getCount({ commit }) {
        let count = await new Promise((resolve) => {
          setTimeout(() => { resolve(Math.random()) }, 1000)
        })
        commit('init', { count })
      }
    }
  })
}
