/*
Johu 2019/12/4 09:46:28.
*/
import ajax from "./ajax";

// http://demo.itlike.com/web/xlmc/api/homeApi
// http://demo.itlike.com/web/xlmc/api/homeApi/categories
// http://demo.itlike.com/web/xlmc/api/homeApi/categoriesdetail/lk001
// lk001 - lk006

// 1. 定义基础路径
const LOCAL_BASE_URL = '/api'

/**
 * 前台操作
 */
// 获取注册验证码
export const getVecode = (userEmail, userName) => ajax(LOCAL_BASE_URL + '/vecode', {userEmail, userName});
// 用户注册
export const register = (userEmail, userName, userPassword, userVecode) => ajax(LOCAL_BASE_URL + '/register', {
  userEmail,
  userName,
  userPassword,
  userVecode
}, 'POST');
// 用户登录
export const login = (userEmail, userPassword, isAdmin) => ajax(LOCAL_BASE_URL + '/login', {
  userEmail,
  userPassword,
  isAdmin
}, 'POST');

// 获取忘记密码验证码
export const getForVecode = (userNewEmail) => ajax(LOCAL_BASE_URL + '/forvecode', {userNewEmail});
// 重置密码
export const forgetPsd = (userNewEmail, userNewPassword, userNewVecode) => ajax(LOCAL_BASE_URL + '/forgetpsd', {
  userNewEmail,
  userNewPassword,
  userNewVecode
}, 'POST');

// 请求用户数据（登录与否）
export const getUserData = () => ajax(LOCAL_BASE_URL + '/reqdata', {});
// 退出登录
export const getLogOut = () => ajax(LOCAL_BASE_URL + '/logout', {});
// 发布文章
export const publishTopic = (uId, userTheme, userTopic, tModel) => ajax(LOCAL_BASE_URL + '/publish', {
  uId,
  userTheme,
  userTopic,
  tModel
}, 'POST');
// 上传文章中包含的图片
export const uploadTopicImg = (uId, data) => ajax(LOCAL_BASE_URL + '/uplodtopicimg', {uId, data}, 'POST');
// 修改文章
export const updateTopic = (tId, userTheme, userTopic) => ajax(LOCAL_BASE_URL + '/updatetopic', {
  tId,
  userTheme,
  userTopic
}, 'POST');


// 获取大banner信息
export const getBannerTopic = () => ajax(LOCAL_BASE_URL + '/bannertopic');

// 获取文章简要信息
export const getTopicList = (page) => ajax(LOCAL_BASE_URL + '/topiclist', {page});
// 获取全部文章信息
export const getAllTopicList = () => ajax(LOCAL_BASE_URL + '/alltopiclist');
// 获取全部用户信息
export const getAllUserList = () => ajax(LOCAL_BASE_URL + '/alluserlist');


// 获取用户详细信息
export const getUserAllData = (uId) => ajax(LOCAL_BASE_URL + '/requser', {uId});
// 编辑用户信息
export const editUserAllData = (uId, nickname, birthday, local, sex, intro) => ajax(LOCAL_BASE_URL + '/edituser', {
  uId,
  nickname,
  birthday,
  local,
  sex,
  intro
}, 'POST');
// 上传用户头像
export const uploadAvatar = (uId, data) => ajax(LOCAL_BASE_URL + '/editavatar', {uId, data}, 'POST');
// 获取当前用户文章
export const getUserTopic = (uId, pageNum, currentPage) => ajax(LOCAL_BASE_URL + '/usertopic', {
  uId,
  pageNum,
  currentPage
});
// 获取用户收藏简要信息
export const getUserCollect = (uId, pageNum, currentPage) => ajax(LOCAL_BASE_URL + '/usercollect', {
  uId,
  pageNum,
  currentPage
});

// 获取用户关注简要信息
export const getUserAttention = (uId, pageNum, currentPage) => ajax(LOCAL_BASE_URL + '/userattention', {
  uId,
  pageNum,
  currentPage
});
// 获取粉丝信息
export const getUserFans = (uId, pageNum, currentPage) => ajax(LOCAL_BASE_URL + '/userfans', {
  uId,
  pageNum,
  currentPage
});
// 获取粉丝信息
export const getUserNews = (uId) => ajax(LOCAL_BASE_URL + '/usernews', {
  uId,
});

// 获取文章详细信息
export const getTopicDetail = (topicIndex) => ajax(LOCAL_BASE_URL + '/topicdetail', {topicIndex}, 'POST');
// 上一篇
export const prevAllTopic = (topicIndex) => ajax(LOCAL_BASE_URL + '/prev', {topicIndex});
// 下一篇
export const nextAllTopic = (topicIndex) => ajax(LOCAL_BASE_URL + '/next', {topicIndex});
// 发表评论
export const publishChat = (uId, topicIndex, chat) => ajax(LOCAL_BASE_URL + '/publishchat', {uId, topicIndex, chat});
// 发表评论回复
export const publishReplyChat = (rId, uId, tId, userName, reply) => ajax(LOCAL_BASE_URL + '/publishreplychat', {
  rId,
  uId,
  tId,
  userName,
  reply
});
// 获取文章对应评论
export const getChat = (topicIndex) => ajax(LOCAL_BASE_URL + '/chat', {topicIndex});
// 收藏
export const userCollect = (uId, topicIndex) => ajax(LOCAL_BASE_URL + '/collect', {uId, topicIndex});
// 取消收藏
export const userCancelCollect = (uId, topicIndex) => ajax(LOCAL_BASE_URL + '/cancelcollect', {uId, topicIndex});
// 关注
export const userAttention = (uId, usersId) => ajax(LOCAL_BASE_URL + '/attention', {uId, usersId});
// 取消关注
export const userCancelAttention = (uId, usersId) => ajax(LOCAL_BASE_URL + '/cancelattention', {uId, usersId});
// 是否收藏 获取收藏量
export const userIsStar = (uId, topicIndex) => ajax(LOCAL_BASE_URL + '/isuserstar', {uId, topicIndex});
// 是否关注
export const userIsAttention = (uId, usersId) => ajax(LOCAL_BASE_URL + '/isuserattention', {uId, usersId});
// 获取标签页
export const tagTopic = (tag, page) => ajax(LOCAL_BASE_URL + '/tagtopic', {tag, page});


/**
 * 后台操作
 */
export const getUsersData = (pageNum, currentPage) => ajax(LOCAL_BASE_URL + '/getusersdata', {
  pageNum,
  currentPage
}, 'POST');
export const getTopicsData = (uId, pageNum, currentPage) => ajax(LOCAL_BASE_URL + '/gettopicsdata', {
  uId,
  pageNum,
  currentPage
}, 'POST');
export const getChatsData = (tId, pageNum, currentPage) => ajax(LOCAL_BASE_URL + '/getchatsdata', {
  tId,
  pageNum,
  currentPage
}, 'POST');

// 删除评论
export const deleteChat = (rId) => ajax(LOCAL_BASE_URL + '/delchat', {rId});
// 删除文章
export const deleteTopic = (tId) => ajax(LOCAL_BASE_URL + '/deltopic', {tId});
// 专题管理
export const getSpecialTopic = (tag, pageNum, currentPage) => ajax(LOCAL_BASE_URL + '/getspecialtopic', {
  tag,
  pageNum,
  currentPage
}, 'POST');
// 文章推荐评级
export const rate = (tId, value) => ajax(LOCAL_BASE_URL + '/rate', {tId, value});






