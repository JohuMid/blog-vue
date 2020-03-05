<template>
    <div id="usersData">
        <el-row :gutter="20">
            <el-col :span="6" class="avatar">
                <div class="grid-content ">
                    <el-avatar
                            shape="square"
                            :size="130"
                            :src="avatarSrc"
                    ></el-avatar>
                </div>
            </el-col>
            <el-col :span="16">
                <div class="grid-content ">

                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>个人资料</span>
                            <el-button v-if="!isAttention" style="float: right; padding: 3px 0" type="text"
                                       @click="attention">关注
                            </el-button>
                            <el-button v-else style="float: right; padding: 3px 0;color: red" type="text"
                                       @click="attention">取消关注
                            </el-button>
                        </div>
                        <div>
                            <el-form ref="form" :model="form" label-width="100px">
                                <el-form-item label="昵称">
                                    <span>{{form.nickname}}</span>
                                </el-form-item>
                                <el-form-item label="地区">
                                    <el-cascader
                                            disabled
                                            size="large"
                                            :options="options"
                                            v-model="selectedOptions"
                                            max-height="300">
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
    </div>
</template>

<script>
  import {mapActions, mapState} from "vuex";
  import {getUserAllData, userAttention, userCancelAttention, userIsAttention} from "../../../service/api";
  import {getStore} from "../../../config/global";
  import {Message} from "element-ui";

  import {provinceAndCityData} from 'element-china-area-data'


  export default {
    name: "UsersData",
    data() {
      return {
        avatarSrc: require("./../../../images/avatar.png"),

        // 是否被当前用户关注
        isAttention: false,
        form: {
          nickname: '',
          local: '',
          sex: '',
          intro: '',
          class: ''

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


        if (this.userInfo) {
          // 如果点击用户是当前用户直接跳转到个人中心

          if (this.$route.params.uId == this.userInfo.uId) {

            this.$router.push('/navbar/user')

          } else {

            this.isUserAttention();

            let res = await getUserAllData(this.$route.params.uId)


            // console.log(res);

            var results = JSON.parse(res.results)[0];

            this.form.nickname = results.userName;
            if (results.userLocal) {
              this.selectedOptions = JSON.parse(results.userLocal);
            }
            this.form.sex = results.userSex;
            this.form.intro = results.userStatement;
            this.avatarSrc = this.imgBaseUrl + results.userAvatar + ``
            this.form.class = results.userRegDate
          }
        } else {
          let res = await getUserAllData(this.$route.params.uId)
          // console.log(res);

          var results = JSON.parse(res.results)[0];

          this.form.nickname = results.userName;
          if (results.userLocal) {
            this.selectedOptions = JSON.parse(results.userLocal);
          }
          this.form.sex = results.userSex;
          this.form.intro = results.userStatement;
          this.avatarSrc = this.imgBaseUrl + results.userAvatar + ``
          this.form.class = results.userRegDate
        }
      },
      // 关注，取消关注
      async attention() {

        if (this.userInfo) {

          if (this.isAttention === false) {
            let res = await userAttention(this.userInfo.uId, this.$route.params.uId)
            if (res.err_code === 0) {
              Message({
                type: 'success',
                showClose: true,
                message: '您已关注该用户!'
              });
              this.isAttention = !this.isAttention

              // 存储关注状态
              this.$socket.emit('like', {
                fromId: this.userInfo.uId,
                toId: this.$route.params.uId
              })
            }
          } else {
            let res = await userCancelAttention(this.userInfo.uId, this.$route.params.uId)
            if (res.err_code === 0) {
              Message({
                type: 'warning',
                showClose: true,
                message: '您已取消关注此用户!'
              });
              this.isAttention = !this.isAttention
            }
          }
        } else {
          Message('请先登录后再关注!');
        }
      },
      async isUserAttention() {

        console.log(this.userInfo);

        if (this.userInfo.uId) {
          let res = await userIsAttention(this.userInfo.uId, this.$route.params.uId)

          if (res.err_code === 0) {
            res = JSON.parse(res.results);
            if (!res[0]) {
              console.log('未关注');
            } else {
              this.isAttention = true
            }
          }
        } else {
          console.log('没登录');
        }

      },

    },
  }
</script>

<style scoped>

</style>
