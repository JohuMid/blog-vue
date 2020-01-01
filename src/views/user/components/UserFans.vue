<template>
    <div id="userfans">
        <ul class="media-list">
            <li v-for="(item,index) in fanslist" :key="item.aId" class="list-shadow list">
                <el-row>
                    <el-col :span="4" style="text-align: center;width: 80px;">
                        <div class="grid-content ">
                            <el-avatar
                                    shape="square"
                                    :size="50"
                                    :src="imgBaseUrl+item.userAvatar"
                                    alt="...">

                            </el-avatar>
                        </div>
                    </el-col>
                    <el-col :span="20">
                        <div class="grid-content">
                            <el-link type="primary">
                                <router-link
                                        :to="`/navbar/users/`+item.uId+``"
                                >{{item.userName}}
                                </router-link>
                            </el-link>
                            <p class="footnote">
                                简介：
                                {{item.userStatement}}
                            </p>
                        </div>
                    </el-col>
                </el-row>
            </li>
        </ul>
        <div v-if="isShow" style="text-align: center">

            <svg t="1576723281325" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="653" width="200" height="200"><path d="M513.15 641.988c168.465 0 327.328 73.28 435.855 201.055 17.151 20.15 14.863 49.97-5.208 67.902-8.204 7.333-19.016 11.374-30.437 11.374-14.296 0-27.943-6.08-37.444-16.681C784.2 798.782 651.521 737.444 511.991 737.444c-140.53 0-273.215 61.351-364.031 168.317-9.165 10.763-22.292 16.942-36.014 16.942-11.251 0-22.12-4.175-30.606-11.759-10.123-8.6-16.111-20.257-16.981-32.942-0.847-12.384 3.298-24.35 11.671-33.693 110.402-128.613 269.695-202.321 437.12-202.321z m273.223-246.564c-43.766 0-80.734-37.845-80.734-82.638V192.105c0-44.798 36.969-82.646 80.734-82.646 43.763 0 80.734 37.848 80.734 82.646v120.683c0 45.566-36.216 82.636-80.734 82.636z m-547.906 0c-43.761 0-80.731-37.845-80.731-82.638V192.105c0-44.798 36.97-82.646 80.731-82.646 43.771 0 80.746 37.848 80.746 82.646v120.683c0 44.791-36.975 82.636-80.746 82.636z" fill="#515151" p-id="654"></path></svg>
            <p style="font-weight: bolder">暂时没粉丝喔~</p>
        </div>
        <div v-else class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"

                    :page-sizes="[5, 6, 7, 8]"
                    :page-size="5"
                    layout="total, sizes, prev, pager, next"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
  import {getUserFans} from "../../../service/api";

  import {mapState} from 'vuex'


  export default {
    name: "UserFans",
    data(){
      return{
        avatarSrc: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        fanslist:[],
        total: 0,
        // 每页条数
        pageNum: 5,
        // 当前页面
        currentPage: 1,

        //  控制页面内容有无
        isShow: false
      }
    },
    created() {
      // 获取粉丝简要信息
      this.getFansList();
    },
    computed: {
      ...mapState(['userInfo'])
    },
    methods:{
      async getFansList() {
        let res = await getUserFans(this.userInfo.uId, this.pageNum, this.currentPage)

        // console.log(res);

        if (res.err_code === 0) {
          // console.log(res);
          // 关注简要信息
          var results = JSON.parse(res.results)

          // 文章总数
          var num = JSON.parse(res.num)

          this.fanslist = results;
          this.total = num[0]['COUNT(*)']
          if (this.total === 0) {
            this.isShow = true
          } else {
            this.isShow = false
          }

        }
      },
      handleSizeChange(val) {
        this.pageNum = Number(`${val}`);
        this.getAttentionList()
      },
      handleCurrentChange(val) {
        this.currentPage = Number(`${val}`);
        this.getAttentionList()
      },
    }
  }
</script>

<style scoped>

</style>