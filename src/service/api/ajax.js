import axiox from 'axios'

/*
{
  name:'张三',
  age:18,
  sex:'男'
}
 */
export default function ajax(url = '', parmas = {}, type = 'GET') {
  //变量
  let promise;

  //返回promise对象
  return new Promise((resolve, reject) => {
    if (type.toUpperCase() === 'GET') {
      // 拼接字符串
      let parmasStr = '';
      // 遍历
      Object.keys(parmas).forEach(key => {
        parmasStr += key + '=' + parmas[key] + '&'
      });

      // 拼接完整路径
      url += '?' + parmasStr;

      // 发起get请求
      promise = axiox.get(url);

      // 过滤最后的&

      if (parmasStr) {
        parmasStr = parmasStr.substr(0, parmasStr.lastIndexOf('&'))
      }

    } else if (type.toUpperCase() === 'POST') {
      // 发起post请求
      promise = axiox.post(url, parmas);
    }
    // 处理结果返回
    promise.then((response) => {
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  })
}
