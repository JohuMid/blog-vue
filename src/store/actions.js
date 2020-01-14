/*
Johu 2019/12/4 09:46:53.
*/
// 涉及到异步的时候不能使用mutation要用action
import {USER_INFO} from "./mutations-type";
import {getUserData} from "../service/api";
import {getStore} from "../config/global";


export default {
// 同步用户信息
  syncUserInfo({commit}, userInfo) {
    commit(USER_INFO, {userInfo})
  },

  async reqUserInfo({commit}) {
    // 从本地获取数据
    let userInfo = JSON.parse(getStore('userInfo'))
    if (userInfo) {
      console.log(userInfo);

      commit(USER_INFO, {userInfo});
    } else {
      // 服务器端验证
      let res = await getUserData();
      console.log(res);
      if (res.err_code === 0) {
        commit(USER_INFO, {userInfo: res.user})
      }

    }
  }
}
