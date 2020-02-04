<template>
    <div id="article">
        <div>
            <el-row :gutter="20">
                <el-col :span="12" :offset="4">
                    <div class="grid-content list-shadow word"
                         :style="bgStyle[tRecommend-1]">
                        <el-row :gutter="20">
                            <el-col :offset="1">
                                <el-row>
                                    <el-col :span="23">
                                        <div class="grid-content">
                                            <h1 v-cloak>{{topic}}</h1>
                                            <p v-cloak style="font-size: 14px; line-height: 22px;">
                                                {{time|timeFormatSimple}}
                                                <span style="margin-left: 10px;margin-right: 10px;">发布</span>
                                                <el-tag
                                                        :key="tag"
                                                        v-for="tag in dynamicTags"
                                                        :disable-transitions="false"
                                                        @click="tagPage(tag)">
                                                    {{tag}}
                                                </el-tag>
                                            </p>
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                        <el-divider></el-divider>
                        <div>
                            <el-row :gutter="20">
                                <el-col :span="22" :offset="1">
                                    <div class="ql-container ql-snow">
                                        <div class="ql-editor" v-html="contents" v-highlight>
                                            <!--正文开始-->
                                        </div>
                                    </div>
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
                                <p>{{chatNum}}</p>
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
                <el-col :span="4" :offset="0">
                    <div class="grid-content list-shadow word">
                        <el-row :gutter="20">
                            <el-col :span="12" style="width: 50px;text-align: center;margin-left: 20px;">
                                <div class="grid-content">
                                    <el-avatar :size="40" :src="avatarSrc"
                                               shape="square"></el-avatar>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content" style="font-size: 16px; line-height: 22px;cursor:pointer;">
                                    <router-link
                                            :to="`/navbar/users/`+this.uId+``"
                                            tag="span">
                                        <p v-cloak>{{userName}}</p>
                                    </router-link>
                                </div>
                            </el-col>

                        </el-row>
                        <el-divider content-position="left">最近更新</el-divider>
                        <div style="font-size: 14px; line-height: 22px;margin-left: 10px;margin-right: 10px;">
                            <p class="topiclist" v-for="(item,index) in topicList" :key="item.tId">
                                <router-link
                                        tag="span"
                                        :to="`/navbar/article/`+item.tId+``">
                                    {{item.tTopic}}
                                </router-link>
                            </p>
                        </div>

                    </div>
                    <div class="grid-content list-shadow word">
                        <h4 style="display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 16px;border-left: 4px solid #409eff;margin-left: 20px;padding-left: 6px;">本文云图</h4>

                        <div id="main" style="width: 270px;height: 270px;"></div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
  import {
    getTopicDetail,
    prevAllTopic,
    nextAllTopic,
    userCollect,
    userIsStar,
    userCancelCollect
  } from "../../../service/api";
  import {Message} from "element-ui";
  import Chat from "./children/Chat";
  import {mapActions, mapState} from "vuex";

  export default {
    name: "Article",
    data() {
      return {
        avatarSrc:
          "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        isStar: false,
        class: ["el-icon-star-on", "el-icon-star-off"],
        uId: 0,
        topic: "",
        contents: "",
        time: "",
        userName: "",
        chatNum: 0,
        collectNum: 0,
        // 收藏提示
        collectTip: "收藏",
        // 标签设置
        dynamicTags: [],
        inputVisible: false,
        //  文章列表
        topicList: [],
        //  定时器
        timer: {},
        //  窗口高度
        screenHeight: window.innerHeight,
        tRecommend: 0,
        bgStyle: [{
          'background-image': 'url(' + require('./../../../../src/assets/recommend1.png') + ')',
          'background-size': '140px,100%',
          'background-position': 'top right',
          'background-repeat': 'no-repeat'
        }, {
          'background-image': 'url(' + require('./../../../../src/assets/recommend2.png') + ')',
          'background-size': '140px,100%',
          'background-position': 'top right',
          'background-repeat': 'no-repeat'
        }, {
          'background-image': 'url(' + require('./../../../../src/assets/recommend3.png') + ')',
          'background-size': '140px,100%',
          'background-position': 'top right',
          'background-repeat': 'no-repeat'
        }, {
          'background-image': 'url(' + require('./../../../../src/assets/recommend4.png') + ')',
          'background-size': '140px,100%',
          'background-position': 'top right',
          'background-repeat': 'no-repeat'
        }, {
          'background-image': 'url(' + require('./../../../../src/assets/recommend5.png') + ')',
          'background-size': '140px,100%',
          'background-position': 'top right',
          'background-repeat': 'no-repeat'
        }]
      };
    },
    components: {
      Chat
    },
    computed: {
      ...mapState(["userInfo"])
    },
    created() {
      this.reqUserInfo();
      this.getTopic();
    },
    beforeDestroy() {
      clearInterval(this.timer);
    },
    watch: {
      // 监听路由改变刷新页面
      $route(to, from) {
        this.getTopic();
      }
    },
    methods: {
      ...mapActions(["reqUserInfo"]),
      // 收藏,取消收藏
      async star() {
        if (this.userInfo) {
          if (this.isStar === false) {
            let res = await userCollect(
              this.userInfo.uId,
              this.$route.params.tId
            );
            if (res.err_code === 0) {
              Message({
                type: "success",
                showClose: true,
                message: "收藏成功!"
              });

              this.collectTip = "取消收藏";

              this.collectNum += 1;
              this.isStar = !this.isStar;

              // 存储收藏状态
              this.$socket.emit("star", {
                tId: this.$route.params.tId,
                fromId: this.userInfo.uId,
                toId: this.uId
              });
            }
          } else {
            let res = await userCancelCollect(
              this.userInfo.uId,
              this.$route.params.tId
            );
            if (res.err_code === 0) {
              Message({
                type: "warning",
                showClose: true,
                message: "您已取消收藏此文章!"
              });
              this.collectTip = "收藏";
              this.isStar = !this.isStar;
              this.collectNum -= 1;
            }
          }
        } else {
          Message("请先登录后再收藏!");
        }
      },
      // 判断当前文章是否被当前用户收藏
      async isUserStar() {
        if (this.userInfo.uId) {
          let res = await userIsStar(this.userInfo.uId, this.$route.params.tId);

          if (res.err_code === 0) {
            this.isStar = false;
            var res1 = JSON.parse(res.results);
            if (!res1[0]) {
              // console.log('未收藏');
              this.collectTip = "收藏";
            } else {
              this.isStar = true;
              this.collectTip = "取消收藏";
            }

            var res2 = JSON.parse(res.results2);

            this.collectNum = res2[0]["COUNT(*)"];
          }
        } else {
          // console.log('没登录');
        }
      },
      // 获取文章详细信息
      async getTopic() {
        // let topicIndex = getStore('topicIndex')
        let res = await getTopicDetail(this.$route.params.tId);

        if (res.err_code === 0) {

          console.log(res.words);
          // 文章详细信息
          let results = JSON.parse(res.results)[0];

          let model = JSON.parse(results.tModel)[0];

          this.topicList = JSON.parse(res.list)

          this.dynamicTags = []

          for (let key in model) {
            if (model[key] === 1) {
              this.dynamicTags.push(key)
            }
          }

          let styleReg = /style\s*?=\s*?(['"])[\s\S]*?\1/g;
          let widthReg = /width\s*?=\s*?(['"])[\s\S]*?\1/g;
          let heightReg = /height\s*?=\s*?(['"])[\s\S]*?\1/g;

          // 清除文章字符串的行内样式
          this.contents = (results.tContents).replace(styleReg, '').replace(widthReg, '').replace(heightReg, '');

          // 获取文章头图
          /*var reg = /<\s*img\s+[^>]*?src\s*=\s*(\'|\")(.*?)\1[^>]*?\/?\s*>/;

            var url = (this.contents.match(reg)[0]);

            var insertHtml;
            var re = /src=\"([^\"]*?)\"/i;
            var arr = url.match(re);
            if (arr != undefined && arr.length > 0) {
              insertHtml = arr[1];
            }*/
          // console.log(insertHtml);

          this.topic = results.tTopic;
          this.time = results.tTime;
          this.userName = results.userName;
          this.uId = results.uId;
          this.tRecommend = results.tRecommend
          console.log(results.tRecommend);


          this.avatarSrc = this.imgBaseUrl + results.userAvatar;

          // 加载防止闪烁
          this.$emit("func", "我好了");
        }
        // 判断是否收藏
        this.isUserStar();

        // 转换键名
        let word = res.words.map((item) => {
          return {name: item.word, value: item.weight}
        })

        // 加载云图
        this.echartsCloud(word)

        // 记录浏览时间，修订用户模型
        let model = JSON.parse(localStorage.getItem('model'))

        for (let key in model[0]) {
          for (let i = 0; i < this.dynamicTags.length; i++) {
            if (key == this.dynamicTags[i]) {

              this.timer = setInterval(function () {
                model[0][key]++
                localStorage.setItem('model', JSON.stringify(model))
              }, 1000)
            }
          }
        }
      },
      // 上一篇
      async prevTopic() {
        // let topicIndex = getStore('topicIndex')

        let res = await prevAllTopic(this.$route.params.tId);

        if (res.err_code === 8) {
          Message("没有上一篇了!");
        } else if (res.err_code === 0) {
          // setStore('topicIndex', JSON.parse(res.results)[0].tId)
          this.$router.push(
            `/navbar/article/` + JSON.parse(res.results)[0].tId + ``
          );
        }
      },
      // 下一篇
      async nextTopic() {
        // let topicIndex = getStore('topicIndex')
        let res = await nextAllTopic(this.$route.params.tId);
        if (res.err_code === 9) {
          Message("没有下一篇了!");
        } else if (res.err_code === 0) {
          this.$router.push(
            `/navbar/article/` + JSON.parse(res.results)[0].tId + ``
          );
        }
      },
      // 获取评论条数
      getMsgFormSon(data) {
        if (data === "OK") {
          this.chatNum += 1;
        } else {
          this.chatNum = data;
        }
      },
      tagPage(tag) {
        // console.log(tag);

        this.$router.push(`/navbar/tagpage/` + tag)
      },
      //  绘制云图
      echartsCloud(word) {

        var maskImage = new Image();
        var echarts = require('echarts');
        // require('echarts-wordcloud');
        var chart = echarts.init(document.getElementById('main'));

        var option = {
          series: [{
            type: 'wordCloud',

            // The shape of the "cloud" to draw. Can be any polar equation represented as a
            // callback function, or a keyword present. Available presents are circle (default),
            // cardioid (apple or heart shape curve, the most known polar equation), diamond (
            // alias of square), triangle-forward, triangle, (alias of triangle-upright, pentagon, and star.

            shape: 'circle',

            // A silhouette image which the white area will be excluded from drawing texts.
            // The shape option will continue to apply as the shape of the cloud to grow.

            maskImage: maskImage,
            // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
            // Default to be put in the center and has 75% x 80% size.

            left: 'center',
            top: 'center',
            width: '100%',
            height: '100%',
            right: null,
            bottom: null,
            sizeRange: [10, 30],

            // Text rotation range and step in degree. Text will be rotated randomly in range [-90, 90] by rotationStep 45

            rotationRange: [-90, 90],
            rotationStep: 45,

            // size of the grid in pixels for marking the availability of the canvas
            // the larger the grid size, the bigger the gap between words.

            gridSize: 5,

            // set to true to allow word being draw partly outside of the canvas.
            // Allow word bigger than the size of the canvas to be drawn
            drawOutOfBound: false,

            // Global text style
            textStyle: {
              normal: {
                fontFamily: 'sans-serif',
                fontWeight: 'bold',
                // Color can be a callback function or a color string
                color: function () {
                  // Random color
                  return 'rgb(' + [
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160)
                  ].join(',') + ')';
                }
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },

            // Data is an array. Each array item must have name and value property.
            data: word
          }]
        }
        maskImage.onload = function () {
          option.series[0].maskImage
          chart.setOption(option);
        }
        maskImage.src = require('./../../../../src/assets/mask.png');
      },
      scrollEvent(e) {
        console.log(e)
      },

    }

  };
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

    .ql-container {
        border: none;
    }

    .rightbar {
        width: 60px;
        text-align: center;
        position: fixed;
        right: 40px;
        top: 75px;
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

    .el-tag + .el-tag {
        margin-left: 10px;
    }

    .el-tag {
        cursor: pointer !important;
    }

    .topiclist {
        cursor: pointer;
        margin-bottom: 10px;

    }

    .topiclist:hover {
        text-decoration: underline;
    }

</style>
