<template>
    <div id="articleaction">
        <template>
            <el-tabs v-model="activeName"
                     :tab-position="tabPosition"
                     @tab-click="handleClick"
                     type="border-card">
                <el-tab-pane label="" name="first" :key="'first'">
                    <span slot="label">
                        <el-tooltip class="item" effect="light" content="通过tChatNum,tCollectNum数据分析"
                                    placement="top-start">
                            <i class="el-icon-coin">价值文章</i>
                        </el-tooltip>
                    </span>
                    <div class="userdata" v-if="isFirst">
                        <valueArticle></valueArticle>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="" name="second" :key="'second'">
                    <span slot="label">
                        <el-tooltip class="item" effect="light" content="通过tChatNum,tCollectNum数据分析"
                                    placement="top-start">
                            <i class="el-icon-magic-stick">边缘化文章</i>
                        </el-tooltip>
                    </span>
                    <div class="likepartuser" v-if="isSecond">
                        <encourageArticle></encourageArticle>
                    </div>

                </el-tab-pane>

            </el-tabs>
        </template>
    </div>
</template>

<script>

  import encourageArticle from "./children/encourageArticle";
  import valueArticle from "./children/valueArticle";

  export default {
    name: "ArticleAction",
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
      encourageArticle,
      valueArticle
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
        }
      }
    }
  }
</script>

<style scoped>

</style>
