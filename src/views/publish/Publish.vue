<template>
    <div id="publish">
        <div>
            <el-row :gutter="20">
                <el-col :span="16" :offset="4">
                    <div class="grid-content list-shadow">
                        <el-row :gutter="20">

                            <el-col :span="20" :offset="2">
                                <el-form ref="form" :model="form" label-width="80px">
                                    <el-form-item label="标题">
                                        <el-input v-model="form.userTheme"></el-input>
                                    </el-form-item>
                                    <el-form-item label="正文">
                                        <VueEditor @func="getMsgFormSon"></VueEditor>
                                    </el-form-item>
                                    <el-form-item label="标签">
                                        <el-cascader
                                                v-model="value"
                                                :options="options"
                                                :props="{ expandTrigger: 'hover' }"
                                                @change="handleChange">
                                        </el-cascader>
                                    </el-form-item>
                                    <el-form-item label="">
                                        <el-tag
                                                :key="tag"
                                                v-for="tag in dynamicTags"
                                                closable
                                                :disable-transitions="false"
                                                @close="handleClose(tag)">
                                            {{tag}}
                                        </el-tag>
                                        <el-input
                                                class="input-new-tag"
                                                v-if="inputVisible"
                                                v-model="inputValue"
                                                ref="saveTagInput"
                                                size="small"
                                                @keyup.enter.native="handleInputConfirm"
                                                @blur="handleInputConfirm"
                                        >
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" @click="getPublish">发布文章</el-button>
                                    </el-form-item>

                                </el-form>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
  import VueEditor from "../../components/VueEditor";
  import {publishTopic} from "../../service/api";
  import {Message} from 'element-ui';
  import {mapState} from 'vuex'


  export default {
    name: "Publish",
    data() {
      return {
        form: {
          userTheme: '',
        },
        content: null,
        editorOption: {},
        value: [],
        options: [{
          value: '娱乐',
          label: '娱乐',
          children: [{
            value: '游戏',
            label: '游戏',
          }, {
            value: '电影',
            label: '电影',
          }]
        }, {
          value: '生活',
          label: '生活',
          children: [{
            value: '汽车',
            label: '汽车',
          }, {
            value: '职场',
            label: '职场',
          }, {
            value: '房产',
            label: '房产',
          }, {
            value: '人物',
            label: '人物',
          }, {
            value: '体育',
            label: '体育',
          },]
        }, {
          value: '互联网',
          label: '互联网',
          children: [{
            value: '创投',
            label: '创投',
          }, {
            value: '评测',
            label: '评测',
          }]
        }, {
          value: '科技',
          label: '科技',
          children: [{
            value: '计算机',
            label: '计算机',
          }, {
            value: '智能',
            label: '智能',
          },]
        }, {
          value: '综合',
          label: '综合',
        }],
        tags: '[{"娱乐":0,"汽车":0,"职场":0,"科技":1,"房产":0,"生活":0,"互联网":0,"创投":0,"游戏":0,"人物":0,"评测":0,"电影":0,"计算机":1,"体育":0,"智能":0,"综合":0}]',
        dynamicTags: [],
        inputVisible: false,
        inputValue: ''
      }
    },
    components: {
      VueEditor
    },
    computed: {
      ...mapState(['userInfo'])
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        // 加载防止闪烁
        this.$emit('func', '我好了')
      },
      async getPublish() {

        if (!(this.form.userTheme.trim())) {
          Message('请填写文章标题!');
        } else if (!this.content) {
          Message('请填写文章正文!');
        } else {
          let res = await publishTopic(this.userInfo.uId, this.form.userTheme, (this.content), this.tags)

          // console.log(this.content);

          if (res.err_code === 0) {
            Message({
              type: 'success',
              showClose: true,
              message: '发布成功!'
            });
            this.$router.push('/')
          }
        }
      },
      getMsgFormSon(data) {
        this.content = data
      },
      handleChange(value) {
        this.tags = JSON.parse(this.tags)
        let count = 0;

        for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < this.dynamicTags.length; j++) {
            if (value[i] == this.dynamicTags[j]) {
              count++
            }
          }
          if (count === 0) {
            this.dynamicTags.push(value[i])
          }
        }

        for (let v = 0; v < this.dynamicTags.length; v++) {
          if (this.tags[0][this.dynamicTags[v]] === 0) {
            this.tags[0][this.dynamicTags[v]]++
          }
        }

        this.tags = (JSON.stringify(this.tags));

      },
      handleClose(tag) {
        this.tags = JSON.parse(this.tags)

        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);

        this.tags[0][tag]--

        this.tags = (JSON.stringify(this.tags));

      },
    }
  }
</script>

<style scoped>
    .list-shadow {
        background: #ffffff;
        border-radius: 10px;
        padding-top: 20px;
        margin-top: 20px;
    }

    .el-tag + .el-tag {
        margin-left: 10px;
    }

    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }

</style>
