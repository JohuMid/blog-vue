<template>
    <div id="topicrecommend">
        <el-row :gutter="20">
            <el-col :span="14" :offset="5">
                <el-card style="margin-bottom: 30px;"
                         :style="{ 'background-image': 'url(' +require('./../../../../src/assets/register.png') + ')','background-size':'100%,100%','background-position':'center' }">
                    <span style="color: white;font-weight: bolder;font-size: 20px">推荐文章</span>

                </el-card>
            </el-col>
            <el-col :span="14" :offset="5">
                <el-row :gutter="20">
                    <el-col :span="8" v-for="(item , index) in topicRecommendList" :key="item.tId">
                        <div class="content">
                            <el-card>
                                <el-image
                                        style="width:100%; height: 200px;padding: 0;margin: 0"
                                        :src="item.tHeadImage"
                                        :fit="fits[0]"></el-image>
                                <p class="footnote">
                                    <el-avatar :size="25"
                                               :src="imgBaseUrl+item.userAvatar"
                                               alt="...">
                                    </el-avatar>

                                    <router-link
                                            class="users"
                                            :to="`/navbar/users/`+item.uId+``">
                                        <span style="color: #409eff;margin-right: 10px;margin-left: 10px;">{{item.userName}}</span>
                                    </router-link>

                                    发布
                                    <span style="margin-left: 10px;">{{item.tTime | timeFormatSimple}}</span>
                                </p>
                                <div style="overflow-y: auto;height: 150px;">
                                    <router-link
                                            tag="h3"
                                            style="font-weight: 400;margin-top: 10px;cursor: pointer"
                                            :to="`/navbar/article/`+item.tId+``"
                                            class="media-heading">
                                        {{item.tTopic}}
                                    </router-link>
                                    <p style="font-size: 15px; line-height: 26px;color: #999;">
                                        {{item.tWords+'...'}}
                                    </p>
                                </div>

                            </el-card>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  import {getValueTopic} from "../../../service/api/analysis";

  export default {
    name: "topicRecommend",
    data() {
      return {
        topicRecommendList: [],
        fits: ['cover'],
      }
    },
    created() {
      // 获取文章简要信息
      this.getValueList();
    },
    methods: {
      async getValueList() {

        let model = localStorage.getItem('model')
        // 已经登录
        console.log('已经登录');
        let res = await getValueTopic(model)

        if (res.err_code === 0) {
          this.topicRecommendList = res.results
        }

        // 加载防止闪烁
        this.$emit('func', '我好了')
      },

    }
  }
</script>

<style scoped>
    .content {
        margin-bottom: 30px;
    }
    ::-webkit-scrollbar{
        width: 5px;
    }
</style>
