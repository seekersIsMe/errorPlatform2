const glob = require('glob')
const http = require('http')
const fs = require('fs')
const rq = require('request')
const path = require('path')
const axios = require('axios')
var FormData = require("form-data");
class TestPlugin {
    apply(compiler) {
      let that = this
      if(compiler.hooks) {
        compiler.hooks.done.tap('TestPlugin', function (stats) {
          that.sendMapFile(stats)
        })
      } else {
        compiler.plugin('done', (stats) =>{
          that.sendMapFile(stats)
        });
      }
    }
    sendMapFile (stats) {
      let list = glob.sync(path.join(stats.compilation.outputOptions.path, `./**/*.{js.map,}`))
      console.log('列表',list)
      this.uploadFile(list) 
    }
  
    uploadFile (list) {
      let form = new FormData();
      list.forEach(filePath =>{
        form.append("files", fs.createReadStream(filePath));
      })
      axios({
        method: "post",
        url: "http://localhost:7001/upload",
        data: form,
        headers: form.getHeaders() // constent-type multipart/form-data
        }).then(res =>{
            console.log(res)
            console.log('发送成功')
        })
    }
  } 
  module.exports = TestPlugin