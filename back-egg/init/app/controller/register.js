
'use strict';

const Controller = require('egg').Controller;
const md5 = require('md5')
class RegisterController extends Controller {
  async index() {
    const { ctx } = this;
    console.log(ctx.request.body)
    let params = ctx.request.body
    let name = await ctx.model.User.findOne({
        name: params.name
    })
    let email = await ctx.model.User.findOne({
        email: params.email
    })
    console.log('name', name)
    if(name) {
        ctx.body = {
            code: 1,
            msg: '用户名重复'
        };
        return
    }
    if(email) {
        ctx.body = {
            code: 1,
            msg: '邮箱重复'
        };
        return
    }
    if(ctx.session.captcha !== params.code.toLocaleLowerCase()) {
        ctx.body = {
            code: 1,
            msg: '验证码错误'
        };
        return
    }
    let obj = {
        name: params.name,
        email: params.email,
        psw: md5(params.psw)
    }
    await ctx.model.User.create(obj)
    ctx.body = {
        code: 0,
        msg: '注册成功'
    };
  }
}

module.exports = RegisterController;
