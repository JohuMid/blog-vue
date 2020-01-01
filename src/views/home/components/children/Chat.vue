<template>
    <div id="chat">
        <div class="grid-content list-shadow word" id="chatbox">
            <el-row :gutter="20">

                <el-col :span="20" :offset="2">
                    <el-row class="bottom">
                        <el-col :span="20">
                            <div class="grid-content bg-purple">
                                <el-form ref="form" :model="form" label-width="80px">
                                    <el-input type="text" v-model="form.chat"></el-input>
                                </el-form>
                            </div>
                        </el-col>
                        <el-col :span="2">
                            <div class="grid-content bg-purple-light">
                                <el-button type="primary" @click="topicChat">发表评论</el-button>
                            </div>
                        </el-col>
                    </el-row>
                    <ul class="media-list">
                        <li v-for="(item,index) in chatList" :key="index" class="list-shadow list">
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
  import {getChat, publishChat} from "../../../../service/api";
  import {Message} from "element-ui";
  import {mapState} from 'vuex'

  export default {
    props:["uId"],
    name: "Chat",
    data() {
      return {
        form: {
          chat: '',
        },
        chatList: [],

      }
    },
    created() {
      this.getTopicChat()
    },
    computed: {
      ...mapState(['userInfo']),
    },
    methods: {
      // 获取评论
      async getTopicChat() {

        // let topicIndex = getStore('topicIndex')
        let res = await getChat(this.$route.params.tId)

        this.chatList = (JSON.parse(res.results));

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
                uId:this.userInfo.uId,
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
              this.$emit('func', 'OK')
            }
          }
        } else {
          Message('请登录后在发表评论!');
        }
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

    .bottom {
        margin-bottom: 20px;
    }

</style>