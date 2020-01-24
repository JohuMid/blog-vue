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
                                        <el-input v-model="form.userTheme" >{{this.childTheme}}</el-input>
                                    </el-form-item>
                                    <el-form-item label="正文">
                                        <VueEditor @func="getMsgFormSon" @func1="getThemeFormSon"></VueEditor>
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
  import {updateTopic} from "../../service/api";
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
        childTheme: ''
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

          console.log((this.content))
          let res = await updateTopic(this.$route.params.tId, this.form.userTheme, (this.content))

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
      getThemeFormSon(data){
        this.form.userTheme = data

      }
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

</style>
