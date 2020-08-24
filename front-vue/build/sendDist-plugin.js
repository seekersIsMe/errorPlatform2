const uploadMorePlugin = require('./uploadMore-plugin')
class SendDistPlugin {
    constructor (option) {
        this.option = option
    }
    apply(compiler) {
        if (compiler.hooks) {
            compiler.hooks.compilation.tap('SendDistPlugin', (compilation) =>{
                uploadMorePlugin.getHooks(compilation).uploadMorePluginAfter.tap('uploadMorePlugin', (data, callback) =>{
                    console.log('插件回调1', data)

                    callback('子插件的事情做完了')
                })
            })
        } else {
            compiler.plugin('compilation', (compilation) =>{
                 // tapable的plugin方法，添加钩子，钩子添加compilation._plugins中
                compilation.plugin('uploadMorePluginAfter', (data, callback)=> {
                    console.log('插件回调2',data)
                    // 这里做uploadMorePluginAfter钩子的事情
                    // dosomething
                    // 告诉uploadMore-plugin，我这里的业务走完了，执行uploadMore-plugin的回调
                    callback('子插件的事情做完了')

                  });
            })
        }
    }
    
}
module.exports = SendDistPlugin