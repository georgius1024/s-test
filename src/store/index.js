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
function randomSequence(questions) {
  return questions.map((e, index) => index).sort(() => Math.random() - 0.5)
}

const testData = require('../test.json')
/*
testData.questions = testData.questions.filter(
  //e => e.type === 'sort' ///
  //e => e.type === '1/N'
  e => e.type === 'M/N'
)
*/

const initailRandomSequence = randomSequence(testData.questions)
const state = {
  questions: testData.questions,
  sequence: initailRandomSequence,
  position: 0,
  score: 0,
  messageText: '',
  messageColor: ''
}
const getters = {
  current: state => state.questions[state.sequence[state.position]],
  length: state => state.questions.length,
  completed: state => state.position >= state.questions.length,
  defaultChoice: state =>
    defaultChoice(state.questions[state.sequence[state.position]]),
  rightChoice: state =>
    state.position < state.questions.length &&
    state.questions[state.sequence[state.position]].mask
}
const mutations = {
  next: state => {
    state.position++
    localStorage.setItem('position', state.position)
  },
  post: (state, choice) => {
    if (
      String(choice) === state.questions[state.sequence[state.position]].mask
    ) {
      state.score++
      localStorage.setItem('score', state.score)
    }
  },
  reset: state => {
    state.position = 0
    state.score = 0
    state.sequence = randomSequence(testData.questions)
    localStorage.setItem('position', state.position)
    localStorage.setItem('score', state.score)
    localStorage.setItem('sequence', JSON.stringify(state.sequence))
  },
  restore: state => {
    state.sequence = JSON.parse(localStorage.getItem('sequence'))
    if (!state.sequence) {
      state.sequence = initailRandomSequence
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
