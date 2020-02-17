<template>
    <div id="adminmanage">
        <el-row :gutter="20" style="width: 100%;height: 100%;">
            <el-col :span="15" style="height: 100%;">
                <div class="grid-content bg-purple" style="height: 100%;">
                    <div class="tableborder">
                        <template>
                            <el-table
                                    height="90%"
                                    stripe
                                    :data="tableData.filter(data => !search || data.adminName.toLowerCase().includes(search.toLowerCase()))"
                                    style="width: 100%">
                                <el-table-column
                                        prop="adminId"
                                        sortable
                                        label="管理员ID"
                                        width="120">
                                </el-table-column>
                                <el-table-column
                                        prop="adminName"
                                        label="管理员"
                                        sortable
                                        width="140">
                                </el-table-column>
                                <el-table-column
                                        prop="adminEmail"
                                        label="管理员邮箱"
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        prop="adminRegDate"
                                        label="注册时间"
                                        width="200">
                                    <template slot-scope="scope">
                                        {{scope.row.adminRegDate|timeFormat}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        fixed="right">
                                    <template slot="header" slot-scope="scope">
                                        <el-input
                                                v-model="search"
                                                size="mini"
                                                placeholder="输入管理员名搜索"/>
                                    </template>

                                </el-table-column>
                            </el-table>
                        </template>
                    </div>
                    <div class="pagination">
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :page-sizes="[10, 20, 30, 40]"
                                :page-size="5"
                                layout="total, sizes, prev, pager, next"
                                :total="total">
                        </el-pagination>
                    </div>
                </div>
            </el-col>
            <el-col :span="9">
                <div class="grid-content bg-purple">
                    <div class="rightbox">
                        <el-form ref="form" :model="form" label-width="">
                            <h2 style="margin-bottom: 20px;">注册管理员账户</h2>
                            <el-form-item>
                                <el-input v-model="form.adminName" placeholder="请输入管理员昵称"></el-input>
                            </el-form-item>

                            <el-form-item>
                                <el-input type="email" v-model="form.adminEmail" placeholder="请输入管理员电子邮箱地址"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-row :gutter="20">
                                    <el-col :span="12">
                                        <div class="grid-content">
                                            <el-input v-model="form.adminPassword" placeholder="请输入管理员密码"
                                                      type="password"></el-input>
                                        </div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div class="grid-content">
                                            <el-input v-model="form.adminVecode" placeholder="请输入验证码"></el-input>
                                        </div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div class="grid-content">
                                            <el-button type="primary" round @click="adminGetVecode">获取验证码</el-button>
                                        </div>
                                    </el-col>
                                </el-row>

                            </el-form-item>
                            <el-row>
                                <el-button type="primary" round @click="adminRegister">注册管理员</el-button>
                            </el-row>
                        </el-form>
                        <el-divider></el-divider>
                        <el-row>
                            <router-link to="/login" tag="el-link" type="primary">管理员登录</router-link>
                        </el-row>
                    </div>
                </div>
            </el-col>
        </el-row>

    </div>
</template>

<script>
  import {getAdminData, getAdminVecode, adminRegister} from "../../../service/api";
  import {regEmailExp, regPsdExp, regUsernameExp, regVecodeExp, setStore} from "../../../config/global";
  import {Message} from "element-ui";

  export default {
    name: "AdminManage",
    data() {
      return {
        tableData: [],
        // 总条数
        total: 0,
        // 每页条数
        pageNum: 10,
        // 当前页面
        currentPage: 1,
        search: '',
        form: {
          adminName: '',
          adminEmail: '',
          adminPassword: '',
          adminVecode: ''
        }
      }
    },
    created() {
      this.reqAdminData()
    },
    methods: {
      async reqAdminData() {

        console.log(this.userInfo);
        let res = await getAdminData(this.pageNum, this.currentPage)

        this.tableData = JSON.parse(res.results)

        var num = JSON.parse(res.num)

        this.total = num[0].count

      },
      handleSizeChange(val) {
        this.pageNum = Number(`${val}`);
        this.reqAdminData()
      },
      handleCurrentChange(val) {
        this.currentPage = Number(`${val}`);
        this.reqAdminData()
      },
      async adminRegister() {
        if (!regUsernameExp.test(this.form.adminName)) {
          Message('请正确填写用户名!(4-12位字符)');
        } else if (!regEmailExp.test(this.form.adminEmail)) {
          Message('请正确填写用户邮箱!');
        } else if (!regPsdExp.test(this.form.adminPassword)) {
          Message('请正确填写用户密码!(6-20位包含数字和字母)');
        } else if (!regVecodeExp.test(this.form.adminVecode)) {
          Message('请正确填写用户验证码!');
        } else {
          let res = await adminRegister(this.form.adminEmail, this.form.adminName, this.form.adminPassword, this.form.adminVecode);
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
            setStore('userInfo', res.results);
            this.$router.push('/backstage/overview')

          }
        }
      },
      async adminGetVecode() {
        if (!regUsernameExp.test(this.form.adminName)) {
          Message('请正确填写用户名!(4-12位字符)');
        } else if (!regEmailExp.test(this.form.adminEmail)) {
          Message('请正确填写用户邮箱!');
        } else if (!regPsdExp.test(this.form.adminPassword)) {
          Message('请正确填写用户密码!(6-20位包含数字和字母)');
        } else {
          let res = await getAdminVecode(this.form.adminEmail, this.form.adminName)

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
    }
  }
</script>

<style scoped>
    #adminmanage {
        width: 100%;
        height: 100%;
    }

    .tableborder {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        border-right: 1px #cccccc solid;
        padding-right: 10px;

    }

    .pagination {
        position: absolute;
        bottom: 20px;
    }

    .rightbox {
        text-align: center;
    }
</style>
