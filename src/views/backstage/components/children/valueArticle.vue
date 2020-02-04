<template>
    <div id="valuearticle">
        <div class="tableborder">
            <template>
                <el-table
                        height="680px"
                        stripe
                        :data="tableData.filter(data => !search || data.tTopic.toLowerCase().includes(search.toLowerCase()))"
                        style="width: 100%">
                    <el-table-column
                            prop="tId"
                            label="文章ID"
                            sortable
                            width="180">
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
                            width="180"
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
                            width="200"
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
                            fixed="right">

                        <template slot="header" slot-scope="scope">
                            <el-input
                                    v-model="search"
                                    size="mini"
                                    placeholder="输入文章名搜索"/>
                        </template>
                        <template slot-scope="scope">
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
  import {topicAction} from "../../../../service/api/analysis";
  import {deleteTopic, getTopicDetail} from "../../../../service/api";

  export default {
    name: "valueArticle",
    data() {
      return {
        tableData: [],
        // 弹出框显示隐藏
        dialogFormVisible: false,
        // 总条数
        total: 0,
        search: '',
        //  文章详情
        tContents: '',
      }
    },
    created() {
      this.init()
    },
    methods: {
      async init() {
        let res = await topicAction('value')

        if (res.err_code === 0) {
          this.tableData = (res.results);
        }
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
            this.reqTopicsData()
          }
        }).catch(() => {
          console.log('啥都没做')
        });

      }
    }

  }
</script>

<style scoped>

</style>
