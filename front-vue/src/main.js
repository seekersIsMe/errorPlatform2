// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './api/axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import md5 from 'md5'
Vue.config.productionTip = false
Vue.prototype.axios = axios
console.log('md5',md5)
Vue.prototype.md5 = md5
Vue.use(ElementUI)
//https://segmentfault.com/q/1010000021973319
Vue.config.errorHandler = function (err, vm, info) {
  let { 
    message, // 异常信息
    name, // 异常名称
    script,  // 异常脚本url 拿不到
    line,  // 异常行号 拿不到
    column,  // 异常列号 拿不到
    stack  // 异常堆栈信息 行列信息从错误堆栈中获取
} = err;
  console.log(message)
  console.log(name)
  console.log(script)
  console.log(line)
  console.log(column)
  console.log(stack)
  let errMsg = {
    message,
    errType: name,
    stack
  }
  axios.post('/senderr', errMsg).then(res =>{
    console.log(res)
  })
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
