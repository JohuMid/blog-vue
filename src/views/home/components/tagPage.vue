<template>
    <div id="tagpage">
        标签页
        <el-row :gutter="20">
            <el-col :span="16" :offset="4">
                <el-row>
                    <el-col :span="2" width="25px">
                        <span class="el-icon-discount tag">{{this.$route.params.tag}}</span>
                    </el-col>
                    <el-col :span="20" style="margin-bottom: 20px;">
                        <el-card>

                            <li class="tagLi" v-for="(item,index) in tagList" :key="index" :class="item.active"><a
                                    :href="item.link" @click="changeTag()">{{item.name}}</a></li>
                        </el-card>
                    </el-col>
                </el-row>

                <div class="grid-content">
                    <li v-for="(item , index) in tagData" :key="item.tId">
                        <el-row>
                            <el-col v-if="!item.tHeadImage||item.tHeadImage=='undefined'">
                                <el-col :span="22">
                                    <div class="grid-content">
                                        <p class="title">
                                            <el-link type="primary">
                                                <router-link
                                                        tag="h2"
                                                        style="font-weight: 700"

                                                        :to="`/navbar/article/`+item.tId+``"
                                                        class="media-heading">{{item.tTopic}}
                                                </router-link>
                                            </el-link>
                                        </p>
                                        <p class="summary">
                                            {{item.tWords+'...'}}
                                        </p>
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
                                    </div>
                                </el-col>
                            </el-col>
                            <el-col v-else>
                                <el-col :span="18">
                                    <div class="grid-content">
                                        <p class="title">
                                            <el-link type="primary">
                                                <router-link
                                                        tag="h2"
                                                        style="font-weight: 600"
                                                        :to="`/navbar/article/`+item.tId+``"
                                                        class="media-heading">{{item.tTopic}}
                                                </router-link>
                                            </el-link>
                                        </p>
                                        <p class="summary">
                                            {{item.tWords+'...'}}
                                        </p>
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
                                    </div>
                                </el-col>
                                <el-col :span="4" class="block">
                                    <el-image
                                            style="width: 150px; height: 90px;border-radius: 5px"
                                            :src="item.tHeadImage"
                                            :fit="fits[0]"></el-image>
                                </el-col>

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
        </el-row>
    </div>
</template>

<script>
  import {tagTopic} from "../../../service/api";
  import infiniteScroll from 'vue-infinite-scroll'

  export default {
    name: "tagPage",
    data() {
      return {
        // 标签列表
        tagList: [{name: "娱乐", active: false, link: "/#/navbar/tagpage/娱乐"},
          {name: "汽车", active: false, link: "/#/navbar/tagpage/汽车"},
          {name: "职场", active: false, link: "/#/navbar/tagpage/职场"},
          {name: "科技", active: false, link: "/#/navbar/tagpage/科技"},
          {name: "房产", active: false, link: "/#/navbar/tagpage/房产"},
          {name: "生活", active: false, link: "/#/navbar/tagpage/生活"},
          {name: "互联网", active: false, link: "/#/navbar/tagpage/互联网"},
          {name: "创投", active: false, link: "/#/navbar/tagpage/创投"},
          {name: "游戏", active: false, link: "/#/navbar/tagpage/游戏"},
          {name: "评测", active: false, link: "/#/navbar/tagpage/评测"},
          {name: "电影", active: false, link: "/#/navbar/tagpage/电影"},
          {name: "计算机", active: false, link: "/#/navbar/tagpage/计算机"},
          {name: "体育", active: false, link: "/#/navbar/tagpage/体育"},
          {name: "智能", active: false, link: "/#/navbar/tagpage/智能"},
          {name: "综合", active: false, link: "/#/navbar/tagpage/综合"}],
        tagData: [],
        fits: ['cover'],
        loading: false,
        page: 0,
        busy: true,
        isLoading: true,
        total: 0,
      }
    },
    directives: {
      infiniteScroll,
    },
    created() {
      // 加载防止闪烁
      this.$emit('func', '我好了');
      this.initTag()
    },
    watch: {
      $route(to, from) {
        this.tagData = [];
        this.page = 0;
        this.total = 0;
      }
    },
    methods: {
      async initTag() {

        let res = await tagTopic(this.$route.params.tag, this.page);
        if (res.err_code === 0) {
          if (Number(this.page) === 0) {
            // 文章总数
            this.total = (res.num)
          }

          var results = (res.results)

          this.tagData = this.tagData.concat(results);

          if (Number(this.tagData.length) === this.total) {
            this.isLoading = false
          }

          // 加载防止闪烁
          this.$emit('func', '我好了')
          //  动态标签上色
          for (let i = 0; i < this.tagList.length; i++) {
            if (this.tagList[i].name == this.$route.params.tag) {
              this.tagList[i].active = "active"
            } else {
              this.tagList[i].active = false
            }
          }

        }
      },
      loadMore() {
        this.busy = false
        //把busy置位true，这次请求结束前不再执行
        setTimeout(() => {
          this.page++
          this.initTag()
          //调用获取数据接口，并且传入一个true，让axios方法指导是否需要拼接数组。
        }, 1000)
      },
      changeTag() {
        let _this = this
        setTimeout(function () {
          _this.initTag()
        }, 5)
      }
    }
  }
</script>

<style scoped>
    .tag {
        font-size: 25px;
        color: #409eff;
        width: 25px;
        line-height: 30px;
        margin-bottom: 30px;
    }

    .title {
        margin: -7px 0 4px;
        display: inherit;
        font-size: 18px;
        font-weight: 700;
        line-height: 1.5;
    }

    .fillbox {
        width: 100%;
        height: 20px;
    }

    .loading {
        text-align: center;
        font-size: 20px;
        color: #409eff;

    }

    .tagLi {
        float: left;
        width: 100px;
        height: 30px;
        margin-bottom: 10px;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
    }

    .active {
        background: #409eff;
    }

    .tagLi a {
        color: #3d3d3d;

    }

    .active a {
        color: white;
    }


</style>
