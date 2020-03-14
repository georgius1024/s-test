import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
function random() {
  return Math.random() - 0.5
}
function defaultChoice(question) {
  if (question && question.type === 'sort') {
    return question.options
      .map((e, i) => i)
      .sort(random)
      .join(',')
  } else {
    return ''
  }
}
const testData = require('../test.json')
// .filter(
//  e => e.type === 'sort' /// e => e.type === '1/N' || e.type === 'M/N'
// )
const randomSequence = testData
  .map((e, index) => index)
  .sort(() => Math.random() - 0.5)
const state = {
  test: testData,
  sequence: randomSequence,
  position: 0,
  score: 0,
  messageText: '',
  messageColor: ''
}
const getters = {
  current: state => state.test[state.sequence[state.position]],
  completed: state => state.position >= state.test.length,
  defaultChoice: state =>
    defaultChoice(state.test[state.sequence[state.position]])
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
  reset: state => {
    state.position = 0
    state.score = 0
    state.sequence = testData
      .sort(() => Math.random() - 0.5)
      .map((e, index) => index)
    localStorage.setItem('position', state.position)
    localStorage.setItem('score', state.score)
    localStorage.setItem('sequence', JSON.stringify(state.sequence))
  },
  restore: state => {
    state.sequence = JSON.parse(localStorage.getItem('sequence'))
    if (!state.sequence) {
      state.sequence = randomSequence
      localStorage.setItem('sequence', JSON.stringify(state.sequence))
    }
    state.position = Number(localStorage.getItem('position')) || 0
    state.score = Number(localStorage.getItem('score')) || 0
  },
  message: (state, message) => {
    if (typeof message === 'string') {
      state.messageText = message
      state.messageColor = 'info'
    } else {
      const { text, color } = message
      state.messageText = text
      state.messageColor = color
    }
  }
}
export default new Vuex.Store({
  state,
  getters,
  mutations
})
