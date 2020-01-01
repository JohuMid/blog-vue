<template>
    <div id="userdata">
        <el-row v-if="isEdit" :gutter="20">
            <el-col :span="6" class="avatar">
                <div class="grid-content ">
                    <el-avatar
                            shape="square"
                            :size="130"
                            :src="imgBaseUrl+userInfo.userAvatar+``"
                    ></el-avatar>
                </div>
            </el-col>
            <el-col :span="16">
                <div class="grid-content ">

                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>个人资料</span>
                            <el-button style="float: right; padding: 3px 0" type="text"
                                       @click="editData">编辑
                            </el-button>
                        </div>
                        <div>
                            <el-form ref="form" :model="form" label-width="100px">
                                <el-form-item label="昵称">
                                    <span>{{form.nickname}}</span>
                                </el-form-item>
                                <el-form-item label="生日">
                                    <span>{{form.birthday | timeFormatSimple}}</span>
                                </el-form-item>
                                <el-form-item label="地区">
                                    <el-cascader
                                            disabled
                                            size="large"
                                            :options="options"
                                            v-model="selectedOptions"
                                            max-height="300"
                                            @change="handleChange">
                                    </el-cascader>
                                </el-form-item>
                                <el-form-item label="性别">
                                    <span>{{form.sex}}</span>
                                </el-form-item>
                                <el-form-item label="简介">
                                    <span>{{form.intro}}</span>
                                </el-form-item>
                                <el-form-item label="等级">
                                    <span>{{form.class|getDateDiff}}</span>
                                </el-form-item>

                            </el-form>
                        </div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
        <el-row v-else :gutter="20">
            <el-col :span="6" class="avatar">
                <div class="grid-content ">
                    <el-avatar
                            shape="square"
                            :size="130"
                            :src="imgBaseUrl+userInfo.userAvatar+``"
                    ></el-avatar>
                    <p>
                        <!--头像上传-->
                        <cropper></cropper>
                    </p>
                </div>
            </el-col>
            <el-col :span="16">
                <div class="grid-content ">

                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>个人资料</span>
                        </div>
                        <div>
                            <el-form ref="form" :model="form" label-width="80px">
                                <el-form-item label="昵称">
                                    <el-input v-model="form.nickname"></el-input>
                                </el-form-item>
                                <el-form-item label="生日">
                                    <el-date-picker
                                            v-model="form.birthday"
                                            type="date"
                                            placeholder="选择日期">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="地区">
                                        <div>
                                            <el-cascader
                                                    size="large"
                                                    :options="options"
                                                    v-model="selectedOptions"
                                                    max-height="300"
                                                    @change="handleChange">
                                            </el-cascader>
                                        </div>
                                </el-form-item>
                                <el-form-item label="性别">
                                    <el-radio-group v-model="form.sex">
                                        <el-radio label="男"></el-radio>
                                        <el-radio label="女"></el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="简介">
                                    <el-input type="textarea"
                                              v-model="form.intro"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="onSubmit">提交修改</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  import Cropper from "./children/Cropper";
  import {getUserAllData, editUserAllData} from "../../../service/api";
  import {Message} from 'element-ui'
  import {timeFormat} from "../../../config/global";
  import {mapState, mapActions} from "vuex"
  // 地区插件引入
  import { provinceAndCityData } from 'element-china-area-data'

  export default {
    name: "UserData",
    data() {
      return {
        avatarSrc: require("./../../../images/avatar.png"),

        // 是否编辑资料
        isEdit: true,
        form: {
          nickname: '',
          birthday: '',
          local: '',
          sex: '',
          intro: '',
          class:''
        },
        options: provinceAndCityData,
        selectedOptions: []

      }
    },
    created() {
      this.reqUserInfo()
      this.getAllData()
    },
    computed: {
      ...mapState(['userInfo'])
    },
    methods: {
      ...mapActions(['reqUserInfo']),

      async getAllData() {

        let res = await getUserAllData(this.userInfo.uId)


        var results = JSON.parse(res.results)[0];
        // console.log(results);

        this.form.nickname = results.userName;
        this.form.birthday = results.userBirthday;

        if (results.userLocal){
          this.selectedOptions = JSON.parse(results.userLocal);
        }

        console.log(this.form.local);

        this.form.sex = results.userSex;
        this.form.intro = results.userStatement;
        this.avatarSrc = this.imgBaseUrl + results.userAvatar
        this.form.class = results.userRegDate
      },
      editData() {
        this.isEdit = false
      },
      async onSubmit() {

        if (!this.form.nickname){
          Message('请正确填写昵称!');

        }else if (!this.form.birthday){
          Message('请正确填写生日!');

        }else if (!this.form.sex){
          Message('请正确填写性别!');
        }else {
          let res = await editUserAllData(this.userInfo.uId, this.form.nickname, timeFormat(this.form.birthday), this.form.local, this.form.sex, this.form.intro)

          if (res.err_code === 0) {
            Message({
              type: 'success',
              showClose: true,
              message: '修改信息成功!'
            });
            this.isEdit = true
          }
        }
      },
      handleChange (value) {

        console.log(this.selectedOptions);
        console.log(value)
        this.form.local = (JSON.stringify(value));
      }
    },
    components: {
      Cropper
    }
  }
</script>

<style scoped>
    .avatar {
        text-align: center;
    }
</style>