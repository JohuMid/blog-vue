<template>
    <!--    登录验证管理员-->
    <div id="backstage">
        <el-menu mode="horizontal">
            <router-link to="/backstage" tag="el-menu-item" index="1">
                <img style="width: 50px;" src="./../../assets/avatar.png" alt="">
                <h2 class="title">Superman Can Not Fly Backstage</h2>
            </router-link>
            <el-row style="float: right; margin-right: 20px;">
                <el-col :span="11">
                    <div class="grid-content">
                        <el-menu-item index="2">
                            <el-tag type="info">管理员：{{userInfo.adminName}}</el-tag>
                        </el-menu-item>
                    </div>
                </el-col>
                <el-col :span="13">
                    <div class="grid-content">
                        <el-menu-item index="3">
                            <el-button
                                    type="danger"
                                    @click="logOut"
                            ><span class="el-icon-switch-button"></span>退出管理员登录
                            </el-button>
                        </el-menu-item>
                    </div>
                </el-col>
            </el-row>

        </el-menu>
        <el-row class="tac">
            <el-col class="leftmenu" :span="4">
                <el-menu
                        default-active="defaultActive">

                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-user"></i>
                            <span>用户管理</span>
                        </template>
                        <el-menu-item-group>
                            <template slot="title">用户</template>
                            <router-link to="/backstage/usermanage">
                                <el-menu-item index="1-1">用户管理</el-menu-item>
                            </router-link>
                            <router-link to="/backstage/useranalysis">
                                <el-menu-item index="1-2">用户数据分析</el-menu-item>
                            </router-link>
                            <router-link to="/backstage/useraction">
                                <el-menu-item index="1-3">用户行为分析</el-menu-item>
                            </router-link>

                        </el-menu-item-group>
                    </el-submenu>


                    <router-link to="/backstage/articlemanage">

                        <el-menu-item index="2">
                            <i class="el-icon-tickets"></i>
                            <span slot="title">文章管理</span>
                        </el-menu-item>
                    </router-link>
                    <router-link to="/backstage/chatmanage">

                        <el-menu-item index="3">
                            <i class="el-icon-chat-square"></i>
                            <span slot="title">评论管理</span>
                        </el-menu-item>
                    </router-link>
                </el-menu>
            </el-col>
            <el-col class="rightmenu" :span="20">
                <router-view></router-view>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  import {mapActions, mapMutations, mapState} from 'vuex'
  import {getLogOut} from "../../service/api";

  export default {
    inject: ["reload"],
    name: "Backstage",
    data() {
      return {
        defaultActive: 1
      }
    },
    created() {
      // 自动登录
      this.reqUserInfo();

    },
    computed: {
      ...mapState(['userInfo'])
    },
    methods: {
      ...mapMutations(['RESET_USER_INFO']),
      ...mapActions(['reqUserInfo']),

      async logOut() {
        let res = await getLogOut();
        if (res.err_code === 7) {
          // 清空本地数据
          this.RESET_USER_INFO();
          this.$router.replace('/#/')
          this.reload();
        }
      },

    },


  }
</script>

<style scoped>
    .title {
        display: inline;
    }

    .leftmenu {
        height: 100%;
        background: #ffffff;
    }

    .tac {
        width: 100%;
        height: 100%;
    }

    .rightmenu {
        height: 100%;
        padding: 30px;
        box-sizing: border-box;

    }

    #backstage {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .tableborder {
        width: 100%;
        height: 100%;
    }


</style>
