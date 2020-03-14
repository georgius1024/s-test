import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
  test: require('../test.json').filter(
    e => e.type === '1/N' || e.type === 'M/N'
  ),
  position: Number(localStorage.getItem('position')) || 0,
  score: Number(localStorage.getItem('score')) || 0
}
const getters = {
  current: state => state.test[state.position],
  completed: state => state.position >= state.test.length
}
const mutations = {
  next: state => {
    state.position++
    localStorage.setItem('position', state.position)
  },
  post: (state, choice) => {
    if (String(choice) === state.test[state.position].mask) {
      state.score++
      localStorage.setItem('score', state.score)
    }
  },
  reset() {
    state.position = 0
    localStorage.setItem('position', state.position)
    state.score = 0
    localStorage.setItem('score', state.score)
  }
}
export default new Vuex.Store({
  state,
  getters,
  mutations
})
