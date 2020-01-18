<template>
    <div id="search">
        <el-row :gutter="20">
            <el-col :span="16" :offset="4">
                <div class="grid-content">
                    <template>
                        <el-tabs :tab-position="tabPosition" style="height: 200px;" v-model="activeName"
                                 @tab-click="handleClick">
                            <el-tab-pane label="文章" name="first" :key="'first'">
                                <div class="searchtopic" v-if="isFirst">
                                    <SearchTopic></SearchTopic>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="用户" name="second" :key="'second'">
                                <div class="searchuser" v-if="isSecond">
                                    <SearchUser></SearchUser>
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
  import SearchTopic from "./children/SearchTopic";
  import SearchUser from "./children/SearchUser";

  export default {
    name: "Search",
    data() {
      return {
        tabPosition: 'left',
        // 默认第一个Tab
        activeName: 'first',
        isFirst: true,
        isSecond: false

      };
    },
    created() {
      // 加载防止闪烁
      this.$emit('func', '我好了')
    },
    components: {
      SearchTopic,
      SearchUser,
    },
    methods: {
      // 点击Tab标签实时加载

      handleClick(tab) {
        if (tab.name === 'first') {
          this.isFirst = true
          this.isSecond = false
        } else if (tab.name === 'second') {
          this.isFirst = false
          this.isSecond = true
        }
      }
    }

  }
</script>

<style scoped>
    #search {

        width: 100%;
        height: 100%;
    }
    .el-tabs {
        height: auto !important;
    }


</style>
