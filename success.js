/*
Johu 2019/12/6 15:16:36.
*/
// 跨域请求成功
// 先改后端
// 新建后端代码
// 前后端调试成功
// 后端发邮件成功
// 2019/12/7 修改后端返回前端加上err_code参数
// 注册功能完成
// 登录功能完成
// 忘记密码功能完成
// 2019/12/8 添加user_info有余力处理publish页面 ok
// 服务器端session完成，自动登录
// 导航栏信息填充完毕
// 后台开始
// 动态路由设置完成
// 后台用户登录
// 准备后台用户管理数据填充
// 明日尽量收藏消息通知
// 富文本编辑器图片上传改进
// 文章头图和摘要实现
// 消息中心实现
// 新建临时表保存临时状态消息
// 新建触发器 INSERT INTO tempstate(sId,fromId,toId,tId,type,sTime) VALUES(new.sId,new.fromId,new.toId,new.tId,new.type,new.sTime)
// 下午实现用户选中Tabs停留

// 发现bug多用户注册有问题，应该一人分配一个验证码不共用数组


user_info = [
  {
    "token": "5deb159d807eae1d6558e138",
    "real_name": "小撩宝宝",
    "phone": "17756728198",
    "icon_url": "http://www.itlike.com/uploads/picture/20190814/80b52b5d5b25db373c0aee56e7df4e80.png"
  },
]

