<template>
    <div id="article">
        <div>
            <el-row :gutter="20">
                <el-col :span="16" :offset="4">
                    <div class="grid-content list-shadow word">
                        <el-row :gutter="20">

                            <el-col :span="22" :offset="1">

                                <el-row>
                                    <el-col :span="18">
                                        <div class="grid-content ">
                                            <h1 v-cloak>{{topic}}</h1>
                                            <p v-cloak>{{time|timeFormatSimple}}发布</p>
                                        </div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div class="grid-content">
                                            <el-row>
                                                <el-col :span="12" style="width: 80px;">
                                                    <div class="grid-content ">
                                                        <el-avatar :size="70" :src="avatarSrc"
                                                                   shape="square"></el-avatar>
                                                    </div>
                                                </el-col>
                                                <el-col :span="12">
                                                    <div class="grid-content ">
                                                        <h3>作者：</h3>
                                                        <p v-cloak>{{userName}}</p>
                                                    </div>
                                                </el-col>
                                            </el-row>

                                        </div>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                        <el-divider></el-divider>
                        <div>
                            <el-row :gutter="20">
                                <el-col :span="22" :offset="1">
                                    <div class="words topicImg" v-html="contents"></div>
<!--                                    正文开始-->
                                </el-col>
                            </el-row>
                        </div>
                    </div>

                    <!--评论子组件-->

                    <Chat @func="getMsgFormSon" :uId="this.uId"></Chat>

                    <div class="rightbar">
                        <ul class="list-shadow">

                            <li>
                                <el-tooltip class="item" effect="dark" :content="collectTip" placement="left">
                                    <span v-if="isStar" :class="this.class[0]" @click="star"></span>
                                    <span v-else :class="this.class[1]" @click="star"></span>
                                </el-tooltip>
                                <p>{{collectNum}}</p>
                            </li>
                            <li>
                                <el-tooltip class="item" effect="dark" content="评论" placement="left">
                                    <span class="el-icon-chat-round"></span>
                                </el-tooltip>
                                <p>
                                    {{chatNum}}
                                </p>
                            </li>
                            <li @click="prevTopic">
                                <el-tooltip class="item" effect="dark" content="上一篇" placement="left">
                                    <span class="el-icon-back"></span>
                                </el-tooltip>
                                <p>上一篇</p>
                            </li>
                            <li @click="nextTopic">
                                <el-tooltip class="item" effect="dark" content="下一篇" placement="left">
                                    <span class="el-icon-right"></span>
                                </el-tooltip>
                                <p>下一篇</p>

                            </li>
                        </ul>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
  import {getStore, setStore} from "../../../config/global";
  import {
    getTopicDetail,
    prevAllTopic,
    nextAllTopic,
    userCollect,
    userIsStar,
    userCancelCollect
  } from "../../../service/api";
  import {Message} from 'element-ui'
  import Chat from "./children/Chat";
  import {mapActions, mapState} from 'vuex'


  export default {
    name: "Article",
    data() {
      return {
        avatarSrc: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        isStar: false,
        class: ['el-icon-star-on', 'el-icon-star-off'],
        uId: 0,
        topic: '',
        contents: '',
        time: '',
        userName: '',
        chatNum: 0,
        collectNum: 0,
        // 收藏提示
        collectTip: '收藏'
      }
    },
    components: {
      Chat
    },
    computed: {
      ...mapState(['userInfo']),
    },
    created() {
      this.reqUserInfo()
      this.getTopic();
      this.isUserStar();

    },
    watch: {
      // 监听路由改变刷新页面
      $route(to, from) {
        this.$router.go(0)
      }

    },
    methods: {
      ...mapActions(['reqUserInfo']),
      // 收藏,取消收藏
      async star() {
        if (this.userInfo) {

          if (this.isStar === false) {
            let res = await userCollect(this.userInfo.uId, this.$route.params.tId)
            if (res.err_code === 0) {
              Message({
                type: 'success',
                showClose: true,
                message: '收藏成功!'
              });

              this.collectTip = '取消收藏'

              this.collectNum += 1
              this.isStar = !this.isStar

              // 存储收藏状态
              this.$socket.emit('star', {
                tId: this.$route.params.tId,
                fromId: this.userInfo.uId,
                toId: this.uId
              })
            }
          } else {
            let res = await userCancelCollect(this.userInfo.uId, this.$route.params.tId)
            if (res.err_code === 0) {
              Message({
                type: 'warning',
                showClose: true,
                message: '您已取消收藏此文章!'
              });
              this.collectTip = '收藏'
              this.isStar = !this.isStar;
              this.collectNum -= 1
            }
          }
        } else {
          Message('请先登录后再收藏!');
        }
      },
      // 判断当前文章是否被当前用户收藏
      async isUserStar() {

        if (this.userInfo) {
          let res = await userIsStar(this.userInfo.uId, this.$route.params.tId)

          if (res.err_code === 0) {
            var res1 = JSON.parse(res.results);
            if (!res1[0]) {
              // console.log('未收藏');
              this.collectTip = '收藏'
            } else {
              this.isStar = true
              this.collectTip = '取消收藏'
            }

            var res2 = JSON.parse(res.results2)

            this.collectNum = res2[0]['COUNT(*)']
          }
        } else {
          // console.log('没登录');
        }

      },
      // 获取文章详细信息
      async getTopic() {
        // let topicIndex = getStore('topicIndex')
        let res = await getTopicDetail(this.$route.params.tId)

        if (res.err_code === 0) {
          // 文章详细信息
          var results = JSON.parse(res.results)[0]


          this.contents = Base64.decode(results.tContents)

          var reg = /<\s*img\s+[^>]*?src\s*=\s*(\'|\")(.*?)\1[^>]*?\/?\s*>/;

          var src = /\bsrc\b\s*=\s*[\'\"]?([^\'\"]*)[\'\"]?/i

          var url = (this.contents.match(reg)[0]);

          var insertHtml;
          var re = /src=\"([^\"]*?)\"/i;
          var arr = url.match(re);
          if (arr != undefined && arr.length > 0) {
            insertHtml = arr[1];
          }
          console.log(insertHtml);


          this.topic = results.tTopic
          this.time = results.tTime
          this.userName = results.userName
          this.uId = results.uId

          this.avatarSrc = this.imgBaseUrl + results.userAvatar

          // 加载防止闪烁
          this.$emit('func', '我好了')
        }
      },
      // 上一篇
      async prevTopic() {
        // let topicIndex = getStore('topicIndex')

        let res = await prevAllTopic(this.$route.params.tId)

        if (res.err_code === 8) {
          Message('没有上一篇了!');

        } else if (res.err_code === 0) {
          // setStore('topicIndex', JSON.parse(res.results)[0].tId)
          this.$router.push(`/navbar/article/` + JSON.parse(res.results)[0].tId + ``)
        }

      },
      // 下一篇
      async nextTopic() {
        // let topicIndex = getStore('topicIndex')
        let res = await nextAllTopic(this.$route.params.tId)
        if (res.err_code === 9) {
          Message('没有下一篇了!');

        } else if (res.err_code === 0) {
          this.$router.push(`/navbar/article/` + JSON.parse(res.results)[0].tId + ``)
        }
      },
      // 获取评论条数
      getMsgFormSon(data) {

        if (data === 'OK') {
          this.chatNum += 1
        } else {
          this.chatNum = data
        }
      }
    },


  }
</script>

<style scoped>
    .list-shadow {
        background: #ffffff;
        border-radius: 10px;
        padding-top: 20px;
        margin-top: 20px;
    }

    .word {
        padding-bottom: 20px;
    }

    .words {
        word-wrap: break-word;
        word-break: break-all;
    }

    .rightbar {
        width: 60px;
        text-align: center;
        position: fixed;
        right: 40px;
        top: 55px;
    }

    .rightbar ul li {
        cursor: pointer;
        height: 80px;
        padding-bottom: 0;
    }

    .rightbar ul li span {
        font-size: 20px;
    }

    .el-icon-star-on {
        color: #409eff;
    }

    [v-clock] {
        display: none;
    }


</style>