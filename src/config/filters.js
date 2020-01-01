/*
Johu 2019/12/6 16:24:25.
*/
import Vue from 'vue'

Vue.filter('timeFormat', (value) => {

  value = new Date(value)
  var year = value.getFullYear().toString().padStart(4, "0");
  var month = (value.getMonth() + 1).toString().padStart(2, "0");
  var date = value.getDate().toString().padStart(2, "0");
  var hour = value.getHours().toString().padStart(2, "0");
  var minute = value.getMinutes().toString().padStart(2, "0");
  var second = value.getSeconds().toString().padStart(2, "0");
  return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;

})

Vue.filter('timeFormatSimple', (value) => {
  value = new Date(value)
  var year = value.getFullYear().toString().padStart(4, "0");
  var month = (value.getMonth() + 1).toString().padStart(2, "0");
  var date = value.getDate().toString().padStart(2, "0");

  return year + "-" + month + "-" + date;

})

// 计算日期相隔
Vue.filter('getDateDiff', (dateTimeStamp) => {

  var stringTime = dateTimeStamp.replace(/T/g, ' ').replace(/Z/g, ' ');

  dateTimeStamp = new Date(Date.parse(stringTime.replace(/-/g, "/")));

  // dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
  var minute = 1000 * 60;      //把分，时，天，周，半个月，一个月用毫秒表示
  var hour = minute * 60;
  var day = hour * 24;
  var week = day * 7;
  var halfamonth = day * 15;
  var month = day * 30;

  var now = new Date().getTime();   //获取当前时间毫秒
  var diffValue = now - dateTimeStamp;//时间差

  var result = '';

  if (diffValue < 0) {
    return;
  }

  var minC = diffValue / minute;  //计算时间差的分，时，天，周，月
  var hourC = diffValue / hour;
  var dayC = diffValue / day;
  var weekC = diffValue / week;
  var monthC = diffValue / month;

  if (monthC >= 1) {
    result = "" + parseInt(monthC) + "月SCF时刻";
  } else if (weekC >= 1) {
    result = "" + parseInt(weekC) + "周SCF时刻";
  } else if (dayC >= 1) {
    result = "" + parseInt(dayC) + "天SCF时刻";
  } else if (hourC >= 1) {
    result = "" + parseInt(hourC) + "小时SCF时刻";
  } else if (minC >= 1) {
    result = "" + parseInt(minC) + "分钟SCF时刻";
  } else
    result = "刚刚";
  return result;

})

// 状态过滤器
Vue.filter('aboutWord', (value) => {
  if (value == 'star') {
    return '收藏'
  } else if (value == 'chat') {
    return '评论'
  } else if (value == 'like') {
    return '关注'
  }
})



