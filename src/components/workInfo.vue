<template>
  <div class="front_work">
    <h1 v-html="msg"></h1>
    <div class="list">
      <div class="listContainer" v-show="!change">
        <span>工作</span>
        <span v-for="(v,k) in workInfo" v-html="workInfo[k].work"></span>
      </div>
      <div class="changeContainer" v-show="change">
        <span>工作</span>
        <input v-for="(v,k) in workInfo" v-model="workInfo[k].work">
      </div>
      <div class="confirm" v-show="change">
        <span>修改</span>
        <span v-for="(v,k) in workInfo" @click="submintWork(workInfo[k].work, workInfo[k].id)">确认</span>
      </div>
    </div>
    <button @click="change = !change" v-show="!change">修改工作信息</button>
  </div>
</template>

<script>
export default {
  name: 'front_work',
  data () {
    return {
      msg: 'front-end<br>工作信息',
      workInfo: false,
      change: false
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
      console.log(result)
      this.workInfo = result.data
    })
    .then(() => {
      this.$parent.loading = false
    })
  },
  methods: {
    submintWork (val, key) {
      this.$axios({
        method: 'post',
        url: '/api',
        data: {
          'action': 'set_work',
          'work': val,
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
