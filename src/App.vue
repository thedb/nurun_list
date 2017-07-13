<template>
  <div id="app">
    <div class="loading" v-show="loading"><span>loading..</span></div>
    <img style="width:12%" src="./assets/logo.png"><br>
    <router-link to="/">首页</router-link>
    <router-link to="/employeeInfo">员工信息</router-link>
    <router-link to="/workInfo">工作信息</router-link>
    <router-link to="/addTask">工作分配</router-link>
    <router-link to="/uploadImg">上传头像</router-link>
    <transition name="ani" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      loading: true
    }
  },
  method: {

  },
  created () {
    // console.log($('.loading'))
  }
}
</script>

<style lang="scss" scoped>
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
  .loading{
    width: 100%;
    height: 100%;
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    bottom:0;
    display: flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    font-size: 28px;
    background-color: #ddd;
    opacity: 0.8;
  }
}
.ani-enter-active, .ani-leave-active {
  transition: all 0.5s ease-in-out;
}
.ani-enter{
  transform: translateX(-100%)
}
.ani-leave-to{
  transform: translateX(100%)
}
</style>
