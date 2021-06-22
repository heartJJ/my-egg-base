'use strict';

module.exports = () => {
  return async function pagination(ctx, next) {
    const { Page = 1, PageSize = 20, SortBy = 'default', SortOrder = 'desc' } = ctx.query;
    const page = parseInt(Page) < 1 ? 1 : parseInt(Page);
    const pageSize = parseInt(PageSize) < 1 ? 1 : parseInt(PageSize);
    // const sortBy = [ 'default', 'DEFAULT', 'CJSJ' ].includes(SortBy) ? 'createTime' : SortBy.trim();
    // const sortOrder = [ 'desc', 'asc', 'DESC', 'ASC' ].includes(SortOrder) ? SortOrder.toUpperCase() : 'DESC';

    ctx.query.pagination = {
      offset: (page - 1) * pageSize,
      limit: pageSize,
      // order: [[ sortBy, sortOrder ]],
      // orderBy: [[ sortBy, sortOrder ]],
    };
    await next();
  };
};
