'use strict';

const { CLIENT_ID, NO_AUTH_URL, DIRECT_URL } = require('../common/constant');
const { calSignature } = require('../common/util');

module.exports = (options, app) => {
  return async function auth(ctx, next) {
    const { ClientId, Timestamp, Signature, Token } = ctx.query;

    // 是否直接跳过
    const url = ctx.url.split('?')[0];
    ctx.split_url = url;
    const directFlag = DIRECT_URL.find(v => v.url === url && v.method === ctx.method);
    if (!directFlag) {

      // 验证客户端
      const client = CLIENT_ID.find(v => v.val === ClientId);
      if (!client) {
        throw new app.Msg(100);
      }

      // 校验请求时间
      if (Timestamp - Date.now() > app.config.effectTime * 60000) {
        throw new app.Msg(100);
      }

      // 校验签名
      const url = ctx.url.split('?')[0];
      const authFlag = !NO_AUTH_URL.find(v => v.url === url && v.method === ctx.method);
      if (authFlag) {
        const param = ctx.method === 'GET' ?
          JSON.parse(ctx.query.payload || '{}') :
          (ctx.header['content-type'] || '').indexOf('multipart/form-data') !== -1 ?
            {} :
            ctx.request.body;

        const serverSignature = calSignature(param, Timestamp, client.key);
        if (serverSignature !== Signature) {
          throw new app.Msg(100);
        }

        // 获取用户
        const [ token ] = await app.knex('user_token')
          .where('token', Token);
        if (!token) {
          throw new app.Msg(200);
        }

        const [ user ] = await app.knex('user')
          .where('id', token.user_id)
          .where('status', 'E');
        if (!user) {
          throw new app.Msg(10001);
        }

        ctx.user = user;
      }
    }

    await next();
  };
};

