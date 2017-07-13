<template>
  <div class="front_employee">
    <h1 v-html="msg"></h1>
    <div class="list">
      <div class="listContainer" v-show="!change">
        <span v-for="(v,k) in userInfo" v-html="userInfo[k].name"></span>
      </div>
      <div class="changeContainer" v-show="change">
        <span>姓名</span>
        <input v-for="(v,k) in userInfo" v-model="userInfo[k].name">
      </div>
      <div class="del" v-show="change">
        <span>删除</span>
        <span v-for="(v,k) in userInfo" @click="deleteEmployee(userInfo[k].id)">x</span>
      </div>
      <div class="confirm,.del" v-show="change">
        <span>修改</span>
        <span v-for="(v,k) in userInfo" @click="changeEmployee(userInfo[k].name, userInfo[k].id)">确认</span>
      </div>
    </div>
    <button @click="change = !change" v-show="!change">修改信息</button><br>
    <input type="text" name="name" value="" placeholder="新增员工" v-model="newEmployee">
    <button @click="addEmployee">确认新增</button>
  </div>
</template>

<script>
export default {
  name: 'front_employee',
  data () {
    return {
      msg: 'front-end<br>员工信息',
      userInfo: false,
      change: false,
      newEmployee: ''
    }
  },
  created () {
    this.getEmployee()
  },
  methods: {
    addEmployee () {
      if (this.newEmployee) {
        this.$parent.loading = true
        this.$axios({
          method: 'post',
          url: '/api',
          data: {
            'action': 'add_name',
            'name': this.newEmployee
          }
        })
        .then((res) => {
          // console.log(result)
          this.getEmployee()
        })
      } else {
        alert('请输入员工信息')
      }
    },
    deleteEmployee (id) {
      this.$parent.loading = true
      this.$axios({
        method: 'post',
        url: '/api',
        data: {
          'action': 'delete_name',
          'id': id
        }
      })
      .then((res) => {
        let result = res.data
        console.log(result)
        this.getEmployee()
      })
      .then(() => {
        this.$parent.loading = false
      })
    },
    changeEmployee (val, key) {
      this.$parent.loading = true
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
        console.log(res.data)
        console.log('success')
        this.getEmployee()
      }).then(() => {
        this.$parent.loading = false
      })
    },
    getEmployee () {
      this.$parent.loading = true
      this.$axios({
        method: 'post',
        url: '/api',
        data: {
          'action': 'find_name'
        }
      })
      .then((res) => {
        let result = res.data
        // console.log(result)
        this.userInfo = result.data
      })
      .then(() => {
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
