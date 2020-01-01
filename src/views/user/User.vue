<template>
    <div id="user">
        <el-row :gutter="20">
            <el-col :span="16" :offset="4">
                <div class="grid-content">
                    <template>
                        <el-tabs v-model="activeName"
                                 :tab-position="tabPosition"
                                 @tab-click="handleClick"
                                 style="height: 200px;">
                            <el-tab-pane label="个人资料" name="first" :key="'first'">
                                <div class="userdata" v-if="isFirst">
                                    <UserData></UserData>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="我的文章" name="second" :key="'second'">
                                <div class="userarticle" v-if="isSecond">
                                    <UserArticle></UserArticle>
                                </div>

                            </el-tab-pane>
                            <el-tab-pane label="我的关注" name="third" :key="'third'">
                                <div class="userattention" v-if="isThird">
                                    <UserAttention></UserAttention>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="我的收藏" name="forth" :key="'forth'">
                                <div class="usercollect" v-if="isForth">
                                    <UserCollect></UserCollect>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="我的粉丝" name="fifth" :key="'fifth'">
                                <div class="userfans" v-if="isFifth">
                                    <UserFans></UserFans>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </template>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  import UserData from "./components/UserData";
  import UserArticle from "./components/UserArticle";
  import UserAttention from "./components/UserAttention";
  import UserCollect from "./components/UserCollect";
  import UserFans from "./components/UserFans";

  export default {
    name: "User",
    data() {
      return {
        tabPosition: 'left',
        activeName: 'first',
        isFirst: true,
        isSecond: false,
        isThird: false,
        isForth: false,
        isFifth: false
      };
    },
    created() {
      // 加载防止闪烁
      this.$emit('func', '我好了')
    },
    components: {
      UserData,
      UserAttention,
      UserArticle,
      UserCollect,
      UserFans
    },
    methods: {
      // 点击Tab标签实时加载
      handleClick(tab) {

        if (tab.name === 'first') {
          this.isFirst = true
          this.isSecond = false
          this.isThird = false
          this.isForth = false
          this.activeName = 'first'
        } else if (tab.name === 'second') {
          this.isFirst = false
          this.isSecond = true
          this.isThird = false
          this.isForth = false
          this.activeName = 'second'
        } else if (tab.name === 'third') {
          this.isFirst = false
          this.isSecond = false
          this.isThird = true
          this.isForth = false
          this.activeName = 'third'
        } else if (tab.name === 'forth') {
          this.isFirst = false
          this.isSecond = false
          this.isThird = false
          this.isForth = true
          this.activeName = 'forth'
        } else if (tab.name === 'fifth') {
          this.isFirst = false
          this.isSecond = false
          this.isThird = false
          this.isForth = false
          this.isFifth = true
          this.activeName = 'fifth'
        }

      }
    }
  }
</script>

<style scoped>
    #user {
        width: 100%;
        height: 100%;
        margin-top: 20px;
    }


    .leftword {
        width: 120px;
        text-align: right;
    }

    .el-tabs {
        height: auto!important;
    }


</style>