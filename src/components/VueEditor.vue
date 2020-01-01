<template>
    <div>
        <quill-editor v-model="content"
                      ref="myQuillEditor"
                      class="editor"
                      :options="editorOption"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @change="onEditorChange($event)">
        </quill-editor>

        <input style="visibility: hidden"
               type="file"
               @change="uploadImg($event,1)"
               id="quill-upload"
               accept="image/png, image/jpeg, image/gif, image/jpg"
        >
    </div>
</template>
<script>
  // 工具栏配置
  import {getTopicDetail, uploadAvatar} from "../service/api";

  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
    ['blockquote', 'code-block'], // 引用  代码块-----['blockquote', 'code-block']
    [{header: 1}, {header: 2}], // 1、2 级标题-----[{ header: 1 }, { header: 2 }]
    [{list: 'ordered'}, {list: 'bullet'}], // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
    [{script: 'sub'}, {script: 'super'}], // 上标/下标-----[{ script: 'sub' }, { script: 'super' }]
    [{indent: '-1'}, {indent: '+1'}], // 缩进-----[{ indent: '-1' }, { indent: '+1' }]
    [{'direction': 'rtl'}], // 文本方向-----[{'direction': 'rtl'}]
    [{size: ['small', false, 'large', 'huge']}], // 字体大小-----[{ size: ['small', false, 'large', 'huge'] }]
    [{header: [1, 2, 3, 4, 5, 6, false]}], // 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
    [{color: []}, {background: []}], // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
    [{font: []}], // 字体种类-----[{ font: [] }]
    [{align: []}], // 对齐方式-----[{ align: [] }]
    ['clean'], // 清除文本格式-----['clean']
    ['image'] // 链接、图片、视频-----['link', 'image', 'video']
  ]

  // 导入富文本编辑器配置文件
  import './../plugins/vueeditor'
  import {Base64} from "js-base64";
  import {Message} from "element-ui";
  import {mapState} from "vuex";
  import {uploadTopicImg} from "../service/api";


  export default {
    props: ['childContent'],
    data() {
      return {
        //文本数据
        content: null,
        tTopic: '',
        // 编辑器选项
        editorOption: {
          placeholder: '请输入文本...',
          theme: 'snow',
          modules: {
            toolbar: {
              container: toolbarOptions,
              handlers: {
                'image': function (value) {
                  if (value) {
                    document.getElementById('quill-upload').click();
                  } else {
                    this.quill.format('image', false);
                  }
                }
              }
            },
          }
        },
      }
    },
    mounted() {
      this.fillPublish()
    },
    computed: {
      ...mapState(['userInfo']),
    },
    methods: {

      async fillPublish() {
        if (this.$route.params.tId) {
          let res = await getTopicDetail(this.$route.params.tId)

          if (res.err_code === 0) {

            res = JSON.parse(res.results)[0]

            this.tTopic = res.tTopic
            this.$emit('func1', this.tTopic)

            this.content = Base64.decode(res.tContents)
          }
        } else {

        }
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

          let quill = this.$refs.myQuillEditor.quill

          // data = window.URL.createObjectURL(new Blob([e.target.result])) 转化为blob格式

          // 上传图片详细 base64
          let urldata = e.target.result
          // console.log(data)
          // this.attach.customaryUrl = data
          // 转化为base64
          // reader.readAsDataURL(file)
          // 转化为blob

          let img = new Image(),
            _this = this
          // 输入原图的base64编码
          img.src = urldata

          img.onload = async function () {
            // 压缩方法
            let newImg = _this.compress(img)

            let res = await uploadTopicImg(_this.userInfo.uId, newImg);

            if (res.err_code === 0) {

              // console.log(res);


              // 插入图片到富文本编辑器
              let quill = _this.$refs.myQuillEditor.quill
              // 获取光标所在位置
              let length = quill.getSelection().index;
              // 插入图片，res为服务器返回的图片链接地址
              quill.insertEmbed(length, 'image', 'http://localhost:3000/public/images/topic/' + res.results)
              // 调整光标到最后
              quill.setSelection(length + 1);

              Message({
                type: 'success',
                showClose: true,
                message: '插入图片成功!'
              });
            } else {
              // 提示信息，需引入Message
              Message.error('图片插入失败')
            }
          }
        }
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
        let ndata = canvas.toDataURL("image/jpeg", 0.5)
        //console.log("压缩后的图片大小：" + ndata.length)
        return ndata
      },
      onEditorBlur() {
        // 失去焦点事件
      },
      onEditorFocus() {
        // 获得焦点事件
      },
      onEditorChange() {
        // 内容改变事件
        this.sendMsg()
      },
      sendMsg() {
        //func: 是父组件指定的传数据绑定的函数，this.msg:子组件给父组件传递的数据
        this.$emit('func', this.content)
      }
    }
  }
</script>
<style>
    .editor {
        line-height: normal !important;
        height: auto;
    }

    .ql-snow .ql-tooltip[data-mode=link]::before {
        content: "请输入链接地址:";
    }

    .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
        border-right: 0px;
        content: '保存';
        padding-right: 0px;
    }

    .ql-snow .ql-tooltip[data-mode=video]::before {
        content: "请输入视频地址:";
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item::before {
        content: '14px';
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
        content: '10px';
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
        content: '18px';
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
        content: '32px';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item::before {
        content: '文本';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
        content: '标题1';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
        content: '标题2';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
        content: '标题3';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
        content: '标题4';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
        content: '标题5';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
        content: '标题6';
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item::before {
        content: '标准字体';
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {
        content: '衬线字体';
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {
        content: '等宽字体';
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value='宋体']::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value='宋体']::before {
        content: "宋体" !important;
        font-family: "宋体";
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value='黑体']::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value='黑体']::before {
        content: "黑体" !important;
        font-family: "黑体";
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value='微软雅黑']::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value='微软雅黑']::before {
        content: "微软雅黑" !important;
        font-family: "微软雅黑";
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value='Arial']::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value='Arial']::before {
        content: "Arial" !important;
        font-family: "Arial";
    }

    /*编辑器内容用*/
    .ql-font-Arial {
        font-family: "Arial";
    }

    .ql-font-宋体 {
        font-family: "SimSun";
    }

    .ql-font-黑体 {
        font-family: "SimHei";
    }

    .ql-font-微软雅黑 {
        font-family: "Microsoft YaHei";
    }

</style>
