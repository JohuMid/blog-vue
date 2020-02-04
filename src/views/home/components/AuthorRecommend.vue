<template>
    <div id="authorrecommend">
        <el-row :gutter="20">
            <el-col :span="14" :offset="5">
                <el-card style="margin-bottom: 30px;" :style="{ 'background-image': 'url(' +require('./../../../../src/assets/register.png') + ')','background-size':'100%,100%','background-position':'center' }">
                    <span style="color: white;font-weight: bolder;font-size: 20px">推荐作者</span>

                </el-card>
            </el-col>
            <el-col :span="14" :offset="5">
                <el-row :gutter="20">
                    <el-col :span="8" v-for="(item , index) in userRecommendList" :key="item.uId">
                        <div class="content">
                            <el-card>
                                <div style="text-align: center">
                                    <div>
                                        <el-avatar :size="50"
                                                   :src="imgBaseUrl+item.userAvatar"
                                                   alt="...">
                                        </el-avatar>
                                    </div>
                                    <router-link
                                            tag="h2"
                                            :to="`/navbar/users/`+item.uId+``"
                                            style="margin-top: 10px;margin-bottom: 10px;cursor: pointer">
                                        {{item.userName}}
                                        <i v-if="item.userSex=='男'" class="el-icon-male" style="color: #409eff"></i>
                                        <i v-else-if="item.userSex=='女'" class="el-icon-female" style="color: #ff8774"></i>
                                        <i v-else ></i>
                                    </router-link>

                                    <p style="margin-bottom: 20px;">{{item.userStatement}}</p>
                                    <el-button v-if="!item.isAttention" type="primary" round
                                               @click="attention(item.uId)">关注
                                    </el-button>
                                    <el-button v-else type="danger" round
                                               @click="attention(item.uId)">取消关注
                                    </el-button>
                                </div>

                                <el-divider content-position="left"></el-divider>
                                <p>

                                    <el-row style="text-align: center">
                                        <el-col :span="8">
                                            <div class="grid-content bg-purple">
                                                <el-tooltip class="item" effect="dark" :content="'发布文章'+
                                        item.userTopicNum+
                                        '篇'" placement="left">
                                                    <i class="el-icon-document">{{' '+item.userTopicNum}}</i>
                                                </el-tooltip>
                                            </div>
                                        </el-col>
                                        <el-col :span="8">
                                            <div class="grid-content bg-purple-light">
                                                <el-tooltip class="item" effect="dark" :content="'文章被收藏'+
                                        item.userCollectNum+
                                        '次'" placement="top">
                                                    <i class="el-icon-star-off">{{' '+item.userCollectNum}}</i>
                                                </el-tooltip>
                                            </div>
                                        </el-col>
                                        <el-col :span="8">
                                            <div class="grid-content bg-purple">
                                                <el-tooltip class="item" effect="dark" :content="'被关注'+
                                        item.userAttentionNum+
                                        '次'" placement="right">
                                                    <i class="el-icon-thumb">{{' '+item.userAttentionNum}}</i>
                                                </el-tooltip>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </p>
                            </el-card>
                        </div>
                    </el-col>

                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  import {mapActions, mapState} from "vuex";
  import {getValueUser} from "../../../service/api/analysis";
  import {userAttention, userCancelAttention} from "../../../service/api";
  import {Message} from "element-ui";


  export default {
    name: "AuthorRecommend",
    data() {
      return {
        userRecommendList: []
      }
    },
    created() {
      this.reqUserInfo()
      // 获取文章简要信息
      this.getValueList();
    },
    computed: {
      ...mapState(['userInfo'])
    },
    methods: {
      ...mapActions(['reqUserInfo']),
      async getValueList() {

        if (this.userInfo) {
          // 已经登录
          console.log('已经登录');
          let res = await getValueUser(this.userInfo.uId)

          if (res.err_code === 0) {
            this.userRecommendList = res.results
          }

        } else {
          // 没有登录
          console.log('没登录啊');
          let res = await getValueUser(0)

          if (res.err_code === 0) {
            console.log(res.results);
            this.userRecommendList = res.results
          }
        }


        // 加载防止闪烁
        this.$emit('func', '我好了')
      },
      // 关注，取消关注
      async attention(usersId) {

        // 被关注人Id
        // console.log(usersId);

        if (this.userInfo) {
          for (let i = 0; i < this.userRecommendList.length; i++) {
            if (this.userRecommendList[i].uId === usersId) {
              // this.userRecommendList[i].isAttention

              if (this.userRecommendList[i].isAttention === false) {
                console.log('没关注');
                let res = await userAttention(this.userInfo.uId, usersId)
                if (res.err_code === 0) {
                  Message({
                    type: 'success',
                    showClose: true,
                    message: '您已关注该用户!'
                  });
                  this.userRecommendList[i].isAttention = !this.userRecommendList[i].isAttention

                  // 存储关注状态
                  this.$socket.emit('like', {
                    fromId: this.userInfo.uId,
                    toId: usersId
                  })
                }
              } else {
                console.log('关注了');

                let res = await userCancelAttention(this.userInfo.uId, usersId)
                if (res.err_code === 0) {
                  Message({
                    type: 'warning',
                    showClose: true,
                    message: '您已取消关注此用户!'
                  });
                  this.userRecommendList[i].isAttention = !this.userRecommendList[i].isAttention
                }
              }
            }
          }
        } else {
          Message('请先登录后再关注!');
        }
      },
    }
  }
</script>

<style scoped>
    .content {
        margin-bottom: 30px;
    }

</style>
