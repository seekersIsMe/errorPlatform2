const http = require('http')
const fs = require('fs')
const req = http.request('http://localhost:7001/upload', {
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryapXIfwaPhEPi91nz',
      Connection: 'keep-alive',
      'Transfer-Encoding': 'chunked'
    }
  })
//   https://blog.csdn.net/weixin_33862041/article/details/88709520
// https://segmentfault.com/q/1010000009994341/a-1020000009995696
  const readStream = fs.createReadStream('E:/errorPlatform2/front-vue/dist/static/js/manifest.2ae2e69a05c33dfc65f8.js.map')
  readStream.on('data', chunk =>{
    req.write(chunk)
  })
  readStream.on('end', () =>{
      console.log('上次成功')
    req.end()
  })