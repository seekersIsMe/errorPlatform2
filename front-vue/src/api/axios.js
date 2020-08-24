import axios from 'axios'
import { MessageBox } from 'element-ui';
import Vue from 'vue'
// 获取环境变量
let env = process.env.NODE_ENV
console.log('环境变量', env)
let options = {
  timeout: 5000,
  baseURL:  env==='development' ? '/api/' : ''
}
const TOKEN_KEY = 'TOKEN-KEY'
// options.baseURL = apiConfig.baseUrl;

let service = axios.create(options);

service.interceptors.request.use(
    config => {
      config.headers.common["Kaikeba"] = "dasheng";
  
      const token = window.localStorage.getItem(TOKEN_KEY);
      if (token) {
        // 判断是否存在token，如果存在的话，则每个http header都加上token
        // Bearer 是JWT的认证头部信息
        config.headers.common["Authorization"] = "Bearer " + token;
      }
      return config;
    },
    err => {
      return Promise.reject(err);
    }
  );
  
  service.interceptors.response.use(
    async response => {
      console.log('res',response)
      const {data,config} = response
      if(data.code===0){
        // 正确
        console.log('请求路径', config.url)
        if(config.url==="/login"){
          // 设置token
          const token = data.data.token
          localStorage.setItem(TOKEN_KEY, token)
        }
      }else if(data.code===-666){
        // token过期
        MessageBox.confirm('登录已过期', '过期', {
          confirmButtonText: '去登录',
          showCancelButton:false,
          type: 'warning',
        }).then(() => {
          localStorage.removeItem(TOKEN_KEY)
          let app = new Vue()
          app.$router.push({
              path: '/login'
          })
        //   Vue.redirect({path:'/login'})
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
        })
      }
      return data;
    },
    err => {
      return Promise.reject(err);
    }
  );

export default service
