<template>
    <div class="footerBtn">


        <p>
            <el-button @click="dialogVisible=true">编辑头像</el-button>

        </p>


        <!-- 弹出层-裁剪 -->
        <el-dialog
                title="上传图片"
                :visible.sync="dialogVisible"
                :before-close="handleClose"
                width="700px"
                top
                center>
            <div>
                <el-row>
                    <el-button class="el-icon-upload" type="primary" style="padding: 13px 50px;"> 点击上传</el-button>
                    <input
                            type="file"
                            id="uploads"
                            accept="image/png, image/jpeg, image/gif, image/jpg"
                            @change="uploadImg($event,1)"
                            class="el-button"
                            style="margin-left: -162px;display: inline-block;width: 173px;margin-bottom: 15px;opacity: 0;">
                </el-row>
                <el-row>
                    <!-- <el-col :span="16"> -->
                    <el-col :span="24">
                        <!-- 裁剪 -->
                        <vueCropper
                                style="width:100%;height:300px"
                                ref="cropper"
                                :outputSize="options.size"
                                :img="attach.customaryUrl"
                                :autoCrop="options.autoCrop"
                                :fixedBox="options.fixedBox"
                                :canMoveBox="options.canMoveBox"
                                :autoCropWidth="options.autoCropWidth"
                                :autoCropHeight="options.autoCropHeight"
                                :centerBox="options.centerBox"
                                @realTime="realTime"
                        >
                        </vueCropper>
                    </el-col>
                    <el-col :span="24">
                        <h2 align="center">头像预览</h2>
                        <div class="show-preview">
                            <div :style="previews.div" class="preview">
                                <img style="width:100%" :src="previews.url" :style="previews.img">
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row class="footerBtn" align="center">
                    <el-button @click="handleClose">取消</el-button>
                    <el-button @click="cropper" type="primary">确认</el-button>

                </el-row>
            </div>
        </el-dialog>
    </div>
</template>

<script>
  // 导入头像切割配置文件
  import './../../../../plugins/vuecropper'
  import {uploadAvatar} from "../../../../service/api";
  import {blobToDataURL, dealImage} from "../../../../config/global";
  import {Message} from 'element-ui'
  import {mapState, mapActions} from 'vuex'
  import {setStore} from "../../../../config/global";

  // 数据库里需要存两份图片地址，一张为原图地址，一张为裁剪后的头像地址
  export default {
    inject: ["reload"],

    data() {
      return {
        dialogVisible: false,
        options: {
          autoCrop: true,  //默认生成截图框
          fixedBox: true,  //固定截图框大小
          canMoveBox: false,    //截图框不能拖动
          autoCropWidth: 190,  //截图框宽度
          autoCropHeight: 190, //截图框高度
          centerBox: false,    //截图框被限制在图片里面
          outputSize: 0.5,
        },
        previews: {}, //实时预览图数据
        attach: { //后端附件表
          id: '',
          userId: '',
          customaryUrl: '', //原图片路径
          laterUrl: '191',//裁剪后图片路径  /static/avatar.png
          attachType: 'photo',//附件类型
        },
        fileName: '',//本机文件地址
        uploadImgRelaPath: '',//上传后图片地址
        downImg: ''
      }
    },
    computed: {
      ...mapState(['userInfo']),
    },
    methods: {
      ...mapActions(['syncUserInfo']),

      //控制弹出层关闭
      handleClose() {
        this.dialogVisible = false
      },
      //实时预览
      realTime(data) {
        this.previews = data
      },
      uploadImg(e, num) {
        var file = e.target.files[0];
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          this.$message.error('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种');
          return false;
        }
        // 上传图片名称
        // console.log(file.name);
        this.fileName = file.name
        // fileReader 接口，用于异步读取文件数据
        var reader = new FileReader();
        reader.readAsDataURL(file); //重要 以dataURL形式读取文件
        reader.onload = e => {

          // data = window.URL.createObjectURL(new Blob([e.target.result])) 转化为blob格式

          let data = e.target.result
          // 上传图片详细 base64
          console.log(data)
          this.attach.customaryUrl = data
          // 转化为base64
          // reader.readAsDataURL(file)
          // 转化为blob
        }
      },
      cropper() {
        this.$refs.cropper.getCropData((data) => {

          let img = new Image(),
            _this = this
          // 输入原图的base64编码
          img.src = data

          img.onload = async function () {
            // 压缩方法
            let newImg = _this.compress(img)

            console.log(_this.userInfo);

            let res = await uploadAvatar(_this.userInfo.uId, newImg);

            if (res.err_code === 0) {

              Message({
                type: 'success',
                showClose: true,
                message: '修改头像成功!'
              });

              _this.userInfo.userAvatar = res.results

              setStore('userInfo', _this.userInfo)

              _this.handleClose()
            }
          }
        })
      },
      // 压缩方法
      compress(img) {
        let canvas = document.createElement("canvas"),
          ctx = canvas.getContext("2d"),
          initSize = img.src.length,
          width = img.width,
          height = img.height;
        canvas.width = width
        canvas.height = height
        // 铺底色
        ctx.fillStyle = "#fff"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, width, height)
        //进行压缩
        let ndata = canvas.toDataURL("image/jpeg", 0.8)
        //console.log("压缩后的图片大小：" + ndata.length)
        return ndata
      },
    }
  }
</script>

<style scoped>
    /* 弹性布局 水平居中 */
    .show-preview {
        width: 190px;
        height: 190px;
        display: flex;
        justify-content: center;
        /* border:1px solid #cccccc; */
        margin: 0 auto;
        background: #f2f2f2;
    }

    .preview {
        overflow: hidden;
        box-shadow: 0 0 2px 1px #666;
        background: #cccccc;
        display: block;
    }

    .footerBtn {
        display: flex;
        justify-content: center;
        margin-top: 15px;
    }

</style>
<style>
    .el-dialog__body {
        padding: 0px 60px 30px 60px !important;
        z-index: 9999999;
    }

    .el-dialog__header {
        padding: 10px;
    }

    .el-button--medium {
        padding: 11px 36px;
        margin-right: 20px;
        font-size: 14px;
        border-radius: 4px;
    }
</style>