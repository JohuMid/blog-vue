<template>
    <div id="users">
        <el-row :gutter="20">
            <el-col :span="16" :offset="4">
                <div class="grid-content">
                    <template>
                        <el-tabs :tab-position="tabPosition" style="height: 200px;" v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="个人资料" name="first" :key="'first'">
                                <div class="userdata"  v-if="isFirst">
                                    <UsersData></UsersData>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="Ta的文章" name="second" :key="'second'">
                                <div class="userarticle" v-if="isSecond">
                                    <UsersArticle></UsersArticle>
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
  import UsersData from "./components/UsersData";
  import UsersArticle from "./components/UsersArticle";

  export default {
    name: "Users",
    data() {
      return {
        tabPosition: 'top',
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
      UsersData,
      UsersArticle,
    },
    methods:{
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
    #users {
        width: 100%;
        height: 100%;
        margin-top: 20px;
    }
</style>