
'use strict';

const Controller = require('egg').Controller;
const md5 = require('md5')
class LoginController extends Controller {
  async index() {
    const { ctx, app } = this;
    let {name, psw, code} = ctx.request.body
    let ishasName = await ctx.model.User.findOne({name})
    if(!ishasName) {
        ctx.body = {
            code: 1,
            msg: '用户名错误'
        }
        return
    }
    let ishasPsw = await ctx.model.User.findOne({name, psw: md5(psw)})
    if(!ishasPsw) {
        ctx.body = {
            code: 1,
            msg: '密码错误'
        }
        return
    }
    if(code.toLocaleLowerCase() !== ctx.session.captcha) {
        ctx.body = {
            code: 1,
            msg: '验证码错误'
        }
        return
    }
    // 生成token
    let token = app.jwt.sign({
        name,
        id: ishasPsw._id
    }, app.config.jwt.secret,
    {
        expiresIn: '60s'
    })
    ctx.body = {
        code: 0,
        msg: '登录成功',
        data: {
            token
        }
    }
  }
}

module.exports = LoginController;
