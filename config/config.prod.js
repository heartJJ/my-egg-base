'use strict';
const argv = require('yargs').argv;
require('dotenv').config({
  path: argv.env,
});
const env = process.env;

const path = require('path');

module.exports = appInfo => {
  return {
    logger: {
      dir: path.join(appInfo.baseDir, '../logs/my-egg-base'),
      outputJSON: true,
    },

    customLogger: {
      knex: {
        file: path.join(appInfo.baseDir, '../logs/my-egg-base/logs/egg-knex.log'),
      },
    },

    // 注意，开启此模式后，应用就默认自己处于反向代理之后，
    // 会支持通过解析约定的请求头来获取用户真实的 IP，协议和域名。
    // 如果你的服务未部署在反向代理之后，请不要开启此配置，以防被恶意用户伪造请求 IP 等信息。
    proxy: true,

    effectTime: 1 // 请求有效时间
  };
};
