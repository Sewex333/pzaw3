import { createRouter, createWebHistory } from 'vue-router'
import GameView from '../views/Game.vue'

const routes = [
  {
    path: '/',
    name: 'game',
    component: GameView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router