const glob = require('glob')
const http = require('http')
const fs = require('fs')
const rq = require('request')
const path = require('path')
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
      let promiseList = []
      list.forEach(filePath =>{
        let formData ={}
        promiseList.push(
          new Promise ((resolve, reject)=>{
            formData[path.basename(filePath)] = fs.createReadStream(filePath)
            rq.post({
              url: 'http://localhost:7001/upload',
              formData
            }, (err, httpResponse, body) =>{
              console.log('错误', err)
              if(err) {
                console.log('上传失败')
                reject()
              } else {
                console.log('上传成功') 
                resolve()
              }
            })
          })
        )
      })
      Promise.all(promiseList).then(res =>{
        console.log('全部发射成功')
      })
    }
  } 
  module.exports = TestPlugin