<template>
  <!-- <HelloWorld msg="Ładna jestes Mahujek"/> -->
  <!-- <BasicEndpoint /> -->
  <FlowerAnimation />
</template>

<script>
// import BasicEndpoint from './components/BasicEndpoint.vue';
// import HelloWorld from './components/HelloWorld.vue'
import FlowerAnimation from './components/FlowerAnimation.vue';

export default {
  name: 'App',
  _components: {
    // HelloWorld,
    // BasicEndpoint,
    FlowerAnimation
  },
  get components() {
    return this._components;
  },
  set components(value) {
    this._components = value;
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
