'use strict';

module.exports = app => {
  const { router, controller } = app;
  // 文件上传
  router.post('/file/upload', controller.file.upload);
  // 文件下载
  router.get('/file/download/:fileId', controller.file.download);
};
