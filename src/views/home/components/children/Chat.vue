<template>
    <div id="chat">
        <div class="grid-content list-shadow word" id="chatbox">
            <el-row :gutter="20">

                <el-col :span="20" :offset="2">
                    <el-row class="bottom">
                        <el-col :span="20">
                            <div class="grid-content bg-purple">
                                <el-form ref="form" :model="form" label-width="80px">
                                    <el-input type="text" v-model="form.chat">

                                    </el-input>
                                </el-form>
                            </div>
                        </el-col>
                        <el-col :span="2">
                            <div class="grid-content bg-purple-light">
                                <el-button type="primary" round @click="topicChat">发表评论</el-button>
                            </div>
                        </el-col>
                    </el-row>
                    <ul class="media-list">
                        <li v-for="(item,index) in chatList" :key="index" class="list-shadow list"
                            @mouseenter="enterChat(item.rId)" @mouseleave="leaveChat()">
                            <el-row>
                                <el-col :span="4" style="text-align: center;width: 60px;">
                                    <div class="grid-content ">
                                        <router-link class="users"
                                                     :to="`/navbar/users/`+item.uId+``"
                                        >
                                            <el-avatar shape="square"
                                                       :size="30"
                                                       :src="imgBaseUrl+item.userAvatar+``"
                                                       alt="..."></el-avatar>
                                        </router-link>
                                    </div>
                                </el-col>
                                <el-col :span="20">
                                    <div class="grid-content">
                                        <router-link :to="`/navbar/users/`+item.uId+``">{{item.userName}}</router-link>
                                    </div>
                                    <div class="grid-content">
                                        <span>{{item.rChat}}</span>
                                    </div>
                                    <el-button v-if="isTextShow" style="position: absolute;top: 0;right: 30px;"
                                               type="text"
                                               @click="clickReply(index,item.userName)">回复
                                    </el-button>
                                </el-col>

                                <el-col :span="20" :offset="0" style="margin-top: 5px;">
                                    <el-row class="reply" v-if="item.isChatShow"
                                            style="margin-left: 60px;margin-top: 10px;">
                                        <el-col :span="14">
                                            <div class="grid-content bg-purple">
                                                <el-form ref="form" :model="form" label-width="80px">
                                                    <el-input type="text" v-model="form.reply"
                                                              :placeholder="rPlaceholder">

                                                    </el-input>
                                                </el-form>
                                            </div>
                                        </el-col>
                                        <el-col :span="10">
                                            <div class="grid-content bg-purple-light">
                                                <el-button type="primary" round
                                                           @click="replyChat(item.uId,item.rId,index)">回复
                                                </el-button>
                                                <el-button type="danger" round @click="cancelReply(index)">取消
                                                </el-button>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </el-col>
                                <div style="width: 100px;height: 50px;position: absolute;top: 50px;"></div>
                                <el-col :span="20" :offset="0" style="margin-top: 10px;">

                                    <ol v-for="(item,index) in item.reply" :key="item.rcId"
                                        style="margin-bottom: 5px;">
                                        <el-row style="margin-left: 60px;color: #7c7c7c;font-size: 14px">
                                            <el-col :span="20">
                                                <router-link
                                                        style="font-weight: bolder;color: #3d3d3d"
                                                        :to="`/navbar/users/`+item.uId+``"
                                                >
                                                    {{item.userName}}
                                                </router-link>
                                                {{item.rcReply}}
                                            </el-col>

                                        </el-row>
                                    </ol>
                                </el-col>

                            </el-row>

                        </li>
                    </ul>
                </el-col>
            </el-row>
        </div>

    </div>
</template>

<script>
  import {getStore} from "../../../../config/global";
  import {getChat, publishChat, publishReplyChat} from "../../../../service/api";
  import {Message} from "element-ui";
  import {mapState} from 'vuex'

  export default {
    props: ["uId"],
    name: "Chat",
    data() {
      return {
        form: {
          chat: '',
          reply: ''
        },
        chatList: [],
        // 回复是否显示
        isTextShow: 0,
        rPlaceholder: ''
      }
    },
    created() {
      this.getTopicChat()
    },
    computed: {
      ...mapState(['userInfo']),
    },
    watch: {
      // 监听路由改变刷新页面
      $route(to, from) {
        this.getTopicChat()
      }
    },
    methods: {
      // 获取评论
      async getTopicChat() {


        // let topicIndex = getStore('topicIndex')
        let res = await getChat(this.$route.params.tId)

        let chatList = (JSON.parse(res.results))

        // console.log(chatList);

        for (let i = 0; i < chatList.length; i++) {
          chatList[i]['isChatShow'] = 0
        }

        this.chatList = chatList

        this.chatNum = this.chatList.length

        this.$emit('func', this.chatNum)
      },
      // 发表评论
      async topicChat() {

        if (this.userInfo) {

          if (!(this.form.chat.trim())) {
            Message('请输入内容后在发表评论!');

          } else {
            let res = await publishChat(this.userInfo.uId, this.$route.params.tId, this.form.chat)
            if (res.err_code === 0) {
              Message({
                type: 'success',
                showClose: true,
                message: '发表评论成功!'
              });

              let newChat = {
                rId: res.rId,
                uId: this.userInfo.uId,
                userAvatar: this.userInfo.userAvatar,
                userName: this.userInfo.userName,
                rChat: this.form.chat,
                reply:[]
              };

              // 存储评论状态
              this.$socket.emit('chat', {
                tId: this.$route.params.tId,
                fromId: this.userInfo.uId,
                toId: this.uId
              })

              this.chatList.unshift(newChat)
              this.form.chat = ''
              this.$emit('func', 'OK')
            }
          }
        } else {
          Message('请登录后在发表评论!');
        }
      },
      // 点击回复
      clickReply(index, name) {

        for (let i = 0; i < this.chatList.length; i++) {
          if (Number(index) === Number(i)) {
            this.chatList[index].isChatShow = 1
          } else {
            this.chatList[i].isChatShow = 0
          }
        }

        this.rPlaceholder = '回复' + name


      },
      // 回复评论
      async replyChat(uId, rId, index) {

        if (this.userInfo) {

          if (!(this.form.reply.trim())) {
            Message('请输入内容后再回复!');
          } else {

            let res = await publishReplyChat(rId, this.userInfo.uId, this.$route.params.tId, this.userInfo.userName, this.form.reply)
            if (res.err_code === 0) {
              Message({
                type: 'success',
                showClose: true,
                message: '回复成功!'
              });

              let newReply = {
                rId: rId,
                uId: this.userInfo.uId,
                tId: this.$route.params.tId,
                userName: this.userInfo.userName,
                rcReply: this.form.reply,
              }

              this.chatList[index].reply.unshift(newReply)

              for (let i = 0; i < this.chatList.length; i++) {
                this.chatList[i].isChatShow = 0
              }
              this.form.reply = ''

              // 存储回复状态
              this.$socket.emit('reply', {
                tId: this.$route.params.tId,
                fromId: this.userInfo.uId,
                toId: uId
              })


              /*let newChat = {
                uId: this.userInfo.uId,
                userAvatar: this.userInfo.userAvatar,
                userName: this.userInfo.userName,
                rChat: this.form.chat,
              };

              // 存储评论状态
              this.$socket.emit('chat', {
                tId: this.$route.params.tId,
                fromId: this.userInfo.uId,
                toId: this.uId
              })

              this.chatList.unshift(newChat)
              this.form.chat = ''
              this.$emit('func', 'OK')*/
            }
          }
        } else {
          Message('请登录后再回复!');
        }
      },
      // 取消回复
      cancelReply(index) {
        this.chatList[index].isChatShow = 0
      },
      enterChat(rId) {
        // console.log(rId);
        this.isTextShow = 1
      },
      leaveChat() {
        this.isTextShow = 0
      }
    }
  }
</script>

<style scoped>
    .list-shadow {
        background: #ffffff;
        border-radius: 10px;
        padding-top: 20px;
        margin-top: 20px;
    }

    .reply {
        margin-top: 40px;
    }

    .bottom {
        margin-bottom: 20px;
    }

</style>
