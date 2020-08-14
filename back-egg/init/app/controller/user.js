
'use strict';

const Controller = require('egg').Controller;

class RegisterController extends Controller {
  async getCode() {
    const { ctx } = this;
    let captcha = ctx.service.tool.captcha()
    ctx.session.captcha = captcha.text.toLocaleLowerCase()
    ctx.response.type = 'image/svg+xml'
    ctx.body = captcha.data

  }
}

module.exports = RegisterController;
