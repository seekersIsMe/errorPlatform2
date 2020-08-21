const Controller = require('egg').Controller
class GeterrController extends Controller {
    async index(){
        let {ctx} = this
        //  message,
        // errType: name,
        // stack
        let params = ctx.request.body
        console.log('报错请求参数',params)
        ctx.body = {
            code: 0,
            msg: '报错收集成功'
        }
    }
}   
module.exports = GeterrController