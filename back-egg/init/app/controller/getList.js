const Controller = require('egg').Controller

module.exports = class ListContoller extends Controller {
    async index () {
        const {ctx} = this
        ctx.body = {
            code: 0,
            msg: '请求成功',
            data: {
                list: [
                    {
                        name: '水果'
                    },
                    {
                        name: '蔬菜'
                    }
                ]
            }
        }
    }
}