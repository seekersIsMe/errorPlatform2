const glob = require('glob')
const http = require('http')
const fs = require('fs')
const rq = require('request')
const path = require('path')
const axios = require('axios')
const tapable = require('tapable')
var FormData = require("form-data");
class TestPlugin {
  constructor(option){
    this.compiler = {}
  }
    apply(compiler) {
      this.compiler = compiler
      let that = this
      // console.log('编译器', compiler)
      if(compiler.hooks) {
        compiler.hooks.done.tap('TestPlugin', function (stats) {
          that.sendMapFile(stats)
        })
      } else {
        // webpack3的钩子放在compiler._plugins上面，包含的钩子有before-run、compilation、emit、make、after-emit
        // 
        compiler.plugin('done', (stats) =>{
          that.sendMapFile(stats)
        });
      }
    }
    sendMapFile (stats) {
      let list = glob.sync(path.join(stats.compilation.outputOptions.path, `./**/*.{js.map,}`))
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
            console.log('发送成功')
            list.forEach(p =>{
              fs.unlinkSync(p);
            })
            this.addHooks()
        })
    }
    // 添加本插件发送map文件后的钩子
    addHooks () {
      if (this.compiler.hooks) {
        this.compiler.hooks.uploadMorePluginAfter = new tapable.SyncHook()
        this.compiler.hooks.uploadMorePluginAfter.call('哈哈哈哈')
      } else {
        this.compiler._plugins.uploadMorePluginAfter = new tapable.SyncHook()
        this.compiler._plugins.uploadMorePluginAfter.call('哈哈哈哈')
      }
    }
    getHooks(compilation) {
      return compilation.hooks
    }
  } 
  module.exports = TestPlugin