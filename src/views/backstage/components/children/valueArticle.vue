<template>
    <div id="valuearticle">
        <div class="tableborder">
            <template>
                <el-button style="position: fixed;border: 1px solid #f0f0f0;z-index: 999;left: 630px;top: 90px;"
                           type="primary" @click="chartDialog()">3D数据视图
                </el-button>
                <div v-show="dialogChartVisible" style="position: fixed;top:150px;background: white;z-index: 999;width: 75%;text-align: center">
                    <div id="chart" ref="charts" style="width: 800px ;height: 630px">

                    </div>

                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="dialogChartVisible = false">关  闭</el-button>
                    </div>
                </div>
                <el-table
                        height="680px"
                        stripe
                        :data="tableData.filter(data => !search || data.tTopic.toLowerCase().includes(search.toLowerCase()))"
                        style="width: 100%">
                    <el-table-column
                            prop="tId"
                            label="文章ID"
                            sortable
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="userName"
                            label="发布人"
                            sortable
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="tTopic"
                            width="280"
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
                            width="80"
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
                    <!--正文开始-->
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
  import {deleteTopic, getTopicDetail, rate} from "../../../../service/api";

  export default {
    name: "valueArticle",
    data() {
      return {
        tableData: [],
        // 弹出框显示隐藏
        dialogFormVisible: false,
        // 3D数据框
        dialogChartVisible: false,
        // 总条数
        total: 0,
        search: '',
        //  文章详情
        tContents: '',
        //  评分属性
        value2: null,
        colors: {2: '#f2d3a3', 4: {value: '#F7BA2A', excluded: true}, 5: '#FF9900'},
        chatsData: []
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
          // console.log(res.chartsData);
          this.chatsData = res.chartsData

          // this.drawLine();

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

      },
      async change(value, row) {

        let res = await rate(row.tId, value);
        if (res.err_code === 0) {
        }
      },
      chartDialog(){
        this.dialogChartVisible = true
        this.drawLine()
      },
      drawLine() {

        let echarts = require('echarts')
        let myChart = echarts.init(document.getElementById('chart'));
        let title = {
          text: '文章数据展示',
        };
        let xAxis3D = {
          name:'推荐值',
          type: 'value'
        };
        let yAxis3D = {
          name:'被收藏数/次',
          type: 'value'
        };
        let zAxis3D = {
          name:'被评论数/次',
          type: 'value'
        };
        let grid3D = {};
        let series = [
          {
            type: 'scatter3D', //设置图表类型为3d散点图
            data: this.chatsData,
            symbolSize:3,
            lineStyle: {
              width: 4
            }
          },
        ];
        let json = {};
        json.title = title;
        json.xAxis3D = xAxis3D;
        json.yAxis3D = yAxis3D;
        json.zAxis3D = zAxis3D;
        json.grid3D = grid3D;
        json.series = series;
        // 为echarts对象加载数据
        myChart.setOption(json);
      },
    }

  }
</script>

<style scoped>

</style>
