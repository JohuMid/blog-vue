<template>
    <div id="articlelist">

        <!--        走马灯子组件-->
        <Carousel></Carousel>

        <ul class="media-list">
            <el-row :gutter="20">
                <el-col :span="12" :offset="4" >
                    <div class="theme">
                        最新文章
                    </div>
                    <div>
                        <li v-for="(item , index) in topicList" :key="item.tId">
                            <el-row>
                                <el-col :span="4" style="text-align: center;width: 80px;">
                                    <div class="grid-content ">
                                        <router-link
                                                class="users"
                                                :to="`/navbar/users/`+item.uId+``">
                                            <el-avatar shape="square" :size="50"
                                                       :src="imgBaseUrl+item.userAvatar"
                                                       alt="...">
                                            </el-avatar>
                                        </router-link>
                                    </div>
                                </el-col>
                                <el-col :span="14">
                                    <div class="grid-content">
                                        <p class="title">
                                            <el-link type="primary">
                                                <router-link
                                                        tag="h2"
                                                        :to="`/navbar/article/`+item.tId+``"
                                                        class="media-heading">{{item.tTopic}}
                                                </router-link>
                                            </el-link>
                                        </p>
                                        <p class="summary">
                                            {{item.tWords+'...'}}
                                        </p>
                                        <p class="footnote">
                                            <span>{{item.userName}}</span>
                                            发布了文章
                                            <span>{{item.tTime | timeFormatSimple}}</span>
                                        </p>
                                    </div>
                                </el-col>

                                <el-col v-if="!item.tHeadImage">

                                </el-col>
                                <el-col :span="4" v-else>

                                    <div class="block">
                                        <el-image
                                                style="width: 150px; height: 90px;border-radius: 5px"
                                                :src="item.tHeadImage"
                                                :fit="fits[0]"></el-image>
                                    </div>

                                </el-col>
                            </el-row>
                            <el-divider></el-divider>
                        </li>

                        <div v-infinite-scroll="loadMore">
                            <div class="loading" v-if="isLoading">
                                <i class="el-icon-loading"></i>
                            </div>
                            <div class="loading" v-else>
                                <span>没有更多了</span>
                            </div>
                        </div>
                    </div>
                </el-col>
                <!--<el-col :span="4" :offset="16" style="position: absolute;width: 280px;height: 300px;background: #000;" >

                </el-col>-->
            </el-row>
        </ul>

    </div>
</template>

<script>

  import {getTopicList} from "../../service/api";
  import infiniteScroll from 'vue-infinite-scroll'
  import Carousel from "./components/Carousel";
  import {Base64} from 'js-base64'


  export default {
    name: "ArticleList",
    data() {
      return {
        topicList: [],
        count: 0,//起始页数值为0
        loading: false,
        page: 0,
        busy: true,
        isLoading: true,
        total: 0,
        fits: ['cover'],
      }
    },
    directives: {
      infiniteScroll,
    },
    created() {
      // 获取文章简要信息
      this.getList();
    },
    computed: {
      noMore() {
        //当起始页数大于总页数时停止加载
        return this.count >= this.totalPages - 1;
      },
      disabled() {
        return this.loading || this.noMore;
      }
    },
    methods: {
      async getList() {

        let res = await getTopicList(this.page);

        // console.log(res);

        if (Number(this.page) === 0) {
          // 文章总数

          // console.log(JSON.parse(res.results));
          var num = JSON.parse(res.num)
          this.total = num[0]['COUNT(*)']
        }


        // 文章简要信息
        var results = JSON.parse(res.results)

        // console.log(results);

        this.topicList = this.topicList.concat(results);

        if (Number(this.topicList.length) === this.total) {
          this.isLoading = false
        }

        // 加载防止闪烁
        this.$emit('func', '我好了')

      },
      loadMore() {
        this.busy = false
        //把busy置位true，这次请求结束前不再执行
        setTimeout(() => {
          this.page++
          this.getList(this.page)
          //调用获取数据接口，并且传入一个true，让axios方法指导是否需要拼接数组。
        }, 1000)
      },
    },
    components: {
      Carousel
    },
  }
</script>

<style scoped>
    #articlelist {
        width: 100%;
        height: 100%;
    }

    .title {
        margin: -7px 0 4px;
        display: inherit;
        font-size: 18px;
        font-weight: 700;
        line-height: 1.5;
    }

    .footnote {
        line-height: 24px;
        color: #3d3d3d;
        font-size: 14px;
    }

    .loading {
        text-align: center;
        font-size: 20px;
        color: #409eff;

    }

    .theme {
        padding: 8px 16px;
        border-left: 5px solid #409eff;
        margin: 20px 0;
        font-weight: bold;
    }

    .summary {
        font-size: 15px;
        line-height: 26px;
        color: #999;
    }

</style>