<template>
    <div id="navbar">
        <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <router-link to="/" tag="el-menu-item" index="1">
                <img style="width: 50px;" src="./../../assets/logo.png" alt="">
                <h2 class="title">Superman Can Not Fly</h2>

            </router-link>

            <el-col :span="4" style="line-height: 60px;position: relative;">
                <el-input placeholder="请输入内容" v-model="searchInput" class="input-with-select">

                </el-input>
                <span class="el-icon-search"
                      style="position: absolute;top: 20px;right: 20px;font-size: 20px;color: #7c7c7c;"
                      @click="searchList()"></span>

            </el-col>

            <el-row v-if="userInfo===null" style="float: right;">

                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <el-menu-item index="2">
                            <router-link to="/login" tag="el-button" type="primary">登录</router-link>
                        </el-menu-item>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple-light">
                        <el-menu-item index="3">
                            <router-link to="/register" tag="el-button" type="success">注册</router-link>
                        </el-menu-item>
                    </div>
                </el-col>
            </el-row>
            <el-row v-else style="float: right; margin-right: 20px;">

                <el-col :span="6" class="about">
                    <el-dropdown trigger="click">

                        <el-badge class="mark" :value="aboutNum" :max="99">
                            <span class="el-dropdown-link">关于我<i class="el-icon-caret-bottom el-icon--right"></i></span>
                        </el-badge>


                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item class="clearfix" v-show="noAbout">
                                你暂时还没有消息
                            </el-dropdown-item>
                            <el-dropdown-item class="clearfix" v-for="(item,index) in aboutList" :key="item.sId">
                                你的文章
                                <router-link :to="'/navbar/article/'+item.tId">
                                    《{{item.tTopic}}》
                                </router-link>
                                被
                                <router-link :to="'/navbar/users/'+item.uId">
                                    {{item.userName}}
                                </router-link>
                                {{item.type|aboutWord}}
                                了
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
                <el-col :span="10">
                    <div class="grid-content">
                        <el-submenu index="2">
                            <template slot="title">
                                <el-avatar shape="square"
                                           :size="30"
                                           :src="imgBaseUrl+userInfo.userAvatar+`` "
                                ></el-avatar>
                                {{userInfo.userName}}
                            </template>
                            <router-link tag="el-menu-item" index="2-1" to="/navbar/user">
                                <span class="el-icon-user"></span>个人中心
                            </router-link>
                            <el-menu-item index="2-2" @click="logOut"><span class="el-icon-switch-button"></span>退出登录
                            </el-menu-item>
                        </el-submenu>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content">
                        <el-menu-item index="3">
                            <router-link to="/navbar/publish" tag="el-button">发布文章</router-link>
                        </el-menu-item>
                    </div>
                </el-col>
            </el-row>
        </el-menu>

        <!--        填充层div-->
        <div class="box"></div>

        <div v-show="show"
             class="loading"
             v-loading="loading"
             element-loading-text="拼命加载中">

            <router-view @func="getMsgFormSon"></router-view>
        </div>

        <el-backtop target="#app" title="回到顶部"></el-backtop>

        <div class="footer">
            Superman Can not Fly
        </div>

    </div>
</template>

<script>
  import ArticleList from "../home/ArticleList";
  import Search from "../home/components/Search";
  import {getLogOut} from "../../service/api";
  import {mapState, mapMutations, mapActions} from 'vuex'
  import {Message} from "element-ui";

  export default {
    inject: ["reload"],
    name: "NavBar",
    data() {
      return {
        loading: 1,
        show: 0,
        avatarSrc: '',
        // 消息条目
        aboutList: [],
        // 消息条数
        aboutNum: 0,
        // 是否显示你没有消息
        noAbout: false,
        // 搜索内容
        searchInput: ''
      };
    },
    created() {

    },
    mounted() {
      // 自动登录
      this.reqUserInfo()
      // 没登录时候填充头像避免error
      this.isUserInfo()
      if (this.userInfo) {
        this.$socket.emit('online', this.userInfo.uId)
      }
    },
    computed: {
      ...mapState(['userInfo']),
    },

    methods: {
      ...mapMutations(['RESET_USER_INFO']),
      ...mapActions(['reqUserInfo']),

      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
      },
      // 退出登录
      async logOut() {
        let res = await getLogOut();
        if (res.err_code === 7) {
          // 清空本地数据
          this.RESET_USER_INFO();
          this.$router.replace('/#/')
          this.reload();
        }
      },

      isUserInfo() {
        if (!this.userInfo.token) {
          this.avatarSrc = '123'
        } else {
          // console.log(22222222);
        }
      },
      // 搜索内容
      searchList() {

        console.log();

        if (!(this.searchInput.trim())) {
          Message('请输入内容后搜索!');
        } else {
          this.$router.push('/navbar/search/' + this.searchInput)
          this.searchInput=''
        }
      },
      getMsgFormSon(data) {
        if (data === '我好了') {
          this.loading = 0
          this.show = 1
        }
      }
    },
    // 消息系统的接收
    sockets: {
      connection: function (data) {

        // console.log(data);

        // 有消息则填充消息通知表
        // 没消息则显示：你暂时没有消息
        if (!data) {
          this.noAbout = true
        } else {
          var res = JSON.parse(data);
          this.aboutList = res;
          this.aboutNum = res.length
        }
      },
      /*customEmit: function (data) {
        console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
      }*/
    },
    components: {
      ArticleList,
      Search
    }
  }
</script>

<style scoped>
    #navbar {
        width: 100%;
        height: 100%;
    }

    .box {
        width: 100%;
        height: 60px;
    }

    .title {
        display: inline;
    }

    .footer {
        width: auto;
        margin: 0 auto;
        position: fixed;
        bottom: 0;
        text-align: center;
        color: #90939c;
    }

    .loading {
        width: 100%;
        height: 90%;
    }

    .el-menu-demo {
        opacity: 0.8;
        z-index: 99;
        width: 100%;
        position: fixed;

    }

    .about {
        margin-top: 15px;
        cursor: pointer;
    }


</style>