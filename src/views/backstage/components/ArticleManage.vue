<template>
    <div id="articlemanage">
        <div class="tableborder">
            <template>
                <el-table
                        height="90%"
                        stripe
                        :data="tableData.filter(data => !search || data.userName.toLowerCase().includes(search.toLowerCase()))"
                        style="width: 100%">
                    <el-table-column
                            prop="tId"
                            label="文章ID"
                            sortable
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="userName"
                            label="发布人"
                            sortable
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="tTopic"
                            width="180"
                            label="发布标题">
                    </el-table-column>
                    <el-table-column
                            prop="tModel"
                            width="100"
                            label="文章专题">
                    </el-table-column>
                    <el-table-column
                            prop="tTime"
                            width="200"
                            label="发布时间">
                        <template slot-scope="scope">
                            {{scope.row.tTime|timeFormat}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            width="100"
                            label="属性">
                        <template slot-scope="scope">
                            <router-link
                                    :to="`/backstage/chatmanage/`+scope.row.tId+``">
                                <el-button
                                        type="text"
                                        size="mini"
                                >评论
                                </el-button>
                            </router-link>
                            <el-button
                                    class="detail"
                                    type="text"
                                    @click="dialog(scope.$index, scope.row)"
                                    size="mini"
                            >查看
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            width="110"
                            label="状态">
                        <template slot-scope="scope">
                            <el-tag type="warning" v-if="Number(scope.row.tCheck)===0">审核中</el-tag>
                            <el-tag type="success" v-else-if="Number(scope.row.tCheck)===1">审核通过</el-tag>
                            <el-tag type="danger" v-else-if="Number(scope.row.tCheck)===2">审核不通过</el-tag>
                        </template>
                    </el-table-column>


                    <el-table-column
                            prop="tRecommend"
                            width="150"
                            label="推荐值">
                        <template slot-scope="scope">
                            <div class="block">
                                <el-rate
                                        v-model="scope.row.tRecommend"
                                        :colors="colors"
                                        @change="change(scope.row.tRecommend,scope.row)"

                                >
                                </el-rate>
                            </div>

                        </template>
                    </el-table-column>

                    <el-table-column
                            fixed="right">
                        <template slot="header" slot-scope="scope">
                            <el-input
                                    v-model="search"
                                    size="mini"
                                    placeholder="输入文章名搜索"/>
                        </template>
                        <template slot-scope="scope">
                            <el-button v-if="scope.row.tSticky===1"
                                       @click="handleSticky(scope.$index,scope.row.tSticky, scope.row)"
                                       size="mini"
                            >取消置顶
                            </el-button>
                            <el-button v-else-if="scope.row.tSticky===0"
                                       type="primary"
                                       @click="handleSticky(scope.$index,scope.row.tSticky, scope.row)"
                                       size="mini"
                            >置顶
                            </el-button>
                            <el-button
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)"
                                    size="mini"
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
                    :page-sizes="[50,100,200,300]"
                    :page-size="5"
                    layout="total, sizes, prev, pager, next"
                    :total="total">
            </el-pagination>
        </div>

        <!--            弹出框文章详情-->
        <el-dialog title="文章详情" :visible.sync="dialogFormVisible">

            <div class="ql-container ql-snow">
                <div class="ql-editor" v-html="tContents" v-highlight>
                    <!--正文开始-->
                </div>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="closeDialog()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
  import {getTopicsData, getTopicDetail, deleteTopic, rate, stickyTopic} from "../../../service/api";


  export default {
    name: "ArticleManage",
    data() {
      return {
        tableData: [],
        // 总条数
        total: 0,
        // 每页条数
        pageNum: 50,
        // 当前页面
        currentPage: 1,
        // 弹出框显示隐藏
        dialogFormVisible: false,
        //  文章tId
        tId: 0,
        //  文章详情
        tContents: '',
        search: '',
        //  评分属性
        value2: null,
        colors: {2: '#f2d3a3', 4: {value: '#F7BA2A', excluded: true}, 5: '#FF9900'}
      }
    },
    created() {
      this.reqTopicsData()
    },
    watch: {
      // 监听路由改变刷新页面
      $route(to, from) {
        this.reqTopicsData()
      }
    },
    methods: {
      async reqTopicsData() {

        let res = await getTopicsData(this.$route.params.uId, this.pageNum, this.currentPage)

        // console.log(res.results);

        this.tableData = JSON.parse(res.results)

        console.log(this.tableData);

        var num = JSON.parse(res.num)

        this.total = num[0]['COUNT(*)']

      },
      handleSizeChange(val) {
        this.pageNum = Number(`${val}`);
        this.reqTopicsData()
      },
      handleCurrentChange(val) {
        this.currentPage = Number(`${val}`);
        this.reqTopicsData()
      },
      async dialog(index, row) {
        this.dialogFormVisible = true
        let res = await getTopicDetail(row.tId)

        if (res.err_code === 0) {
          // this.tContents = (JSON.parse(res.results)[0].tContents)

          let styleReg = /style\s*?=\s*?(['"])[\s\S]*?\1/g;
          let widthReg = /width\s*?=\s*?(['"])[\s\S]*?\1/g;
          let heightReg = /height\s*?=\s*?(['"])[\s\S]*?\1/g;

          // 清除文章字符串的行内样式
          this.tContents = (JSON.parse(res.results)[0].tContents).replace(styleReg, '').replace(widthReg, '').replace(heightReg, '');

        }
      },
      // 删除文章
      handleDelete(index, row) {

        this.$confirm('确定要删除这篇文章?(此过程不可逆)', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          // console.log('做了啥');
          let res = await deleteTopic(row.tId)
          if (res.err_code === 0) {
            this.$message({
              message: '删除成功！',
              type: 'success'
            });
            this.reqTopicsData()
          }
        }).catch(() => {
          console.log('啥都没做')
        });
      },
      async handleSticky(index, flag, row) {
        console.log(flag);
        let res = await stickyTopic(flag, row.tId)
        if (res.err_code === 0) {
          if (Number(flag) === 0) {
            this.tableData[index].tSticky = 1
          } else if (Number(flag) === 1) {
            this.tableData[index].tSticky = 0
          }
        }
      },
      async change(value, row) {

        let res = await rate(row.tId, value);
        if (res.err_code === 0) {

        }
      },
      closeDialog() {
        this.dialogFormVisible = false;
        this.tContents=''
      }
    }
  }
</script>

<style scoped>
    #articlemanage {
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

    .detail {
        margin-left: 10px;
    }

    .words {
        line-height: 26px;
    }

</style>
