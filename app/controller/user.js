'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  // 注册
  async register() {
    const ctx = this.ctx,
      { user = {} } = ctx.request.body;

    ctx.validate({
      username: 'string',
      password: 'string',
      phone: 'string',
    }, user);

    ctx.body = await ctx.service.user.register(user);
  }

  // 登录
  async login() {
    const ctx = this.ctx,
      { user = {} } = ctx.request.body;

    ctx.validate({
      username: 'string',
      password: 'string',
    }, user);

    ctx.body = await ctx.service.user.login(user.username, user.password, ctx.query.ClientId);
  }

}

module.exports = UserController;
