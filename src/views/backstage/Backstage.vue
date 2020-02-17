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
                    <router-link to="/backstage/overview">
                        <el-menu-item index="1">
                            <i class="el-icon-set-up"></i>
                            <span slot="title">概览</span>
                        </el-menu-item>
                    </router-link>

                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-user"></i>
                            <span>用户管理</span>
                        </template>
                        <el-menu-item-group>
                            <template slot="title">用户</template>
                            <router-link to="/backstage/usermanage">
                                <el-menu-item index="2-1">用户管理</el-menu-item>
                            </router-link>
                            <router-link to="/backstage/useranalysis">
                                <el-menu-item index="2-2">用户数据分析</el-menu-item>
                            </router-link>
                            <router-link to="/backstage/useraction">
                                <el-menu-item index="2-3">用户行为分析</el-menu-item>
                            </router-link>

                        </el-menu-item-group>
                    </el-submenu>


                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-tickets"></i>
                            <span>文章管理</span>
                        </template>
                        <el-menu-item-group>
                            <template slot="title">文章</template>
                            <router-link to="/backstage/articlemanage">
                                <el-menu-item index="3-1">文章管理</el-menu-item>
                            </router-link>
                            <router-link to="/backstage/articleanalysis">
                                <el-menu-item index="3-2">文章数据分析</el-menu-item>
                            </router-link>
                            <router-link to="/backstage/articleaction">
                                <el-menu-item index="3-3">文章价值分析</el-menu-item>
                            </router-link>

                        </el-menu-item-group>
                    </el-submenu>

                    <router-link to="/backstage/specialmanage">
                        <el-menu-item index="4">
                            <i class="el-icon-notebook-1"></i>
                            <span  slot="title">专题管理</span>
                        </el-menu-item>
                    </router-link>

                    <router-link to="/backstage/chatmanage">
                        <el-menu-item index="5">
                            <i class="el-icon-chat-square"></i>
                            <span slot="title">评论管理</span>
                        </el-menu-item>
                    </router-link>
                    <router-link to="/backstage/adminmanage">
                        <el-menu-item index="6">
                            <i class="el-icon-s-custom"></i>
                            <span slot="title">管理员管理</span>
                        </el-menu-item>
                    </router-link>
                    <router-link to="/backstage/operation">
                        <el-menu-item index="7">
                            <i class="el-icon-data-analysis"></i>
                            <span slot="title">运营数据</span>
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
    watch: {
      // 监听路由改变刷新页面
      $route(to, from) {
        this.reqUserInfo()
      }
    },
    mounted() {
      // 自动登录
      this.reqUserInfo()
    },
    created() {

      this.init()

    },
    computed: {
      ...mapState(['userInfo'])
    },
    methods: {
      ...mapMutations(['RESET_USER_INFO']),
      ...mapActions(['reqUserInfo']),

      init() {
        console.log(this.userInfo);
      },

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
