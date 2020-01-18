<template>
    <div id="login">

        <el-row :gutter="20">
            <el-col :span="16" :offset="4" style="width: 1200px;">
                <el-col style="width: 50%" class="hidden-md-and-down">
                    <div class="leftbox">

                    </div>
                </el-col>

                <el-col style="width: 50%">
                    <div class="rightbox">
                        <el-form ref="form" :model="form" label-width="">
                            <h1>欢迎回来！</h1>
                            <el-form-item>
                                <el-input type="email" v-model="form.userEmail" placeholder="请输入电子邮箱地址"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input type="password" v-model="form.userPassword" placeholder="请输入密码"></el-input>
                            </el-form-item>
                            <el-form-item class="onlyleft">
                                <el-checkbox v-model="form.isAdmin">我是管理员</el-checkbox>
                            </el-form-item>
                            <el-row>
                                <el-button type="primary" round @click="userLogin">登录</el-button>
                            </el-row>
                        </el-form>
                        <el-divider></el-divider>
                        <el-row>
                            <router-link to="/register" tag="el-link" type="primary">注册</router-link>
                        </el-row>
                        <el-row>
                            <router-link to="/forgetpsd" tag="el-link" type="primary">忘记密码？</router-link>
                        </el-row>
                        <el-row>
                            <router-link to="/" tag="el-link" type="primary">随便逛逛 -></router-link>
                        </el-row>
                    </div>
                </el-col>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  import {Message} from 'element-ui';
  import {login} from "../../service/api";
  import {regEmailExp} from "../../config/global";
  import {mapActions} from 'vuex'
  import 'element-ui/lib/theme-chalk/display.css';

  export default {
    name: "Login",
    data() {
      return {
        form: {
          userEmail: '',
          userPassword: '',
          // 是否管理员
          isAdmin: false
        }
      }
    },
    methods: {
      ...mapActions(['syncUserInfo']),

      async userLogin() {

        if (!regEmailExp.test(this.form.userEmail)) {
          Message('请正确填写用户邮箱!');
        } else if (!this.form.userPassword) {
          Message('请正确填写用户密码!');
        } else {

          let res = await login(this.form.userEmail, this.form.userPassword, this.form.isAdmin);
          if (res.err_code === 3) {
            Message({
              type: 'warning',
              showClose: true,
              message: '帐号或密码错误!'
            });
          } else if (res.err_code === 0) {

            Message({
              type: 'success',
              showClose: true,
              message: '登录成功!'
            });
            if (!this.form.isAdmin) {
              this.syncUserInfo(res.user);
              this.$router.push('/')
            } else {
              this.$router.push('/backstage')
            }
          }
        }
      }
    }
  }
</script>

<style scoped>
    #login {
        margin: 100px auto;
    }

    .leftbox {
        width: 100%;
        height: 400px;
        background: url("./../../assets/login.png") no-repeat;
        background-size: 100% 100%;
        border-radius: 10px;
        opacity: 0.7;

    }

    .onlyleft {
        text-align: left;
    }

    .rightbox {
        text-align: center;
    }

</style>
