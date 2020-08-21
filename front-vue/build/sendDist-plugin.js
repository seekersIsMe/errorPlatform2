const uploadMorePlugin = require('./uploadMore-plugin')
class SendDistPlugin {
    constructor (option) {
        this.option = option
    }
    apply(compiler) {
        if (compiler.hooks) {
            compiler.hooks.compilation.tap('SendDistPlugin', (compilation) =>{
                compilation.hooks.uploadMorePluginAfter.tap('uploadMorePlugin', (data, cb) =>{
                    // console.log('插件回调1', data)
                    cb(null, data)
                  })
            })
        } else {
            compiler.plugin('compilation', (compilation) =>{
                // console.log('插件compilation', compilation)
                compilation.plugin('uploadMorePluginAfter', (data, callback)=> {
                    console.log('插件回调2',data)
                    callback(null, data);
                  });
            })
        }
    }
}
module.exports = SendDistPlugin