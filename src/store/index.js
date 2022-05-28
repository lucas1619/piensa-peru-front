import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    user: null
  },
  getters: {
  },
  mutations: {
    setToken(state, token) {
      localStorage.setItem('token', 'token')
      state.token = token
    },
    setUser(state, user) {
      localStorage.setItem('user', JSON.stringify(user))
      state.user = user
    }
  },
  actions: {
  },
  modules: {
  }
})
