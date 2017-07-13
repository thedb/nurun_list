<template >
  <div class="uploadImg">
    <div class="imgContainer">
      <div id='showimg'></div>
      <div class="showClick">
        点击上传图片
      </div>
      <input class="upload" id="headImage" type="file" name="name" value="" accept="image/*" v-on:change="changeUploadFile" v-show="hasNoImg">
    </div>
    <div>
      <span>选择姓名：</span><br>
      <select v-model="userName">
          <option disabled value="">请选择</option>
          <option v-for="(v,k) in userInfo" v-bind:value="userInfo[k].id">{{userInfo[k].name}}</option>
      </select>
    </div>
    <div class="" style="margin-top:30px;">
      <span v-show="!hasNoImg" @click="changeImg">更换图片</span>
      <span v-show="!hasNoImg" @click="submitImg">确认上传</span>
    </div>
  </div>
</template>

<script>
import EXIF from 'exif-js'
import $ from 'jquery'
import MegaPixImage from '../assets/megapix-image.js'
export default {
  name: 'uploadImg',
  data () {
    return {
      hasNoImg: true,
      imageloaded: true,
      mpImg: '',
      editor: '',
      userName: '',
      userInfo: false
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
      this.userInfo = result.data
    })
  },
  methods: {
    changeImg () {
      $('#headImage').trigger('click')
    },
    changeUploadFile (e) {
      let file = e.target.files || e.dataTransfer.files
      if (!file.length) {
        return
      }
      this.file = file[0]
      if (!this.file.type.match(/(jpg|jpeg|png|gif)/i)) {
        e.target.files = ''
        alert('请上传图片')
        return
      }
      if (this.userName === '') {
        alert('请选择姓名')
        return
      }
      this.hasNoImg = false
      let reader = new FileReader()
      reader.readAsDataURL(this.file)
      EXIF.getData(this.file, () => {
        let Orientation = EXIF.getTag(this.file, 'Orientation')
        if (this.file.exifdata.Orientation !== undefined) {
          Orientation = this.file.exifdata.Orientation
        }
        this.loadImage(this.file, Orientation)
      })
    },
    loadImage (file, orientation) {
      this.mpImg = new MegaPixImage(file)
      let canvas = document.createElement('canvas')
      this.mpImg.onrender = () => {
        let _this = this
        $('#showimg>span').eq(0).remove()
        let dataURL = canvas.toDataURL('image/jpeg')
        _this.editor = $('#showimg').ImageEditor({
          imageUrls: [dataURL],
          removeIcon: '',
          width: 300,
          height: 300,
          onInitCompleted () {
            _this.editor.selectImage(0)
          }
        })
      }
      this.mpImg.render(canvas, {orientation: orientation})
      this.imageloaded = true
      console.log(this.mpImg)
    },
    generateImage () {
      let canvas = this.editor.mergeImage()
      let imageName = canvas.toDataURL('image/jpeg', 0.6)
      return imageName
    },
    submitImg () {
      console.log(this.userName)
      if (!this.imageloaded) {
        alert('请上传图片')
        return
      }
      this.$axios({
        method: 'post',
        url: '/api',
        data: {
          'action': 'submit_Img',
          // 'img': this.generateImage().split(/base64,/)[1]
          'img': this.generateImage(),
          'id': this.userName
        }
      })
      .then((res) => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss">
.uploadImg{
  width: 50%;
  margin: 0 auto;
  margin-top: 50px;
  .imgContainer{
    position: relative;
    width:300px;
    height:300px;
    margin: 0 auto;
    border: 1px solid #ddd;
    margin-bottom: 30px;
    .showClick,.upload,.showimg{
      width: 100%;
      height:100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
    .showClick{
      z-index: 1;
      line-height: 300px;
    }
    .upload{
      opacity: 0;
      z-index: 10;
    }
  }
  span{
    border: 1px solid #ddd;
  }
}
</style>
