'use strict';

const Service = require('egg').Service;
const _ = require('lodash');
const { calPwd, calToken } = require('../common/util');


class UserService extends Service {
  /**
   * 注册
   * @param {Object} user 对象
   */
  async register(user) {
    const password = calPwd(user.password);

    const [ id ] = await this.ctx.trx('user')
      .insert(Object.assign(user, { password }));

    return Object.assign(user, { id });
  }

  /**
   * 登录
   * @param {String} username 用户名
   * @param {String} password 密码
   * @param {String} client_id 客户端ID
   */
  async login(username, password, client_id) {
    const { ctx, app } = this;

    password = calPwd(password);
    const [ user = {} ] = await app.knex('user')
      .where({
        username, password, status: 'E',
      });

    if (_.isEmpty(user)) {
      throw new app.Msg(1000);
    }

    // 创建token
    const token = calToken(user.id),
      userToken = { user_id: user.id, client_id, token };
    await ctx.trx('user_token').insert(userToken);

    return {
      user, userToken,
    };
  }
}

module.exports = UserService;
