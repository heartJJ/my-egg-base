'use strict';

const { CONTENT_TYPE } = require('../common/constant');
const _ = require('lodash');

module.exports = (options, app) => {
  return async function wrapRes(ctx, next) {
    try {
      ctx.start_time = Date.now(); // 起始时间

      /**
       * koa reponse set body 方法中，会将 status 统一置为200 (即调用 ctx.body = )，
       * 导致 404 等异常 code 码无法被正确体现
       * 将 _explicitStatus 属性置为 true, 可避免这一现象
       */
      // ctx.response._explicitStatus = true;

      await next();

      if (!ctx.body) {
        ctx.body = {};
      }

      const type = ctx.body.type || 'json';

      const common_logger = {
        user_id: (ctx.user || {}).GUID || 0,
        time_consume: Date.now() - ctx.start_time,
        ip: ctx.request.ip,
        request: ctx.request,
      };

      // 处理文件
      if (type === 'file') {
        common_logger.response = _.pick(ctx.body, [ 'file_name', 'url' ]);

        const { data, extname } = ctx.body;
        ctx.body = data;
        ctx.set('Content-Type', CONTENT_TYPE[extname]);

      } else if (type === 'excel') { // 处理excel
        const { buf, excel_name } = ctx.body;

        common_logger.response = `${excel_name}.xlsx`;

        ctx.body = buf;
        ctx.set({
          'Content-Type': 'application/octet-stream',
          'Content-Disposition': `attachment; filename=${encodeURI(excel_name)}.xlsx`,
        });

      } else if (type === 'xml') {

        ctx.body = ctx.body.xml;
        ctx.set({
          'Content-Type': 'application/xml',
        });

      } else { // json返回
        if (ctx.request.method !== 'HEAD') { // header请求不打日志，健康检查
          Object.assign(common_logger, {
            payload: ctx.query.payload || {},
            body: ctx.request.body || {},
            response: ctx.body,
          });
        }

        ctx.body = {
          Code: 0, Message: '操作成功', Result: ctx.body || {},
        };
      }

      ctx.logger.info(common_logger);

    } catch (error) {
      ctx.logger.error({
        user_id: (ctx.user || {}).GUID || 0,
        time_consume: Date.now() - ctx.start_time,
        ip: ctx.request.ip,
        payload: ctx.query.payload || {},
        body: ctx.request.body || {},
        request: ctx.request,
        error,
      });

      // 非自定义错误，统一报-20000
      const Code = error.constructor.name === 'Msg' ? error.code : -20000;
      ctx.body = {
        Code, Message: error.message, Result: {},
      };
    }
  };
};
