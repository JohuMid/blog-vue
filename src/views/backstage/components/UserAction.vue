<template>
    <div id="useraction">

        <template>
            <el-tabs v-model="activeName"
                     :tab-position="tabPosition"
                     @tab-click="handleClick"
                     type="border-card">
                <el-tab-pane label="" name="first" :key="'first'">
                    <span slot="label">
                        <el-tooltip class="item" effect="light" content="通过userCollectNum,userTopicNum,userAttentionNum,userLoginNum,userRegDate数据分析" placement="top-start">
                            <i class="el-icon-coin">价值用户</i>
                        </el-tooltip>
                    </span>
                    <div class="userdata" v-if="isFirst">
                        <popularUser></popularUser>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="" name="second" :key="'second'">
                    <span slot="label">
                        <el-tooltip class="item" effect="light" content="通过userLoginNum,userRegDate数据分析" placement="top-start">
                            <i class="el-icon-magic-stick">喜爱本平台的用户</i>
                        </el-tooltip>
                    </span>
                    <div class="likepartuser" v-if="isSecond">
                        <likePartUser></likePartUser>
                    </div>

                </el-tab-pane>
                <el-tab-pane label="" name="third" :key="'third'">
                    <span slot="label">
                        <el-tooltip class="item" effect="light" content="通过userAttentionNum,userLoginNum数据分析" placement="top-start">
                            <i class="el-icon-thumb">人气用户</i>
                        </el-tooltip>
                    </span>
                    <div class="valueuser" v-if="isThird">
                        <valueUser></valueUser>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="" name="forth" :key="'forth'">
                    <span slot="label">
                        <el-tooltip class="item" effect="light" content="通过userLoginNum,userRegDate数据分析" placement="top-start">
                            <i class="el-icon-pear">可激励用户</i>
                        </el-tooltip>
                    </span>
                    <div class="encourageuser" v-if="isForth">
                        <encourageUser></encourageUser>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </template>
    </div>
</template>

<script>

  import popularUser from "./children/popularUser";
  import likePartUser from "./children/likePartUser";
  import valueUser from "./children/valueUser";
  import encourageUser from "./children/encourageUser";

  export default {
    name: "UserAction",
    data() {
      return {
        tabPosition: 'top',
        activeName: 'first',
        isFirst: true,
        isSecond: false,
        isThird: false,
        isForth: false,
      }
    },
    components: {
      popularUser,
      likePartUser,
      valueUser,
      encourageUser
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
        }
      }
    }
  }
</script>

<style scoped>
    #useraction {
        width: 100%;
        height: 100%;
    }

    .bg-purple-dark {
        background: #99a9bf;
    }

    .bg-purple {
        /*border: 1px solid #e5e4e4;*/
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .echarts {
        width: 100% !important;
    }

    .tableborder {
        width: 100%;
        height: 100%;
        overflow-y: auto;

    }

    .el-tabs__content {
        width: 100%;
        height: 100%;
        overflow-y: auto;
    }

</style>
