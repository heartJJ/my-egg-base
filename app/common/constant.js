'use strict';

module.exports = {
  CONTENT_TYPE: {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.ico': 'image/x-icon',
    '.gif': 'image/gif',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.pdf': 'application/pdf',
    '.svg': 'image/svg+xml',
    '.swf': 'application/x-shockwave-flash',
    '.tiff': 'image/tiff',
    '.txt': 'text/plain',
    '.wav': 'audio/x-wav',
    '.wma': 'audio/x-ms-wma',
    '.wmv': 'video/x-ms-wmv',
    '.xml': 'text/xml',
    '.xlsx': 'application/octet-stream',
  },
  CLIENT_ID: [
    { val: '10000', name: 'web', key: 'abc$$&&cba' },
    { val: '10001', name: 'android', key: 'yy*&^%$zzk' },
    { val: '10002', name: 'wechat', key: 'jxs#4^*99x' },
  ],
  DIRECT_URL: [ // 可直接访问接口，不带任何参数
    { url: '/ping', method: 'GET' },
    { url: '/news', method: 'GET' },
  ],
  NO_AUTH_URL: [
    { url: '/register', method: 'POST' },
    { url: '/login', method: 'POST' },
  ],
};
