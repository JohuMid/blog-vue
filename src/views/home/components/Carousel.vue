<template>
    <div id="carousel">

        <el-row :gutter="20">
            <el-col :span="12" :offset="4">

                <div>
                    <el-carousel trigger="click" height="250px" style="border-radius: 10px">
                        <el-carousel-item v-for="(item ,index) in collectPlaceImgUrl" :key="item.src">
                            <div style="width: 100%;height: 100%;"
                                 :style="{ 'background-image': 'url(' +item.tHeadImage + ')','background-size':'100%','background-position':'center' }">

                            </div>
                            <router-link
                                    :to="`/navbar/article/`+item.tId+``">
                                <h3 class="bannerTitle text-shadow">{{item.tTopic}}</h3>

                            </router-link>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </el-col>
            <el-col :span="4" :offset="16" style="position: absolute;width: 280px;">
                <div>
                    <router-link
                    to="/navbar/tagpage/yule">
                        <el-card class="box-card" style="background: #409eff">推荐专题<span> </span><img style="width: 50px;position: absolute;right: 20px;top: 5px;" src="./../../../assets/tag.png" alt=""></el-card>
                    </router-link>
                    <router-link
                            to="/navbar/authorrecommend"
                    >
                    <el-card class="box-card" style="background: #63c2f4">推荐作者<span> </span><img style="width: 50px;position: absolute;right: 20px;top: 75px;" src="./../../../assets/user.png" alt=""></el-card>
                    </router-link>
                    <router-link
                            to="/navbar/topicrecommend"
                    >
                    <el-card class="box-card" style="background: #c1e4de">推荐文章<span> </span><img style="width: 50px;position: absolute;right: 20px;top: 150px;" src="./../../../assets/topic.png" alt=""></el-card>
                    </router-link>
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
          let res1 = JSON.parse(res.results1)
          let res2 = JSON.parse(res.results2)

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

    .bannerTitle {
        font-size: 30px;
        font-weight: bolder;
        color: white;
        margin-top: -80px;
        padding-left: 20px;
        z-index: 99;
        position: absolute;
    }

    .chatbannerTitle {
        font-size: 25px;
        font-weight: bolder;
        color: white;
        margin-top: -70px;
        padding-left: 20px;
        z-index: 99;
        position: absolute;

    }

    .box-card {
        margin-bottom: 10px;
        color: white;
    }


</style>
