<template>
    <div id="carousel">

        <el-row :gutter="20">
            <el-col :span="12" :offset="4">

                <div class="theme" >
                    收藏量Top3文章集锦
                </div>
                <div>
                    <el-carousel trigger="click" height="200px">
                        <el-carousel-item v-for="(item ,index) in collectPlaceImgUrl" :key="item.src">
                            <div style="width: 100%;height: 100%;"
                                 :style="{ 'background-image': 'url(' +item.tHeadImage + ')','background-size':'100%','background-position':'center','filter': 'blur(5px)' }">

                            </div>
                            <router-link
                                    :to="`/navbar/article/`+item.tId+``">
                                <h3 class="bannerTitle text-shadow">{{item.tTopic}}</h3>

                            </router-link>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </el-col>
            <el-col :span="4" :offset="16" style="position: absolute;width: 280px;" >
                <div class="theme">
                    评论量Top3文章集锦
                </div>
                <div >
                    <el-carousel trigger="click" height="200px">
                        <el-carousel-item v-for="(item ,index) in chatPlaceImgUrl" :key="item.src">
                            <div style="width: 100%;height: 100%;"
                                 :style="{ 'background-image': 'url(' + item.tHeadImage + ')','background-repeat':'no-repeat','background-size':'cover','background-position':'center','filter': 'blur(5px)' }">
                            </div>

                            <router-link
                                    :to="`/navbar/article/`+item.tId+``">
                                <h3 class="chatbannerTitle text-shadow">{{item.tTopic}}</h3>

                            </router-link>

                        </el-carousel-item>
                    </el-carousel>
                </div>
            </el-col>

        </el-row>
    </div>
</template>

<script>

  import {getBannerTopic} from "../../../service/api";

  export default {
    name: "Carousel",
    data() {
      return {
        collectPlaceImgUrl: [],
        chatPlaceImgUrl: [],
      }
    },
    created() {
      this.bannerTopic()
    },
    methods: {
      async bannerTopic() {
        let res = await getBannerTopic()
        if (res.err_code === 0) {
          let  res1 = JSON.parse(res.results1)
          let res2 = JSON.parse(res.results2)

          // console.log(res2);


          this.collectPlaceImgUrl = res1
          this.chatPlaceImgUrl = res2

        }
      }
    }
  }
</script>

<style scoped>
    img {
        width: 100%;
    }
    .theme{
        padding: 8px 16px;
        border-left: 5px solid #409eff;
        margin: 20px 0;
        font-weight: bold;
    }

    .bannerTitle {
        font-size: 30px;
        font-weight: bolder;
        color: white;
        margin-top: -80px;
        padding-left: 20px;
        z-index: 99;
        position: absolute;
    }
    .chatbannerTitle{
        font-size: 25px;
        font-weight: bolder;
        color: white;
        margin-top: -70px;
        padding-left: 20px;
        z-index: 99;
        position: absolute;

    }


</style>