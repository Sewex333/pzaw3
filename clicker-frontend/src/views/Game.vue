<template>
  <div class="game-container">
    <h1>Clicker Game</h1>
    <div v-if="player">
      <h2>Welcome, {{ player.user.username }}!</h2>
      <div class="score">Score: {{ player.score }}</div>
      <div class="power">Click Power: {{ player.click_power }}</div>
      <button @click="handleClick" class="click-button">CLICK ME!</button>
    </div>
    <div v-else>
      <p>Loading player data...</p>
    </div>
    <div v-if="error" class="error">
      {{ error.message }}
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'GameView',
  computed: {
    ...mapState(['player', 'error'])
  },
  methods: {
    ...mapActions(['fetchPlayer', 'click']),
    handleClick() {
      this.click()
    }
  },
  created() {
    this.fetchPlayer()
  }
}
</script>

<style>
.game-container {
  text-align: center;
  margin-top: 50px;
}

.click-button {
  padding: 20px 40px;
  font-size: 24px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 20px;
}

.click-button:hover {
  background-color: #45a049;
}

.score, .power {
  font-size: 20px;
  margin: 10px 0;
}

.error {
  color: red;
  margin-top: 20px;
}
</style>