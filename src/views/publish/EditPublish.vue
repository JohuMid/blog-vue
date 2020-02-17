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
                                        <el-input v-model="form.userTheme">{{this.childTheme}}</el-input>
                                    </el-form-item>
                                    <el-form-item label="正文">
                                        <VueEditor @func="getMsgFormSon" @func1="getThemeFormSon"></VueEditor>
                                    </el-form-item>
                                    <el-form-item label="专题">
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
  import {special, updateTopic} from "../../service/api";
  import {Message} from 'element-ui';
  import {mapState} from 'vuex'


  export default {
    name: "EditPublish",
    data() {
      return {
        form: {
          userTheme: '',
        },
        content: null,
        editorOption: {},
        childContent: null,
        childTheme: '',
        value: [],
        options: [],
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
        // 英文专题
        valueList: []
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
      async init() {
        // 加载防止闪烁
        this.$emit('func', '我好了')

        let res = await special()
        if (res.err_code === 0) {
          this.options = JSON.parse(res.special)
          this.refer = JSON.parse(res.refer)
        }
      },
      async getPublish() {

        if (!(this.form.userTheme.trim())) {
          Message('请填写文章标题!');
        } else if (!this.content) {
          Message('请填写文章正文!');
        } else {

          let res = await updateTopic(this.$route.params.tId, this.form.userTheme, (this.content), JSON.stringify(this.valueList))

          if (res.err_code === 0) {
            Message({
              type: 'success',
              showClose: true,
              message: '修改成功!'
            });
            this.$router.push('/navbar/user')
          }
        }
      },
      getMsgFormSon(data) {


        this.content = data
      },
      getThemeFormSon(data) {
        this.form.userTheme = data
      },
      handleChange(value) {
        if (this.dynamicTags.length === 0) {
          for (let i = 0; i < value.length; i++) {
            this.dynamicTags.push(this.referWord(value[i]))
            this.valueList.push(value[i])

          }
        } else {
          for (let i = 0; i < value.length; i++) {
            let count = 0;
            for (let j = 0; j < this.dynamicTags.length; j++) {
              if (this.dynamicTags[j] == this.referWord(value[i])) {
                count++
              }
            }
            if (count === 0) {
              this.dynamicTags.push(this.referWord(value[i]))
              this.valueList.push(value[i])

            }
          }
        }

        this.value = []
      },
      // 翻译为中文
      referWord(word) {

        for (let i = 0; i < this.refer.length; i++) {
          if (word == this.refer[i].value) {
            return this.refer[i].label
          }
        }
      },
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
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

</style>
