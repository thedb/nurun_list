<template>
  <div class="front_employee">
    <h1 v-html="msg"></h1>
    <div class="list">
      <div class="listContainer" v-show="!change">
        <span>姓名</span>
        <span v-for="(v,k) in userInfo" v-html="userInfo[k].name"></span>
      </div>
      <div class="changeContainer" v-show="change">
        <span>姓名</span>
        <input v-for="(v,k) in userInfo" v-model="userInfo[k].name">
      </div>
      <div class="confirm" v-show="change">
        <span>修改</span>
        <span v-for="(v,k) in userInfo" @click="submintEmployee(userInfo[k].name, userInfo[k].id)">确认</span>
      </div>
    </div>
    <button @click="change = !change" v-show="!change">修改信息</button>
  </div>
</template>

<script>
export default {
  name: 'front_employee',
  data () {
    return {
      msg: 'front-end<br>员工信息',
      userInfo: false,
      change: false
    }
  },
  created () {
    this.$axios({
      method: 'post',
      url: '/api',
      data: {
        'action': 'find_name'
      }
    })
    .then((res) => {
      let result = res.data
      console.log(result)
      this.userInfo = result.data
    })
    .then(() => {
      this.$parent.loading = false
    })
  },
  methods: {
    submintEmployee (val, key) {
      this.$axios({
        method: 'post',
        url: '/api',
        data: {
          'action': 'set_name',
          'name': val,
          'id': key
        }
      })
      .then((res) => {
        let result = res.data
        console.log(result)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.list{
  display: flex;
  flex-direction:row;
  justify-content:center;
  span{
    display: block;
    width: 100px;
    height: 40px;
    line-height: 40px;
    border: 2px solid #ddd;
  }
  .listContainer,.changeContainer,.confirm{
    display: flex;
    flex-direction:column;
  }
  input{
    display: block;
    width: 100px;
    height: 40px;
    line-height: 40px;
    border-width: 1px;
  }
}

</style>
