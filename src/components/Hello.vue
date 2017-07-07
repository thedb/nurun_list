<template>
  <div class="hello">
    <h1 v-html="msg"></h1>
    <div class="listHead">
      <span>姓名</span>
      <span v-for="(v,k) in workInfo" v-html="workInfo[k].work"></span>
    </div>
    <div class="listContent">
      <div v-for="(v,k) in userInfo">
        <span v-html="userInfo[k].name"></span>
        <span v-for="(vv,kk) in showLiST(v.work,workInfo)" :class="{hasWork:vv}">&nbsp</span>
      </div>
    </div>
<!--     <ul>
      <li v-for="(v,k) in userInfo" v-if="userInfo">
        <span>姓名:{{userInfo[k].name}}</span>
        <span>工作:{{userInfo[k].work.length == 1 ? userInfo[k].work.toString() :userInfo[k].work[0] + '&'+ userInfo[k].work[1]}}</span>
      </li>
    </ul> -->
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'front-end<br>在职员工',
      userInfo: false,
      workInfo: false
    }
  },
  created () {
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
    })

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
    })
  },
  methods: {
    showLiST (work, workInfo) {
      var arr = [].slice.call(workInfo)
      // console.log(work)
      // console.log(workInfo)
      return arr.map((val, i, arr) => {
        return val.work === work[0] || val.work === work[1]
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.listHead{
  border:1px solid #ddd;
  span{
    border:1px solid #ddd;
  }
}
.listContent{

}
.hasWork{
  background:red;
}
span{
  display:inline-block;
  width:50px!important;
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
