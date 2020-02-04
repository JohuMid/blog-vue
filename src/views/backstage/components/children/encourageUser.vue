<template>
    <div id="encourageuser">
        <div class="tableborder">
            <template>
                <el-table
                        height="680px"
                        stripe
                        :data="tableData.filter(data => !search || data.userName.toLowerCase().includes(search.toLowerCase()))"
                        style="width: 100%">
                    <el-table-column
                            prop="uId"
                            sortable
                            label="用户ID"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="userName"
                            label="用户名"
                            sortable
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="userStatement"
                            label="用户简介"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="userEmail"
                            label="用户邮箱"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="userRegDate"
                            label="注册时间"
                            width="200">
                        <template slot-scope="scope">
                            {{scope.row.userRegDate|timeFormat}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            fixed="right">
                        <template slot="header" slot-scope="scope">
                            <el-input
                                    v-model="search"
                                    size="mini"
                                    placeholder="输入用户名搜索"/>
                        </template>
                        <template slot-scope="scope">
                            <router-link
                                    :to="`/backstage/articlemanage/`+scope.row.uId+``">
                                <el-button
                                        type="text"
                                        size="mini"
                                >Ta的文章
                                </el-button>
                            </router-link>

                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
    </div>
</template>

<script>
  import {userAction} from "../../../../service/api/analysis";

  export default {
    name: "encourageUser",
    data() {
      return {
        tableData: [],
        // 总条数
        total: 0,
        search: '',
      }
    },
    created() {
      this.init()
    },
    methods: {
      async init() {
        let res = await userAction('encourage')

        if(res.err_code===0){
          this.tableData = (res.results);
        }
      },
    }
  }
</script>

<style scoped>

</style>
