<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view></router-view>
    <!-- <router-link to="/info1">info1</router-link>
    <router-link to="/info2">info2</router-link> -->
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  },
  method: {

  },
  created () {
  }
}
</script>

<style>
body,html{
  width: 100%;
  height: 100%;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
