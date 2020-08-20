const http = require('http')
const fs = require('fs')
const rq = require('request')
const axios = require('axios')
var FormData = require("form-data");
// const req = http.request('http://localhost:7001/upload', {
//     method: 'post',
//     headers: {
//       'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryapXIfwaPhEPi91nz',
//       Connection: 'keep-alive',
//       'Transfer-Encoding': 'chunked'
//     }
//   })
//   https://blog.csdn.net/weixin_33862041/article/details/88709520
// https://segmentfault.com/q/1010000009994341/a-1020000009995696
  // const readStream = fs.createReadStream('E:/errorPlatform2/front-vue/dist/static/js/manifest.3ad1d5771e9b13dbdad2.js.map')
  // readStream.on('data', chunk =>{
  //   req.write(chunk)
  // })
  // readStream.on('end', () =>{
  //     console.log('上次成功')
  //   req.end()
  // })

  // let formData = {
  //   'main': fs.createReadStream('C:/Users/admin/Desktop/errorPlatform/front-vue/src/main.js'),
  //   'test': fs.createReadStream('C:/Users/admin/Desktop/errorPlatform/front-vue/src/test.js'),
  // }

  // rq.post({
  //   url: 'http://localhost:7001/upload',
  //   formData
  // }, (err, httpResponse, body) =>{
  //   console.log('错误', err)
  //   if(err) {
  //     console.log('上传失败')
  //   } else {
  //     console.log('上传成功') 
  //   }
  // })

  var form = new FormData();
  form.append("files", fs.createReadStream('C:/Users/admin/Desktop/errorPlatform/front-vue/src/main.js'));
  form.append("files", fs.createReadStream('C:/Users/admin/Desktop/errorPlatform/front-vue/src/test.js'));
  // axios.post('http://localhost:7001/upload',form).then(res =>{
  //   console.log(res)
  //   console.log('发送成功')
  // })
  axios({
    method: "post",
    url: "http://localhost:7001/upload",
    data: form,
    headers: form.getHeaders()
  }).then(res =>{
    console.log(res)
    console.log('发送成功')
  })
  