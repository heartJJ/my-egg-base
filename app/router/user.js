'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.post('/register', controller.user.register);
  router.post('/login', controller.user.login);
  // router.post('/logout', controller.user.logout);
  // router.get('/user/list', controller.user.getUserList);
};
