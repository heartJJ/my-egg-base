'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/ping', controller.home.index);
  router.get('/news', controller.news.list);
};
