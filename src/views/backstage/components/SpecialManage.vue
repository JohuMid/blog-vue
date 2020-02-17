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
                <div class="grid-content bg-purple" >
                    <el-card class="card" style="height:127px; overflow-y: auto">
                        <li class="tagLi" v-for="(item,index) in tagList" :key="index" :class="item.active"><a
                                :href="item.link" @click="changeTag(item.spValue)">{{item.spLabel}}</a></li>

                        <li title="增加专题" class="addLi" @click="addTag()">
                            <i class="el-icon-plus"></i>
                        </li>
                        <li title="删除专题" class="reduceLi" @click="reduceTag()">
                            <i class="el-icon-minus"></i>
                        </li>
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
        <el-dialog title="文章详情" :visible.sync="dialogTopicVisible">

            <div class="ql-container ql-snow">
                <div class="ql-editor" v-html="tContents" v-highlight>
                    <!--正文开始-->
                </div>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogTopicVisible = false">确 定</el-button>
            </div>
        </el-dialog>
        <!--            弹出框增加专题详情-->
        <el-dialog title="专题设置" :visible.sync="dialogFormVisible">

            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="专题名称">
                    <el-input v-model="form.label"></el-input>
                </el-form-item>
                <el-form-item label="专题值">
                    <el-input v-model="form.value"></el-input>
                </el-form-item>
                <el-form-item label="专题层级">
                    <el-select v-model="form.floor" placeholder="请选择专题层次">
                        <el-option label="一级专题" value="1"></el-option>
                        <el-option label="二级专题" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <!--选择为二级专题时候出现-->
                <el-form-item v-if="Number(form.floor)===2" label="上级专题">
                    <el-cascader
                            v-model="specialvalue"
                            :options="options"
                            :props="{ expandTrigger: 'hover' }">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="私密专题">
                    <el-switch v-model="form.secret"></el-switch>
                </el-form-item>
                <el-form-item label="专题简介">
                    <el-input type="textarea" v-model="form.brief"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button>取消</el-button>

                <el-button type="primary" @click="addTagOption()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
  import {
    deleteTopic,
    getSpecialTopic,
    getTopicDetail,
    addSpecial,
    reduceSpecial,
    firstFloor
  } from "../../../service/api";

  export default {
    name: "SpecialManage",
    data() {
      return {
        // 标签列表
        tagList: [],
        tableData: [],
        // 总条数
        total: 0,
        // 每页条数
        pageNum: 50,
        // 当前页面
        currentPage: 1,
        // 弹出框显示隐藏
        dialogFormVisible: false,
        // 弹出文章框
        dialogTopicVisible: false,
        //  文章tId
        tId: 0,
        //  文章详情
        tContents: '',
        search: '',
        // 初始专题名
        name: 'yule',
        // 专题数量
        tagNum: 0,
        // 专题文章数量
        topicNum: 0,
        form: {
          label: '',
          value: '',
          floor: '',
          type: [],
          resource: '',
          desc: '',
          secret: false,
          brief: ''
        },
        specialvalue: [],
        options: [],
      }
    },
    created() {
      this.getFirstFloor()
    },
    methods: {
      // 点击变换标签
      async changeTag(name) {

        this.name = name

        let res = await getSpecialTopic(name, this.pageNum, this.currentPage)
        if (res.err_code === 0) {

          this.tableData = res.results;

          this.total = res.num;

          this.topicNum = res.num;

          this.tagNum = this.tagList.length;

          for (let i = 0; i < this.tagList.length; i++) {
            if (this.tagList[i].spValue == this.name) {
              this.tagList[i].active = "active"
            } else {
              this.tagList[i].active = false
            }
          }
        }
      },
      // 获取tagList，options
      async getFirstFloor() {
        let res = await firstFloor()
        if (res.err_code === 0) {

          this.tagList = res.tagList;
          this.options = res.options
        }
        // 切换主题
        this.changeTag(this.name)
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
        this.dialogTopicVisible = true
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
            this.changeTag()
          }
        }).catch(() => {
          console.log('啥都没做')
        });
      },
      // 增加专题
      addTag() {
        this.dialogFormVisible = true
      },
      // 删除专题
      reduceTag() {
        this.$prompt('请输入要删除的专题', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[\w\W!#$%&'*+/=?^_`{|}~-]+?/,
          inputErrorMessage: '没有输入内容'
        }).then(async ({value}) => {

          let res = await reduceSpecial(value)
          if (res.err_code === 0) {
            this.$message({
              type: 'success',
              message: '删除专题成功！'
            });
            this.getFirstFloor()
          } else if (res.err_code === 10) {
            this.$message({
              type: 'warning',
              message: '没有相关专题'
            });
          }
        });
      },
      handleChange(value) {
        console.log(value);
      },

      //  增加专题
      async addTagOption() {

        if (!this.form.label) {
          this.$message({
            message: '请输入专题名称！',
          });
        } else if (!this.form.value) {
          this.$message({
            message: '请输入专题值！',
          });
        } else if (!this.form.floor) {
          this.$message({
            message: '请输入专题层次！',
          });
        } else if (Number(this.form.floor) === 2 && !this.specialvalue[0]) {
          this.$message({
            message: '请输入上级专题！',
          });
        } else if (!this.form.brief) {
          this.$message({
            message: '请输入专题简介！',
          });
        } else {

          let res = await addSpecial(this.form.label, this.form.value, this.form.floor, this.specialvalue[0], this.form.secret, this.form.brief)
          if (res.err_code === 0) {
            this.$message({
              message: '增加专题成功！',
              type: 'success'
            });
            this.dialogFormVisible = false
            this.getFirstFloor()
          } else if (res.err_code === 11) {
            this.$message({
              message: '专题已经存在',
              type: 'warning'
            });
          }
        }
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

    .addLi {
        float: left;
        width: 100px;
        height: 25px;
        margin-bottom: 10px;
        text-align: center;
        line-height: 25px;
        cursor: pointer;
        background: #409eff;
        box-sizing: border-box;
        color: white;
    }

    .reduceLi {
        float: left;
        width: 100px;
        height: 25px;
        margin-bottom: 10px;
        text-align: center;
        line-height: 25px;
        cursor: pointer;
        background: #f56c6c;
        box-sizing: border-box;
        color: white;
    }
</style>
