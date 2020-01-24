<template>
    <div id="specialmanage">
        <el-row :gutter="20">
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-card class="card">
                        <h3>专题数量</h3>
                        <p class="number">{{tagNum}}<span>个</span></p>
                    </el-card>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-card class="card">
                        <h3>专题文章</h3>
                        <p class="number">{{topicNum}}<span>篇</span></p>
                    </el-card>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <el-card class="card">
                        <li class="tagLi" v-for="(item,index) in tagList" :key="index" :class="item.active"><a
                                :href="item.link" @click="changeTag(item.name)">{{item.name}}</a></li>
                    </el-card>
                </div>
            </el-col>
        </el-row>
        <div class="tableborder">
            <template>
                <el-table
                        height="90%"
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
  import {deleteTopic, getSpecialTopic, getTopicDetail} from "../../../service/api";

  export default {
    name: "SpecialManage",
    data() {
      return {
        // 标签列表
        tagList: [{name: "娱乐", active: false},
          {name: "汽车", active: false},
          {name: "职场", active: false},
          {name: "科技", active: false},
          {name: "房产", active: false},
          {name: "生活", active: false},
          {name: "互联网", active: false},
          {name: "创投", active: false},
          {name: "游戏", active: false},
          {name: "评测", active: false},
          {name: "电影", active: false},
          {name: "计算机", active: false},
          {name: "体育", active: false},
          {name: "智能", active: false},
          {name: "综合", active: false}
        ],
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
        // 专题名
        name: '娱乐',
        // 专题数量
        tagNum: 0,
        // 专题文章数量
        topicNum: 0,
      }
    },
    created() {
      this.changeTag(this.name)
    },
    methods: {
      async changeTag(name) {

        this.name = name

        let res = await getSpecialTopic(name, this.pageNum, this.currentPage)
        if (res.err_code === 0) {
          console.log(res.results);

          this.tableData = res.results;

          this.total = res.num;

          this.topicNum = res.num

          this.tagNum = this.tagList.length;

          for (let i = 0; i < this.tagList.length; i++) {
            if (this.tagList[i].name == this.name) {
              this.tagList[i].active = "active"
            } else {
              this.tagList[i].active = false
            }
          }
        }
      },
      handleSizeChange(val) {
        this.pageNum = Number(`${val}`);
        this.changeTag(this.name)
      },
      handleCurrentChange(val) {
        this.currentPage = Number(`${val}`);
        this.changeTag(this.name)
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
    #specialmanage {
        width: 100%;
        height: 100%;
    }

    .card {
        text-align: center;
    }

    .card p {
        font-size: 30px;
        color: #409eff;
    }

    .tableborder {
        margin-top: 10px;

        width: 100%;
        height: 80%;
        overflow-y: auto;

    }

    .pagination {
        position: absolute;
        bottom: 20px;
    }

    .detail {
        margin-left: 10px;
    }

    .tagLi {
        float: left;
        width: 100px;
        height: 25px;
        margin-bottom: 10px;
        text-align: center;
        line-height: 25px;
        cursor: pointer;
    }

    .active {
        background: #409eff;
    }

    .tagLi a {
        color: #3d3d3d;

    }

    .active a {
        color: white;
    }
</style>
