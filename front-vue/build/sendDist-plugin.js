const uploadMorePlugin = require('./uploadMore-plugin')
const client= require('scp2')
class SendDistPlugin {
    /**
     * 
     * @param {上传服务器的配置参数} option 
     * option= {
     * host: '',  //服务器ip地址
     * post: '', 端口号
     * username: '', // 用户名
     * password: '', // 密码
     * path: '', // 目标服务器存放的路径
     * }
     *  
     *
     */
    constructor (option) {
        this.option = option
        this.compilation = {}
    }
    apply(compiler) {
        let that = this
        if (compiler.hooks) {
            compiler.hooks.compilation.tap('SendDistPlugin', (compilation) =>{
                that.compilation = compilation
                uploadMorePlugin.getHooks(compilation).uploadMorePluginAfter.tap('uploadMorePlugin', (data, callback) =>{
                    console.log('插件回调1', data)
                    that.uploadDist()
                    callback('子插件的事情做完了')
                })
            })
        } else {
            compiler.plugin('compilation', (compilation) =>{
                that.compilation = compilation
                 // tapable的plugin方法，添加钩子，钩子添加compilation._plugins中
                compilation.plugin('uploadMorePluginAfter', (data, callback)=> {
                    console.log('插件回调2',data)
                    // 这里做uploadMorePluginAfter钩子的事情
                    // dosomething
                    that.uploadDist()
                    // 告诉uploadMore-plugin，我这里的业务走完了，执行uploadMore-plugin的回调
                    callback('子插件的事情做完了')

                  });
            })
        }
    }
    uploadDist () {
        let distPath = this.compilation.outputOptions.path
        return
        client.scp(distPath
            , this.option, err=>{
            if(!err) {
                console.log('项目发布成功')
            } else {
                console.log('项目发布失败')
            }
        })
    }
    
}
module.exports = SendDistPlugin