<template>
    <div id="overview">
        <el-row :gutter="20">
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-card>
                        <el-row>
                            <el-col :span="6">
                                <div class="grid-content bg-purple">
                                    <i class="el-icon-user" style="font-size: 60px;color: #409eff"></i>

                                </div>
                            </el-col>
                            <el-col :span="18">
                                <div class="grid-content bg-purple-light" style="text-align: center">
                                    <h3>用户数</h3>
                                    <h4 style="font-weight: bolder">{{userNum}}人</h4>
                                </div>
                            </el-col>
                        </el-row>

                    </el-card>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-card>
                        <el-row>
                            <el-col :span="6">
                                <div class="grid-content bg-purple">
                                    <i class="el-icon-tickets" style="font-size: 60px;color: #409eff"></i>

                                </div>
                            </el-col>
                            <el-col :span="18">
                                <div class="grid-content bg-purple-light" style="text-align: center">
                                    <h3>文章数</h3>
                                    <h4 style="font-weight: bolder">{{topicNum}}篇</h4>
                                </div>
                            </el-col>
                        </el-row>
                    </el-card>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-card>
                        <el-row>
                            <el-col :span="6">
                                <div class="grid-content bg-purple">
                                    <i class="el-icon-chat-square" style="font-size: 60px;color: #409eff"></i>

                                </div>
                            </el-col>
                            <el-col :span="18">
                                <div class="grid-content bg-purple-light" style="text-align: center">
                                    <h3>评论数</h3>
                                    <h4 style="font-weight: bolder">{{chatNum}}条</h4>
                                </div>
                            </el-col>
                        </el-row>
                    </el-card>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-card>
                        <el-row>
                            <el-col :span="6">
                                <div class="grid-content bg-purple">
                                    <i class="el-icon-notebook-1" style="font-size: 60px;color: #409eff"></i>

                                </div>
                            </el-col>
                            <el-col :span="18">
                                <div class="grid-content bg-purple-light" style="text-align: center">
                                    <h3>专题数</h3>
                                    <h4 style="font-weight: bolder">{{specialNum}}个</h4>
                                </div>
                            </el-col>
                        </el-row>
                    </el-card>
                </div>
            </el-col>
        </el-row>

        <div class="tableborder">
            <template>
                <el-table
                        height="90%"
                        stripe
                        :data="tableData.filter(data => !search || data.userName.toLowerCase().includes(search.toLowerCase()))"
                        style="width: 100%">
                    <el-table-column label="待处理文章">
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
                                label="文章标签">
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

                                <el-button
                                        type="success"
                                        v-if="Number(scope.row.tCheck)===0"
                                        @click="handlePass(scope.$index, scope.row)"
                                        size="mini"
                                >审核通过
                                </el-button>
                                <el-button
                                        type="warning"
                                        v-if="Number(scope.row.tCheck)===0"
                                        @click="handleNoPass(scope.$index, scope.row)"
                                        size="mini"
                                >审核不通过
                                </el-button>
                                <el-button
                                        type="danger"
                                        @click="handleDelete(scope.$index, scope.row)"
                                        size="mini"
                                >删除
                                </el-button>
                            </template>
                        </el-table-column>
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
                    <!--                                            正文开始-->
                </div>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
  import {
    getCheckData,
    getTopicDetail,
    deleteTopic,
    rate,
    passTopic,
    noPassTopic,
    getOverview
  } from "../../../service/api";


  export default {
    name: "Overview",
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
        //  评分推荐属性
        value2: null,
        colors: {2: '#f2d3a3', 4: {value: '#F7BA2A', excluded: true}, 5: '#FF9900'},

        userNum: 0,
        topicNum: 0,
        chatNum: 0,
        specialNum: 0
      }
    },
    created() {
      this.reqOverview()
      this.reqCheckData()
    },
    watch: {
      // 监听路由改变刷新页面
      $route(to, from) {
        this.reqCheckData()
      }
    },
    methods: {
      async reqOverview() {
        let res = await getOverview()
        if (res.err_code === 0) {
          let count = (JSON.parse(res.results));

          this.userNum = (count[0].user);
          this.topicNum = (count[1].user);
          this.chatNum = (count[2].user);
          this.specialNum = (count[3].user);
        }
      },
      async reqCheckData() {

        let res = await getCheckData(this.$route.params.uId, this.pageNum, this.currentPage)

        // console.log(res.results);

        this.tableData = JSON.parse(res.results)

        var num = JSON.parse(res.num)

        this.total = num[0]['COUNT(*)']

      },
      handleSizeChange(val) {
        this.pageNum = Number(`${val}`);
        this.reqCheckData()
      },
      handleCurrentChange(val) {
        this.currentPage = Number(`${val}`);
        this.reqCheckData()
      },
      async dialog(index, row) {
        this.dialogFormVisible = true
        let res = await getTopicDetail(row.tId)

        if (res.err_code === 0) {
          this.tContents = (JSON.parse(res.results)[0].tContents)
        }
      },
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
            this.reqCheckData()
          }
        }).catch(() => {
          console.log('啥都没做')
        });
      },
      // 通过审核
      async handlePass(index, row) {

        let res = await passTopic(row.tId)
        if (res.err_code === 0) {
          this.$message({
            message: '审核完成！',
            type: 'success'
          });
          this.reqCheckData();
          // 存储审核通过状态
          this.$socket.emit('pass', {
            tId: row.tId,
            fromId: 0,
            toId: row.uId
          })

        }
      },
      // 不通过审核
      async handleNoPass(index, row) {

        let res = await noPassTopic(row.tId)
        if (res.err_code === 0) {
          this.$message({
            message: '审核完成！',
            type: 'success'
          });
          this.reqCheckData()
          // 存储审核不通过状态
          this.$socket.emit('nopass', {
            tId: row.tId,
            fromId: 0,
            toId: row.uId
          })
        }
      },
      // 文章价值星级别
      async change(value, row) {
        let res = await rate(row.tId, value);
        if (res.err_code === 0) {

        }
      }
    }
  }
</script>

<style scoped>
    #overview {
        width: 100%;
        height: 100%;
    }

    .tableborder {
        width: 100%;
        height: 80%;
        overflow-y: auto;
        margin-top: 20px;

    }

    .pagination {
        position: absolute;
        bottom: 20px;
    }

</style>
