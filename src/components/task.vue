<template>
  <div class="front_task">
    <h1 v-html="msg"></h1>
    <div class="Container">
      <div class="listHead">
        <span>姓名</span>
        <span v-for="(v,k) in workInfo" v-html="workInfo[k].work"></span>
      </div>
      <div class="listContainer">
        <div class="listContent" v-for="(v,k) in userInfo">
          <span v-html="userInfo[k].name"></span>
          <span v-for="(val,key) in showLiST(v.work,workInfo)" :class="{hasWork:val}" >{{ }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'front_task',
  data () {
    return {
      msg: 'front-end<br>工作分配',
      userInfo: false,
      workInfo: false
    }
  },
  created () {
    Promise.all([getUseInfo, getWorkInfo]).then(() => {
      this.$parent.loading = false
    })
    let getUseInfo = new Promise((resolve, reject) => {
      this.$axios({
        method: 'post',
        url: '/api',
        data: {
          'action': 'find_all'
        }
      })
      .then((res) => {
        let result = res.data
        // console.log(result)
        this.userInfo = result.data
        resolve()
      })
    })

    let getWorkInfo = new Promise((resolve, reject) => {
      this.$axios({
        method: 'post',
        url: '/api',
        data: {
          'action': 'find_work'
        }
      })
      .then((res) => {
        let result = res.data
        // console.log(result)
        this.workInfo = result.data
        resolve()
      })
    })
  },
  methods: {
    showLiST (work, workInfo) {
      var arr = [].slice.call(workInfo)
      var _work = [].slice.call(work)
      return arr.map((val, i) => {
        for (let i = 0; i < _work.length; i++) {
          if (val.work === _work[i]) {
            return true
          }
        }
        // return _work.forEach((ele) => {
        //   if (val.work === ele) {
        //     console.log(ele)
        //     return true
        //   }
        // })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.Container{
  width:100%;
  display: flex;
  flex-direction:row;
  justify-content:center;
  margin-bottom: 50px;
}
.listHead{
  display: flex;
  flex-direction:column;
}
.listContainer{
  display: flex;
  flex-direction:row;
  .listContent{
    display: flex;
    flex-direction:column;
  }
}
.hasWork{
  background:red;
}
span{
  display:inline-block;
  width:120px;
  height:40px;
  font-size: 20px;
  line-height: 40px;
  border:1px solid #ddd;
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
