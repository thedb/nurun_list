<template>
  <div class="front_task">
    <h1>front-end<br>工作分配</h1>
    <p v-show="hasNoWork">
      目前空闲：{{hasNoWork.length == 0 ? '无' : hasNoWork}}
    </p>
    <div class="Container">
      <div class="listHead">
        <span class="headImage">头像</span>
        <span>姓名</span>
        <span v-for="(v,k) in workInfo" v-html="workInfo[k].work"></span>
      </div>
      <div class="listContainer">
        <div class="listContent" v-for="(v,k) in userInfo">
          <span class="headImage"><img style="width:100%" :src="userInfo[k].head_img" alt="" /></span>
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
      userInfo: false,
      workInfo: false,
      hasNoWork: false
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
        this.userInfo = result.data
        this.hasNoWork = result.other
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
  span{
    display:inline-block;
    width:120px;
    height:40px;
    font-size: 20px;
    line-height: 40px;
    border:1px solid #ddd;
  }
  .headImage{
    height: 120px;
    line-height: 120px;
  }
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
