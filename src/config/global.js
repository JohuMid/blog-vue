/*
Johu 2019/12/6 09:22:43.
*/

import Vue from "vue";

// 用户名正则
export const regUsernameExp = /^([\u4e00-\u9fa5]{2,4})|([A-Za-z0-9_ ]{4,16})|([a-zA-Z0-9_\u4e00-\u9fa5]{3,16})$/;
// 邮箱格式正则
export const regEmailExp = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
// 密码格式正则
export const regPsdExp = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,20}$/;
// 六位验证码正则
export const regVecodeExp = /^\d{6}$/;

/*
  本地化存储
 */

export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)

};

/*
  本地化获取
 */
export const getStore = (name) => {
  if (!name) return;
  return window.localStorage.getItem(name)
}

/*
  本地化删除
 */
export const removeStore = (name) => {
  if (!name) return;
  return window.localStorage.removeItem(name)
}

export const timeFormat = (value) => {

  value = new Date(value)
  var year = value.getFullYear();
  var month = value.getMonth() + 1;
  var date = value.getDate();
  var hour = value.getHours();
  var minute = value.getMinutes();
  var second = value.getSeconds();
  return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}
// blob转base64
export const blobToDataURL = (blob, callback) => {
  var a = new FileReader();
  a.onload = function (e) {
    callback(e.target.result);
  }
  a.readAsDataURL(blob);
}

// 图片压缩方法
export const dealImage = (base64, w, callback) => {
  var newImage = new Image();
  var quality = 0.6;    //压缩系数0-1之间
  newImage.src = base64;
  newImage.setAttribute("crossOrigin", 'Anonymous');	//url为外域时需要
  var imgWidth, imgHeight;
  newImage.onload = function () {
    imgWidth = this.width;
    imgHeight = this.height;
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    if (Math.max(imgWidth, imgHeight) > w) {
      if (imgWidth > imgHeight) {
        canvas.width = w;
        canvas.height = w * imgHeight / imgWidth;
      } else {
        canvas.height = w;
        canvas.width = w * imgWidth / imgHeight;
      }
    } else {
      canvas.width = imgWidth;
      canvas.height = imgHeight;
      quality = 0.6;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
    var base64 = canvas.toDataURL("image/jpeg", quality); //压缩语句
    // 如想确保图片压缩到自己想要的尺寸,如要求在50-150kb之间，请加以下语句，quality初始值根据情况自定
    // while (base64.length / 1024 > 150) {
    // 	quality -= 0.01;
    // 	base64 = canvas.toDataURL("image/jpeg", quality);
    // }
    // 防止最后一次压缩低于最低尺寸，只要quality递减合理，无需考虑
    // while (base64.length / 1024 < 50) {
    // 	quality += 0.001;
    // 	base64 = canvas.toDataURL("image/jpeg", quality);
    // }
    callback(base64);//必须通过回调函数返回，否则无法及时拿到该值
  }
}


