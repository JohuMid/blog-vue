/*
Johu 2020/1/9 15:01:28.
*/
// 2. 定义后台分析路径
import ajax from "./ajax";

const ANALYSIS_BASE_URL = '/analysis';

// 用户数据分析
export const totalNum = () => ajax(ANALYSIS_BASE_URL + '/totalnum');

// 用户行为分析
export const userAction = (type) => ajax(ANALYSIS_BASE_URL + '/useraction', {type});

// 文章数据分析
export const totalTopic = () => ajax(ANALYSIS_BASE_URL + '/totaltopic');

// 用户推荐
export const getValueUser = (uId) => ajax(ANALYSIS_BASE_URL + '/getvalueuser', {uId});

// 文章分析
export const topicAction = (type) => ajax(ANALYSIS_BASE_URL + '/topicaction', {type});

// 文章推荐
export const getValueTopic = (model) => ajax(ANALYSIS_BASE_URL + '/getvaluetopic', {model});


