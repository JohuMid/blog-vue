<template>
    <div id="forgetpsd">
        <el-row :gutter="20">
            <el-col :span="16" :offset="4" style="width: 1200px;">
                <el-col style="width: 50%" class="hidden-md-and-down">
                    <div class="leftbox">

                    </div>
                </el-col>

                <el-col style="width: 50%">
                    <div class="rightbox">
                        <el-form ref="form" :model="form" label-width="">
                            <h1>忘记了密码？</h1>
                            <h4 class="note">只要在下面输入您的电子邮件地址，我们就会向您发送一个邮件以重置密码！</h4>

                            <el-form-item>
                                <el-input v-model="form.userNewEmail" placeholder="请输入电子邮箱地址"></el-input>
                            </el-form-item>
                            <el-form-item>

                                <el-row :gutter="20">
                                    <el-col :span="12">
                                        <div class="grid-content">
                                            <el-input v-model="form.userNewPassword" placeholder="请输入新的密码"
                                                      type="password"></el-input>

                                        </div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div class="grid-content">
                                            <el-input v-model="form.userNewVecode" placeholder="请输入验证码" type="text"></el-input>
                                        </div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div class="grid-content">
                                            <el-button type="primary" round @click="userGetForVecode">获取验证码</el-button>
                                        </div>
                                    </el-col>
                                </el-row>

                            </el-form-item>
                            <el-row>
                                <el-button type="primary" round @click="userForgetPsd">重置密码</el-button>

                            </el-row>

                        </el-form>
                        <el-divider></el-divider>
                        <el-row>
                            <router-link to="/login" tag="el-link" type="primary">登录</router-link>

                        </el-row>
                        <el-row>
                            <router-link to="/register" tag="el-link" type="primary">注册</router-link>
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
  import {forgetPsd, getForVecode} from "../../service/api";
  import {regVecodeExp, regEmailExp, regPsdExp} from "../../config/global";

  export default {
    name: "ForgetPsd",
    data() {
      return {
        form: {
          userNewEmail: '',
          userNewPassword: '',
          userNewVecode: ''
        }
      }
    },
    methods: {
      async userForgetPsd() {
        if (!regEmailExp.test(this.form.userNewEmail)) {
          Message('请正确填写用户邮箱!');
        } else if (!regPsdExp.test(this.form.userNewPassword)) {
          Message('请正确填写用户密码!(6-20位包含数字和字母)');
        } else if (!regVecodeExp.test(this.form.userNewVecode)) {
          Message('请正确填写用户验证码!');
        } else {
          let res = await forgetPsd(this.form.userNewEmail, this.form.userNewPassword, this.form.userNewVecode);
          if (res.err_code === 1) {
            Message({
              type: 'warning',
              showClose: true,
              message: '验证码错误!'
            });
          } else if (res.err_code === 5) {
            Message({
              type: 'warning',
              showClose: true,
              message: '重置密码失败!'
            });

          } else if (res.err_code === 0) {
            Message({
              type: 'success',
              showClose: true,
              message: '重置密码成功!'
            });
            this.$router.push('/login')
          }
        }
      },
      async userGetForVecode() {
        if (!regEmailExp.test(this.form.userNewEmail)) {
          Message('请正确填写用户邮箱!');
        } else if (!regPsdExp.test(this.form.userNewPassword)) {
          Message('请正确填写用户密码!(6-20位包含数字和字母)');
        } else {
          let res = await getForVecode(this.form.userNewEmail)

          if (res.err_code === 4) {
            Message({
              type: 'warning',
              showClose: true,
              message: '账户不存在，请先注册一个账户!'
            });
          } else if (res.err_code === 0) {
            Message({
              type: 'success',
              showClose: true,
              message: '邮件发送成功，去邮箱查看修改密码验证码!'
            });
          }
        }
      }
    },
  }
</script>

<style scoped>
    #forgetpsd{
        margin: 100px auto;
    }
    .leftbox {
        width: 100%;
        height: 400px;
        background: url("./../../assets/forgetpsd.png") no-repeat;
        background-size: 100% 100%;
        opacity: 0.7;
        border-radius: 10px;
    }
    .rightbox {
        text-align: center;
    }
    .note{
        margin: 0 auto;
        width: 400px;
        color: #7c7c7c;
        margin-bottom: 20px;

    }

</style>