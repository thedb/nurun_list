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
      <div class="del" v-show="change">
        <span>删除</span>
        <span v-for="(v,k) in workInfo" @click="deleteWork(workInfo[k].id)">x</span>
      </div>
      <div class="confirm" v-show="change">
        <span>修改</span>
        <span v-for="(v,k) in workInfo" @click="changeWork(workInfo[k].work, workInfo[k].id)">确认</span>
      </div>
    </div>
    <button @click="change = !change" v-show="!change">修改工作信息</button><br>
    <input type="text" name="work" value="" placeholder="新增工作" v-model="newWork">
    <button @click="addWork">确认新增</button>
  </div>
</template>

<script>
export default {
  name: 'front_work',
  data () {
    return {
      msg: 'front-end<br>工作信息',
      workInfo: false,
      change: false,
      newWork: ''
    }
  },
  created () {
    this.getWork()
  },
  methods: {
    addWork () {
      this.$parent.loading = true
      this.$axios({
        method: 'post',
        url: '/api',
        data: {
          'action': 'add_work',
          'work': this.newWork
        }
      })
      .then((res) => {
        if (parseInt(res.data.result) === 1) {
          alert('添加成功')
          this.getWork()
        } else {
          console.log(res.data)
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    deleteWork (key) {
      this.$parent.loading = true
      this.$axios({
        method: 'post',
        url: '/api',
        data: {
          'action': 'delete_work',
          'id': key
        }
      })
      .then((res) => {
        if (parseInt(res.data.result) === 1) {
          alert('删除成功')
          this.getWork()
        } else {
          console.log(res.data)
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    changeWork (val, key) {
      this.$parent.loading = true
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
        if (parseInt(res.data.result) === 1) {
          alert('修改成功')
          this.getWork()
        } else {
          console.log(res.data)
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    getWork () {
      this.$axios({
        method: 'post',
        url: '/api',
        data: {
          'action': 'find_work'
        }
      }).then((res) => {
        let result = res.data
        console.log(result)
        this.workInfo = result.data
      }).then(() => {
        this.$parent.loading = false
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
  .listContainer,.changeContainer,.confirm,.del{
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
button{
  margin-top: 20px;
  margin-bottom: 40px;
}

</style>
