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
      this.compilation = stats.compilation
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
      let that = this
      if (this.compilation.hooks) {
        this.compilation.hooks.uploadMorePluginAfter.call('map上传完成',  (msg) =>{
          // 子插件做完事情的回调
            console.log(msg) 
        })
      } else {
        // this.compilation._plugins 存放着钩子的回调函数，是个数组
        // let uploadMorePluginAfter =  this.compilation._plugins.uploadMorePluginAfter || []
        // uploadMorePluginAfter.forEach(p =>{
        //   p('map上传完成', (msg) =>{
        //     // 子插件做完事情的回调
        //       console.log(msg) 
        //   })
        // })
        // compilation和compiler是继承tapable
        // 当然也可以调用applyPlugins，同步钩子，具体的tapable的方法看源码
        // https://www.jianshu.com/p/c71393db6287
        this.compilation.applyPlugins('uploadMorePluginAfter', 'map上传完成', (msg) =>{
          // 子插件做完事情的回调
            console.log(msg) 
        })
      }
    }
    // 为compilation添加钩子，对于webpack新版本
    getHooks(compilation) {
      compilation.hooks.uploadMorePluginAfter = new tapable.SyncHook(["data", "cb"])
      return compilation.hooks
    }
  } 
  module.exports = TestPlugin