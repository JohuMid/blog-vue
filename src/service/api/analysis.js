/*
Johu 2020/1/9 15:01:28.
*/
// 2. 定义后台分析路径
import ajax from "./ajax";

const ANALYSIS_BASE_URL = '/analysis';

export const totalNum = () => ajax(ANALYSIS_BASE_URL + '/totalnum');
