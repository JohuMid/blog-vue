<template>
    <div id="register">
        <el-row :gutter="20">
            <el-col :span="16" :offset="4" style="width: 1200px;">
                <el-col style="width: 50%" class="hidden-md-and-down">
                    <div class="leftbox">

                    </div>
                </el-col>
                <el-col style="width: 50%">
                    <div class="rightbox">
                        <el-form ref="form" :model="form" label-width="">
                            <h1>注册一个账户！</h1>
                            <el-form-item>
                                <el-input v-model="form.userName" placeholder="请输入昵称"></el-input>
                            </el-form-item>

                            <el-form-item>
                                <el-input type="email" v-model="form.userEmail" placeholder="请输入电子邮箱地址"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-row :gutter="20">
                                    <el-col :span="12">
                                        <div class="grid-content">
                                            <el-input v-model="form.userPassword" placeholder="请输入密码"
                                                      type="password"></el-input>
                                        </div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div class="grid-content">
                                            <el-input v-model="form.userVecode" placeholder="请输入验证码"></el-input>
                                        </div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div class="grid-content">
                                            <el-button type="primary" round @click="userGetVecode">获取验证码</el-button>
                                        </div>
                                    </el-col>
                                </el-row>

                            </el-form-item>
                            <el-row>
                                <el-button type="primary" round @click="userRegister">注册</el-button>

                            </el-row>

                        </el-form>
                        <el-divider></el-divider>
                        <el-row>
                            <router-link to="/login" tag="el-link" type="primary">登录</router-link>

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
  import {getVecode, register} from "../../service/api";
  import {regUsernameExp, regVecodeExp, regEmailExp, regPsdExp} from "../../config/global";

  export default {
    name: "Register",
    data() {
      return {
        form: {
          userName: '',
          userEmail: '',
          userPassword: '',
          userVecode: ''
        }
      }
    },
    methods: {
      async userRegister() {
        if (!regUsernameExp.test(this.form.userName)) {
          Message('请正确填写用户名!(4-12位字符)');
        } else if (!regEmailExp.test(this.form.userEmail)) {
          Message('请正确填写用户邮箱!');
        } else if (!regPsdExp.test(this.form.userPassword)) {
          Message('请正确填写用户密码!(6-20位包含数字和字母)');
        } else if (!regVecodeExp.test(this.form.userVecode)) {
          Message('请正确填写用户验证码!');
        } else {
          let res = await register(this.form.userEmail, this.form.userName, this.form.userPassword, this.form.userVecode);
          if (res.err_code === 1) {
            Message({
              type: 'warning',
              showClose: true,
              message: '验证码错误!'
            });
          } else if (res.err_code === 0) {
            Message({
              type: 'success',
              showClose: true,
              message: '注册成功!'
            });
            this.$router.push('/')
            
          }
        }
      },
      async userGetVecode() {
        if (!regUsernameExp.test(this.form.userName)) {
          Message('请正确填写用户名!(4-12位字符)');
        } else if (!regEmailExp.test(this.form.userEmail)) {
          Message('请正确填写用户邮箱!');
        } else if (!regPsdExp.test(this.form.userPassword)) {
          Message('请正确填写用户密码!(6-20位包含数字和字母)');
        } else {
          let res = await getVecode(this.form.userEmail, this.form.userName)

          if (res.err_code === 2) {
            Message({
              type: 'warning',
              showClose: true,
              message: '此邮箱已经被注册!'
            });
          } else if (res.err_code === 0) {
            Message({
              type: 'success',
              showClose: true,
              message: '邮件发送成功，去邮箱查看验证码!'
            });
          }
        }
      }
    },

  }
</script>

<style scoped>
    #register {
        margin: 100px auto;
    }

    .leftbox {
        width: 100%;
        height: 400px;
        background: url("./../../assets/register.png") no-repeat;
        background-size: 100% 100%;
        border-radius: 10px;
        opacity: 0.7;

    }

    .rightbox {
        text-align: center;
    }


</style>