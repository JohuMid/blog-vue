import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

Vue.config.productionTip = false

// 引入element-ui组件库
import '@/plugins/element-ui.js'

// 引入全局的样式
import '@/style/common.css'

// 引入全局过滤器
import '@/config/filters'

// 引入无限滚动
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)


// socket.io
import VueSocketIO from 'vue-socket.io'


Vue.use(new VueSocketIO({
    debug: true,
    connection: ('http://127.0.0.1:3000'), //options object is Optional

  })
);


// 图片基础路径
Vue.prototype.imgBaseUrl = 'http://localhost:3000/public/images/avatar/'
// 文章图片基础路径
Vue.prototype.topicImgBaseUrl = 'http://localhost:3000/public/images/topic/'

import VueQuillEditor from 'vue-quill-editor'

Vue.use(VueQuillEditor)

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 代码块高亮样式文件
// import 'highlight.js/styles/xcode.css'

import hljs from 'highlight.js' //导入代码高亮文件
import 'highlight.js/styles/monokai-sublime.css'  //导入代码高亮样式

//自定义一个代码高亮指令
Vue.directive('highlight',function (el) {
  let highlight = el.querySelectorAll('pre code');
  highlight.forEach((block)=>{
    hljs.highlightBlock(block)
  })
})







new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
