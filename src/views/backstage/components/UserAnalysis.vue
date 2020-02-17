<template>
    <div id="useranalysis">
        <el-row :gutter="20">
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <h2 class="title">性别比例/%</h2>
                    <chart ref="chart1" :options="sexOptions" :auto-resize="true"></chart>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <h2 class="title">年龄层次/岁</h2>
                    <chart ref="chart2" :options="ageOptions" :auto-resize="true"></chart>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <h2 class="title">注册时间/年</h2>
                    <chart ref="chart3" :options="regOptions" :auto-resize="true"></chart>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <h2 class="title">区域划分/人</h2>
                    <chart ref="chart4" :options="localOptions" :auto-resize="true"></chart>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <h2 class="title">注册用户数量/人</h2>
                    <chart ref="chart5" :options="countOptions" :auto-resize="true"></chart>

                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <h2 class="title">新增用户数量/人</h2>
                    <chart ref="chart6" :options="adduserOptions" :auto-resize="true"></chart>
                </div>
            </el-col>

        </el-row>
    </div>
</template>

<script>
  import {totalNum} from "../../../service/api/analysis";

  export default {
    name: "UserAnalysis",
    data() {
      return {
        sexOptions: {},
        ageOptions: {},
        regOptions: {},
        localOptions: {},
        countOptions: {},
        adduserOptions: {},

        sexData: {
          male: 0,
          female: 0
        },
        ageData: {
          age1: 0,
          age2: 0,
          age3: 0,
          age4: 0,

        },
        regData: {
          reg1: 0,
          reg2: 0,
          reg3: 0,
          reg4: 0,
        },
        localData: {
          local1: 0,
          local2: 0,
          local3: 0,
          local4: 0,
          local5: 0,
          local6: 0,
          local7: 0,
        },
        countData: {
          countList: [],
          dateList: []
        },
        adduserData: {
          adduserList: [],
          dateList: []
        }
      };
    },
    created() {
      this.init();
    },
    mounted()   {

      this.sexOptions = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['男', '女']
        },
        series: [
          {
            name: '性别比例',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              {value: this.sexData.male, name: '男'},
              {value: this.sexData.female, name: '女'},
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
      this.ageOptions = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['0~20', '20~25', '25~30', '30~']
        },
        series: [
          {
            name: '年龄层次',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              {value: this.sexData.age1, name: '0~20'},
              {value: this.sexData.age2, name: '20~25'},
              {value: this.sexData.age3, name: '25~30'},
              {value: this.sexData.age4, name: '30~'},
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
      this.regOptions = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['0~12', '12~15', '15~18', '18~']
        },
        series: [
          {
            name: '用户注册时间',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              {value: this.regData.reg1, name: '0~12'},
              {value: this.regData.reg2, name: '12~15'},
              {value: this.regData.reg3, name: '15~18'},
              {value: this.regData.reg4, name: '18~'},
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
      this.localOptions = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['东北', '华东', '华北', '华中', '华南', '西南', '西北']
        },
        series: [
          {
            name: '区域划分',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              {value: this.localData.local1, name: '东北'},
              {value: this.localData.local2, name: '华东'},
              {value: this.localData.local3, name: '华北'},
              {value: this.localData.local4, name: '华中'},
              {value: this.localData.local5, name: '华南'},
              {value: this.localData.local6, name: '西南'},
              {value: this.localData.local7, name: '西北'},
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
          data: ['注册用户数量']
        },
        series: [{
          name: '注册用户数量',
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
      this.adduserOptions = {
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
          data: ['新增用户数量']
        },
        series: [{
          name: '新增用户数量',
          data: this.adduserData.countList,
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
      //观察sexData的变化
      sexData: {
        handler(newVal, oldVal) {
          this.$refs.chart1.options.series[0].data[0].value = this.sexData.male
          this.$refs.chart1.options.series[0].data[1].value = this.sexData.female
        },
        deep: true //对象内部属性的监听，关键。
      },
      ageData: {
        handler(newVal, oldVal) {
          this.$refs.chart2.options.series[0].data[0].value = this.ageData.age1;
          this.$refs.chart2.options.series[0].data[1].value = this.ageData.age2;
          this.$refs.chart2.options.series[0].data[2].value = this.ageData.age3;
          this.$refs.chart2.options.series[0].data[3].value = this.ageData.age4;
        },
        deep: true //对象内部属性的监听，关键。
      },
      regData: {
        handler(newVal, oldVal) {
          this.$refs.chart3.options.series[0].data[0].value = this.regData.reg1;
          this.$refs.chart3.options.series[0].data[1].value = this.regData.reg2;
          this.$refs.chart3.options.series[0].data[2].value = this.regData.reg3;
          this.$refs.chart3.options.series[0].data[3].value = this.regData.reg4;
        },
        deep: true //对象内部属性的监听，关键。
      },
      localData: {
        handler(newVal, oldVal) {
          this.$refs.chart4.options.series[0].data[0].value = this.localData.local1;
          this.$refs.chart4.options.series[0].data[1].value = this.localData.local2;
          this.$refs.chart4.options.series[0].data[2].value = this.localData.local3;
          this.$refs.chart4.options.series[0].data[3].value = this.localData.local4;
          this.$refs.chart4.options.series[0].data[4].value = this.localData.local4;
          this.$refs.chart4.options.series[0].data[5].value = this.localData.local4;
          this.$refs.chart4.options.series[0].data[6].value = this.localData.local4;
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
      adduserData: {
        handler(newVal, oldVal) {
          this.$refs.chart6.options.series[0].data = this.adduserData.adduserList;
          this.$refs.chart6.options.xAxis.data = [this.gettime(6),this.gettime(5), this.gettime(4), this.gettime(3), this.gettime(2), this.gettime(1), this.gettime(0)]
        },
        deep: true //对象内部属性的监听，关键。
      }
    },
    methods: {
      async init() {
        let res = await totalNum();
        if (res.err_code === 0) {
          let res1 = (res.results1)

          this.sexData.female = res1[0].female
          this.sexData.male = res1[0].male


          let res2 = (res.results2)

          this.ageData.age1 = res2[0]
          this.ageData.age2 = res2[1]
          this.ageData.age3 = res2[2]
          this.ageData.age4 = res2[3]

          let res3 = (res.results3)

          this.regData.reg1 = res3[0]
          this.regData.reg2 = res3[1]
          this.regData.reg3 = res3[2]
          this.regData.reg4 = res3[3]

          let res4 = (res.results4)

          this.localData.local1 = res4[0]
          this.localData.local2 = res4[1]
          this.localData.local3 = res4[2]
          this.localData.local4 = res4[3]
          this.localData.local5 = res4[4]
          this.localData.local6 = res4[5]
          this.localData.local7 = res4[6]

          let res5 = (res.results5)

          this.countData.countList = res5

          let res6 = (res.results6)

          this.adduserData.adduserList = res6

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
  };
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
