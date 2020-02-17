<template>
    <div id="articleanalysis">
        <el-row :gutter="20">
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <h2 class="title">文章收藏量/次</h2>
                        <chart ref="chart1" :options="collectOptions" :auto-resize="true"></chart>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <h2 class="title">文章评论量/次</h2>
                        <chart ref="chart2" :options="chatOptions" :auto-resize="true"></chart>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <h2 class="title">发布时间/年</h2>
                        <chart ref="chart3" :options="dateOptions" :auto-resize="true"></chart>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <h2 class="title">文章专题</h2>
                        <chart ref="chart4" :options="typeOptions" :auto-resize="true"></chart>
                    </div>
                </el-col>
            </el-row>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <h2 class="title">发布文章总量/条</h2>
                    <chart ref="chart5" :options="countOptions" :auto-resize="true"></chart>

                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <h2 class="title">新增文章数量/条</h2>
                    <chart ref="chart6" :options="addtopicOptions" :auto-resize="true"></chart>
                </div>
            </el-col>

        </el-row>
    </div>
</template>

<script>
  import {totalTopic} from "../../../service/api/analysis";

  export default {
    name: "ArticleAnalysis",
    data() {
      return {
        collectOptions: {},
        chatOptions: {},
        dateOptions: {},
        typeOptions: {},
        countOptions: {},
        addtopicOptions: {},
        collectData: {
          collect1: 0,
          collect2: 0,
          collect3: 0,
          collect4: 0,
        },
        chatData: {
          chat1: 0,
          chat2: 0,
          chat3: 0,
          chat4: 0,
        },
        dateData: {
          date1: 0,
          date2: 0,
          date3: 0,
          date4: 0,
        },
        typeData: {
          type1: 0,
          type2: 0,
          type3: 0,
          type4: 0,
          type5: 0,
          type6: 0,
        },
        countData: {
          countList: [],
          dateList: []
        },
        addtopicData: {
          addtopicList: []
        }

      }
    },
    created() {
      this.init();
    },
    mounted() {
      this.collectOptions = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['0~40', '40~60', '60~80', '80~']
        },
        series: [
          {
            name: '文章收藏量',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              {value: this.collectData.collect1, name: '0~40'},
              {value: this.collectData.collect2, name: '40~60'},
              {value: this.collectData.collect3, name: '60~80'},
              {value: this.collectData.collect4, name: '80~'},
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      this.chatOptions = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['0~40', '40~60', '60~80', '80~']
        },
        series: [
          {
            name: '文章评论量',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              {value: this.chatData.chat1, name: '0~40'},
              {value: this.chatData.chat2, name: '40~60'},
              {value: this.chatData.chat3, name: '60~80'},
              {value: this.chatData.chat4, name: '80~'},
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      this.dateOptions = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['0~4', '4~6', '6~8', '8~']
        },
        series: [
          {
            name: '发布时间',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              {value: this.dateData.date1, name: '0~4'},
              {value: this.dateData.date2, name: '4~6'},
              {value: this.dateData.date3, name: '6~8'},
              {value: this.dateData.date4, name: '8~'},
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      this.typeOptions = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: []
        },
        series: [
          {
            name: '文章类型',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      this.countOptions = {
        xAxis: {
          type: 'category',
          data: this.countData.dateList
        },
        yAxis: {
          type: 'value'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['文章数量']
        },
        series: [{
          name: '文章数量',
          data: this.countData.countList,
          markPoint: {
            data: [
              {type: 'max', name: '最大值'},
              {type: 'min', name: '最小值'}
            ]
          },
          markLine: {
            data: [
              {type: 'average', name: '平均值'}
            ]
          },
          type: 'line',
          smooth: true
        }]
      };
      this.addtopicOptions = {
        xAxis: {
          type: 'category',
          data: this.countData.dateList,

        },
        yAxis: {
          type: 'value'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['新增文章数量']
        },
        series: [{
          name: '新增文章数量',
          data: this.addtopicData.topicList,
          markPoint: {
            data: [
              {type: 'max', name: '最大值'},
              {type: 'min', name: '最小值'}
            ]
          },
          markLine: {
            data: [
              {type: 'average', name: '平均值'}
            ]
          },
          type: 'line',
        }]
      }
    },
    watch: {
      collectData: {
        handler(newVal, oldVal) {

          let count = 0
          for (let key in this.collectData) {
            count++
          }
          for (let i = 0; i < count; i++) {
            this.$refs.chart1.options.series[0].data[i].value = this.collectData['collect' + (i + 1)];
          }
        },
        deep: true //对象内部属性的监听，关键。
      },
      chatData: {
        handler(newVal, oldVal) {

          let count = 0
          for (let key in this.chatData) {
            count++
          }

          for (let i = 0; i < count; i++) {
            this.$refs.chart2.options.series[0].data[i].value = this.chatData['chat' + (i + 1)];
          }
        },
        deep: true //对象内部属性的监听，关键。
      },
      dateData: {
        handler(newVal, oldVal) {

          let count = 0
          for (let key in this.dateData) {
            count++
          }

          for (let i = 0; i < count; i++) {
            this.$refs.chart3.options.series[0].data[i].value = this.dateData['date' + (i + 1)];
          }

        },
        deep: true //对象内部属性的监听，关键。
      },
      typeData: {
        handler(newVal, oldVal) {
          let count = 0
          for (let key in this.typeData) {
            count++
          }


          for (let i = 0; i < count; i++) {
            this.$refs.chart4.options.series[0].data[i]['value'] = this.typeData['type' + (i + 1)];
            this.$refs.chart4.options.series[0].data[i]['name'] = this.$refs.chart4.options.legend.data[i]
          }
        },
        deep: true //对象内部属性的监听，关键。
      },
      countData: {
        handler(newVal, oldVal) {
          this.$refs.chart5.options.series[0].data = this.countData.countList;
          this.$refs.chart5.options.xAxis.data = [this.handleYear(10), this.handleYear(8), this.handleYear(6), this.handleYear(4), this.handleYear(2), this.handleYear(0)]
        },
        deep: true //对象内部属性的监听，关键。
      },
      addtopicData: {
        handler(newVal, oldVal) {
          this.$refs.chart6.options.series[0].data = this.addtopicData.addtopicList;
          this.$refs.chart6.options.xAxis.data = [this.gettime(6), this.gettime(5), this.gettime(4), this.gettime(3), this.gettime(2), this.gettime(1), this.gettime(0)]
        },
        deep: true //对象内部属性的监听，关键。
      },
    },
    methods: {
      async init() {
        let res = await totalTopic();

        if (res.err_code === 0) {
          let res1 = res.results1;

          for (let i = 0; i < res1.length; i++) {
            this.collectData['collect' + (i + 1)] = res1[i]
          }

          let res2 = res.results2;

          for (let i = 0; i < res2.length; i++) {
            this.chatData['chat' + (i + 1)] = res2[i]
          }

          let res3 = res.results3;

          for (let i = 0; i < res3.length; i++) {
            this.dateData['date' + (i + 1)] = res2[i]
          }

          let res4 = res.results4;

          for (let i = 0; i < res4.length; i++) {
            this.typeData['type' + (i + 1)] = res4[i].value
            this.$refs.chart4.options.series[0].data.push({})
            this.$refs.chart4.options.legend.data.push(res4[i].name)
          }

          let res5 = res.results5;

          this.countData.countList = res5

          let res6 = res.results6;

          this.addtopicData.addtopicList = res6
        }
      },
      //   根据年份计算坐标轴
      handleYear(n) {
        var myDate = new Date();
        return Number(myDate.getFullYear()) - n;
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
    .bg-purple-dark {
        background: #99a9bf;
    }

    .bg-purple {
        /*border: 1px solid #e5e4e4;*/
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        min-height: 36px;
    }

    .echarts {
        width: 100% !important;
    }

</style>
