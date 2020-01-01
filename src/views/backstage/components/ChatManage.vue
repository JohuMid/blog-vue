<template>
    <div id="chatmanage">
        <div class="tableborder">
            <template>
                <el-table
                        height="90%"
                        stripe
                        :data="tableData.filter(data => !search || data.rChat.toLowerCase().includes(search.toLowerCase()))"
                        style="width: 100%">
                    <el-table-column
                            prop="rId"
                            label="评论ID"
                            sortable
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="userName"
                            label="评论人"
                            sortable
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="tTopic"
                            label="回复文章"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="rChat"
                            label="回复内容"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="rTime"
                            label="回复时间"
                            width="180">
                        <template slot-scope="scope">
                            {{scope.row.rTime|timeFormat}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            fixed="right">
                        <template slot="header" slot-scope="scope">
                            <el-input
                                    v-model="search"
                                    size="mini"
                                    placeholder="输入回复内容搜索"/>
                        </template>
                        <template slot-scope="scope">

                            <el-button
                                    type="danger"
                                    size="mini"
                                    @click="handleDelete(scope.$index, scope.row)"
                            >删除
                            </el-button>

                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>

        <div class="pagination">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"

                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="5"
                    layout="total, sizes, prev, pager, next"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
  import {getChatsData, deleteChat} from "../../../service/api";

  export default {
    name: "ChatManage",
    data() {
      return {
        tableData: [],
        // 总条数
        total: 0,
        // 每页条数
        pageNum: 10,
        // 当前页面
        currentPage: 1,
        search: ''
      }
    },
    created() {
      this.reqChatsData()
    },
    watch: {
      // 监听路由改变刷新页面
      $route(to, from) {
        this.reqChatsData()
      }
    },
    methods: {
      async reqChatsData() {
        let res = await getChatsData(this.$route.params.tId, this.pageNum, this.currentPage)

        var results = JSON.parse(res.results)

        this.tableData = results

        var num = JSON.parse(res.num)

        this.total = num[0]['COUNT(*)']

      },
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleSizeChange(val) {
        this.pageNum = Number(`${val}`);
        this.reqChatsData()
      },
      handleCurrentChange(val) {
        this.currentPage = Number(`${val}`);
        this.reqChatsData()
      },
      // 删除评论
      handleDelete(index, row) {

        console.log(row.rId);

        this.$confirm('确定要删除这条评论?(此过程不可逆)', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          // console.log('做了啥');
          let res = await deleteChat(row.rId)
          if (res.err_code === 0) {
            this.$message({
              message: '删除成功！',
              type: 'success'
            });
            this.reqChatsData()
          }
        }).catch(() => {
          console.log('啥都没做')
        });
      }
    }
  }
</script>

<style scoped>
    #chatmanage {
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