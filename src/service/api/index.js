/*
Johu 2019/12/4 09:46:28.
*/
import ajax from "./ajax";

// http://demo.itlike.com/web/xlmc/api/homeApi
// http://demo.itlike.com/web/xlmc/api/homeApi/categories
// http://demo.itlike.com/web/xlmc/api/homeApi/categoriesdetail/lk001
// lk001 - lk006

// 1. 定义基础路径
const BASE_URL = 'http://localhost:3000';

export const getHomeData = () => ajax(BASE_URL + '/', 'POST');
