<template>
    <div id="searchtopic">
        <ul class="media-list">
            <div class="fillbox"></div>
            <el-row :gutter="20">
                <el-col :span="20">
                    <div v-if="!searchData[0]" style="z-index: 9;text-align: center;width: 100%;">
                        <svg t="1576723281325" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="653" width="200" height="200"><path d="M513.15 641.988c168.465 0 327.328 73.28 435.855 201.055 17.151 20.15 14.863 49.97-5.208 67.902-8.204 7.333-19.016 11.374-30.437 11.374-14.296 0-27.943-6.08-37.444-16.681C784.2 798.782 651.521 737.444 511.991 737.444c-140.53 0-273.215 61.351-364.031 168.317-9.165 10.763-22.292 16.942-36.014 16.942-11.251 0-22.12-4.175-30.606-11.759-10.123-8.6-16.111-20.257-16.981-32.942-0.847-12.384 3.298-24.35 11.671-33.693 110.402-128.613 269.695-202.321 437.12-202.321z m273.223-246.564c-43.766 0-80.734-37.845-80.734-82.638V192.105c0-44.798 36.969-82.646 80.734-82.646 43.763 0 80.734 37.848 80.734 82.646v120.683c0 45.566-36.216 82.636-80.734 82.636z m-547.906 0c-43.761 0-80.731-37.845-80.731-82.638V192.105c0-44.798 36.97-82.646 80.731-82.646 43.771 0 80.746 37.848 80.746 82.646v120.683c0 44.791-36.975 82.636-80.746 82.636z" fill="#515151" p-id="654"></path></svg>
                        <p style="font-weight: bolder">没有查询到结果~</p>

                    </div>
                    <li v-for="(item , index) in searchData" :key="item.tId"  v-else>
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
                            <el-col :span="13">
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
                            <el-col :span="6" v-else>

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


                </el-col>
            </el-row>
        </ul>
    </div>
</template>

<script>
  import {getAllTopicList} from "../../../../service/api";

  export default {
    name: "SearchTopic",
    data() {
      return {
        allArticleList: [],
        fits: ['cover'],
      }
    },

    created() {
      this.search()
    },
    computed: {
      searchData() {
        let content = this.$route.params.searchInput;
        if (content) {
          return this.allArticleList.filter(function (product) {
            return Object.keys(product).some(function (key) {
              return String(product[key]).toLowerCase().indexOf(content) > -1
            })
          })
        }
        return this.newList;
      }
    },
    methods: {
      async search() {
        // console.log(this.$route.params.searchInput);
        let res = await getAllTopicList()
        if (res.err_code === 0) {
          this.allArticleList = JSON.parse(res.results)

        }
      }
    }
  }
</script>

<style scoped>
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
    .summary {
        font-size: 15px;
        line-height: 26px;
        color: #999;
    }
    .fillbox{
        width: 100%;
        height: 20px;
    }
</style>