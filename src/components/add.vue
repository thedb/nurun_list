<template>
  <div class="add">
    <h1 v-html="msg"></h1>
    <div class="container">
      <div>
        <span>添加姓名：</span>
        <input type="text" v-model="userName">
      </div>
      <div>
        <span>添加工作：</span>
        <select v-model="userWork">
            <option disabled value="">请选择</option>
            <option v-for="(v,k) in workInfo">{{workInfo[k].work}}</option>
        </select>
      </div>
      <div class="submint" @click="addUsers">提交</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'add',
  data () {
    return {
      msg: 'front-end<br>工作分配',
      userInfo: false,
      workInfo: false,
      userName: '',
      userWork: ''
    }
  },
  created () {
    this.$axios({
      method: 'post',
      url: '/api',
      data: {
        'action': 'find_work'
      }
    })
    .then((res) => {
      let result = res.data
      this.workInfo = result.data
      console.log(this.workInfo)
      // this.userInfo = result.data
    })
  },
  methods: {
    addUsers () {
      this.$axios({
        method: 'post',
        url: '/api',
        data: {
          'action': 'addUsers',
          'name': this.userName,
          'work': this.userWork
        }
      })
      .then((res) => {
        let result = res.data
        console.log(result)
        // this.userInfo = result.data
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.add{
  .container{
  }
  .submint{
    margin:0 auto;
    padding:10px;
    border:1px solid #ddd;
    width:100px;
    margin-top :30px;
    cursor:pointer;
  }
}
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
