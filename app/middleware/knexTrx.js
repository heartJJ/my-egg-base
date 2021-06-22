'use strict';

module.exports = (options, app) => {
  return async function knexTrx(ctx, next) {
    // get 请求不要事务
    if (ctx.method && ctx.method === 'GET') {
      await next();
    } else {
      const trx = await ctx.app.knex.transaction();
      try {
        ctx.trx = trx;
        await next();
        await trx.commit();
      } catch (error) {
        await trx.rollback();
        throw error;
      }
    }

  };
};

