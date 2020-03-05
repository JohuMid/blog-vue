import Vue from 'vue'
import VueRouter from 'vue-router'
// 导航栏
import NavBar from '../views/navbar/NavBar'
// 文章条目
import ArticleList from "../views/home/ArticleList";
// 个人中心
import User from "../views/user/User";
//
import Users from "../views/users/Users";
// 登录，注册，忘记密码页面
import Login from "../views/login/Login";
import Register from "../views/login/Register";
import ForgetPsd from "../views/login/ForgetPsd";
// 发布文章页面
import Publish from "../views/publish/Publish";
// 修改文章界面
import EditPublish from "../views/publish/EditPublish";
// 文章详情页面
import Article from "../views/home/components/Article";
// 搜索界面
import Search from "../views/home/components/Search";
// 标签页
import tagPage from "../views/home/components/tagPage";
// 推荐作者
import AuthorRecommend from "../views/home/components/AuthorRecommend";
// 推荐文章
import topicRecommend from "../views/home/components/topicRecommend";

// 后台页面

// 用户分析
import UserAnalysis from "../views/backstage/components/UserAnalysis";
import UserAction from "../views/backstage/components/UserAction";


import Backstage from "../views/backstage/Backstage";

import ArticleManage from "../views/backstage/components/ArticleManage";
import ChatManage from "../views/backstage/components/ChatManage";
import UserArticle from "../views/user/components/UserArticle";
import UserManage from "../views/backstage/components/UserManage";

// 文章分析
import ArticleAnalysis from "../views/backstage/components/ArticleAnalysis";
import ArticleAction from "../views/backstage/components/ArticleAction";

// 概览
import Overview from "../views/backstage/components/Overview";

// 专题分析
import SpecialManage from "../views/backstage/components/SpecialManage";
// 管理员管理
import AdminManage from "../views/backstage/components/AdminManage";
// 运营数据
import Operation from "../views/backstage/components/Operation";
// 回复管理
import ReplyManage from "../views/backstage/components/ReplyManage";

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {path: '/', redirect: '/navbar'},
    {
      path: '/navbar',
      name: 'navbar',
      component: NavBar,
      children: [
        {path: '/navbar', redirect: '/navbar/articlelist'},
        {path: 'articlelist', name: 'articlelist', component: ArticleList,},
        {path: 'article/:tId', name: 'article', component: Article},
        {path: 'user', name: 'user', component: User},
        {path: 'users/:uId', name: 'users', component: Users},
        {path: 'editpublish/:tId', name: 'editpublish', component: EditPublish},
        {path: 'publish', name: 'publish', component: Publish},
        {path: 'search/:searchInput', name: 'search', component: Search},
        {path: 'tagpage/:tag', name: 'tagpage', component: tagPage},
        {path: 'authorrecommend', name: 'authorrecommend', component: AuthorRecommend},
        {path: 'topicrecommend', name: 'topicrecommend', component: topicRecommend},
      ]
    },
    {path: '/login', name: 'login', component: Login},
    {path: '/register', name: 'register', component: Register},
    {path: '/forgetpsd', name: 'forgetpsd', component: ForgetPsd},

    {path: '/', redirect: '/backstage'},
    {
      path: '/backstage',
      name: 'backstage',
      component: Backstage,
      children: [
        {path: '/backstage', redirect: '/backstage/overview'},
        {path: 'overview', name: 'overview', component: Overview,},
        {path: 'usermanage', name: 'usermanage', component: UserManage,},
        {path: 'useranalysis', name: 'useranalysis', component: UserAnalysis,},
        {path: 'useraction', name: 'useraction', component: UserAction,},
        {path: 'articlemanage/:uId', name: 'articlemanage', component: ArticleManage},
        {path: 'articlemanage', name: 'articlemanage', component: ArticleManage},

        {path: 'articleanalysis', name: 'articleanalysis', component: ArticleAnalysis,},
        {path: 'articleaction', name: 'articleaction', component: ArticleAction,},
        {path: 'specialmanage', name: 'specialmanage', component: SpecialManage},
        {path: 'chatmanage/:tId', name: 'chatmanage', component: ChatManage},
        {path: 'chatmanage', name: 'chatmanage', component: ChatManage},
        {path: 'replymanage', name: 'replymanage', component: ReplyManage},
        {path: 'adminmanage', name: 'adminmanage', component: AdminManage},
        {path: 'operation', name: 'operation', component: Operation},
      ]
    },

  ],

})
