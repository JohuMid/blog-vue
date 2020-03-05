<template>
    <div id="operation">
        <el-row :gutter="20">
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-card>
                        <el-row>
                            <el-col :span="6">
                                <div class="grid-content bg-purple">
                                    <i class="el-icon-thumb" style="font-size: 60px;color: #409eff"></i>

                                </div>
                            </el-col>
                            <el-col :span="18">
                                <div class="grid-content bg-purple-light" style="text-align: center">
                                    <h3>最近自然日访问数</h3>
                                    <h4 style="font-weight: bolder">{{visitNum}}</h4>
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
                                    <i class="el-icon-reading" style="font-size: 60px;color: #409eff"></i>

                                </div>
                            </el-col>
                            <el-col :span="18">
                                <div class="grid-content bg-purple-light" style="text-align: center">
                                    <h3>最近自然日阅读数</h3>
                                    <h4 style="font-weight: bolder">{{readNum}}</h4>
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
                                    <i class="el-icon-position" style="font-size: 60px;color: #409eff"></i>

                                </div>
                            </el-col>
                            <el-col :span="18">
                                <div class="grid-content bg-purple-light" style="text-align: center">
                                    <h3>最近自然日登录数</h3>
                                    <h4 style="font-weight: bolder">{{loginNum}}</h4>
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
                                    <i class="el-icon-help" style="font-size: 60px;color: #409eff"></i>

                                </div>
                            </el-col>
                            <el-col :span="18">
                                <div class="grid-content bg-purple-light" style="text-align: center">
                                    <h3>最近自然日注册数</h3>
                                    <h4 style="font-weight: bolder">{{registerNum}}</h4>
                                </div>
                            </el-col>
                        </el-row>
                    </el-card>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 20px;">
            <el-col :span="24">
                <el-card style="height: 600px;">
                    <chart style="width: 100%;height:500px" ref="chart" :options="operationOptions"
                           :auto-resize="true"></chart>

                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  import {operationData} from "../../../service/api/index";

  export default {
    name: "Operation",
    data() {
      return {
        operationOptions: {},
        operationData: {
          operationList: {},
          dateList: {}
        },
        visitNum: 0,
        loginNum: 0,
        readNum: 0,
        registerNum: 0
      }
    },
    created() {
      this.initData()
    },
    mounted() {
      this.operationOptions = {
        title: {
          text: '网站运营数据',
        },
        toolbox: {
          feature: {
            saveAsImage: {},
            dataView: {},
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.operationData.dateList
        },
        yAxis: {
          type: 'value'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '0%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['访问数', '阅读数', '登录数', '注册数', '转化率']
        },
        series: [
          {
            name: '访问数',
            type: 'line',
            data: [],
          },
          {
            name: '阅读数',
            type: 'line',
            data: [],
          },
          {
            name: '登录数',
            type: 'line',
            data: [],
          },
          {
            name: '注册数',
            type: 'line',
            data: [],
          },
          {
            name: '转化率',
            type: 'line',
            data: [],
          },
        ]
      }

    },
    watch: {
      operationData: {
        handler(newVal, oldVal) {

          let count = 0
          for (let key in this.operationData.operationList) {
            count++
          }

          let keys = ['oVisit', 'oRead', 'oLogin', 'oRegister']
          for (let i = 0; i < count; i++) {
            this.$refs.chart.options.series[i].data = this.operationData.operationList[keys[i]];
          }
          let num = []
          for (let j = 0; j < 7; j++) {
            num.push((this.operationData.operationList[keys[1]][j] / this.operationData.operationList[keys[0]][j]).toFixed(2));
          }

          this.$refs.chart.options.series[count].data =num

          this.$refs.chart.options.xAxis.data = [this.gettime(6), this.gettime(5), this.gettime(4), this.gettime(3), this.gettime(2), this.gettime(1), this.gettime(0)]
        },
        deep: true //对象内部属性的监听，关键。
      },
    },
    methods: {
      async initData() {
        let res = await operationData();

        if (res.err_code === 0) {


          this.readNum = res.todayOperation.oRead
          this.loginNum = res.todayOperation.oLogin
          this.visitNum = res.todayOperation.oVisit
          this.registerNum = res.todayOperation.oRegister

          this.operationData.operationList = res.operation


          /*let res1 = res.results1;

          for (let i = 0; i < res1.length; i++) {
            this.collectData['collect' + (i + 1)] = res1[i]
          }*/
        }
      },
      gettime(num) {
        var time = (new Date).getTime() - 24 * 60 * 60 * 1000 * num;
        var yesterday = new Date(time);
        var month = yesterday.getMonth();
        var day = yesterday.getDate();
        return yesterday.getFullYear() + "-" + (yesterday.getMonth() > 9 ? (yesterday.getMonth() + 1) : "0" + (yesterday.getMonth() + 1)) + "-" + (yesterday.getDate() > 9 ? (yesterday.getDate()) : "0" + (yesterday.getDate()));
      }
    }
  }
</script>

<style scoped>

</style>
