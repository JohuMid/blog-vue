<template>
    <div id="usermanage">
        <div class="tableborder">
            <template>
                <el-table
                        height="90%"
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

        <div class="pagination">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="[50, 100, 200, 300]"
                    :page-size="5"
                    layout="total, sizes, prev, pager, next"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
  import {getUsersData} from "../../../service/api";

  export default {
    name: "UserManage",
    data() {
      return {
        tableData: [],
        // 总条数
        total: 0,
        // 每页条数
        pageNum: 50,
        // 当前页面
        currentPage: 1,
        search: ''
      }
    },
    created() {
      this.reqUsersData()
    },
    methods: {
      async reqUsersData() {
        let res = await getUsersData(this.pageNum, this.currentPage)

        this.tableData = JSON.parse(res.results)

        var num = JSON.parse(res.num)

        this.total = num[0]['COUNT(*)']

      },
      handleSizeChange(val) {
        this.pageNum = Number(`${val}`);
        this.reqUsersData()
      },
      handleCurrentChange(val) {
        this.currentPage = Number(`${val}`);
        this.reqUsersData()
      },
      handleEdit(index, row) {
        console.log(index, row);

        console.log(row.uId);


        /*Vue.prototype.$confirm('确定要重置该用户密码为 1234SCF ?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          console.log('做了啥');
        }).catch(() => {
          console.log('啥都没做')
        });*/

      },

    }
  }
</script>

<style scoped>
    #usermanage {
        width: 100%;
        height: 100%;
    }

    .tableborder {
        width: 100%;
        height: 100%;
        overflow-y: auto;

    }

    .pagination {
        position: absolute;
        bottom: 20px;
    }
</style>
