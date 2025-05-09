import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    player: null,
    error: null
  },
  mutations: {
    setPlayer(state, player) {
      state.player = player
    },
    setError(state, error) {
      state.error = error
    }
  },
  actions: {
    async fetchPlayer({ commit }) {
      try {
        const response = await axios.get('http://localhost:8000/api/player/', {
          auth: {
            username: 'testuser',
            password: 'testpass123'
          }
        })
        commit('setPlayer', response.data)
      } catch (error) {
        commit('setError', error)
      }
    },
    async click({ commit, state }) {
      try {
        const response = await axios.post('http://localhost:8000/api/click/', {}, {
          auth: {
            username: 'testuser',
            password: 'testpass123'
          }
        })
        commit('setPlayer', { ...state.player, score: response.data.score })
      } catch (error) {
        commit('setError', error)
      }
    }
  }
})