'use strict';
const argv = require('yargs').argv;
require('dotenv').config({
  path: argv.env,
});
const env = process.env;
const path = require('path');

module.exports = appInfo => {
  return {
    security: {
      csrf: false,
      ignoreJSON: true,
    },

    // Cookie 安全字符串
    keys: '1559012916112_lll',
    // outputJSON: true,
    // 模板配置
    view: {
      defaultViewEngine: 'nunjucks',
      mapping: {
        '.tpl': 'nunjucks',
      },
    },

    // 添加 news 的配置项
    news: {
      pageSize: 5,
      serverUrl: 'https://hacker-news.firebaseio.com/v0',
    },

    // 中间件配置
    middleware: [
      'wrapRes',
      'auth',
      'knexTrx',
    ],

    knex: {
      // database configuration
      client: {
        // database dialect
        dialect: 'mysql',
        connection: {
          // host
          host: env.MYSQL_HOST,
          // port
          port: env.MYSQL_PORT,
          // username
          user: env.MYSQL_USER,
          // password
          password: env.MYSQL_PASSWORD,
          // database
          database: env.MYSQL_DATABASE,
        },
        // connection pool
        pool: { min: Number(env.MYSQL_POOL_MIN), max: Number(env.MYSQL_POOL_MAX) },
        // acquire connection timeout, millisecond
        acquireConnectionTimeout: Number(env.MYSQL_IDLETIME),
      },
      // load into app, default is open
      app: true,
      // load into agent, default is close
      agent: false,
    },

    multipart: {
      fileSize: '20mb',
      fileExtensions: [
        '.lrf',
        '.pdf',
        '.apk',
        '.exe',
        '.xlsx',
        '.xls',
        '.docx',
        '.doc',
        '.csv',
        '.mov',
        '.amr',
        '.txt',
        '.hlp',
        '.wps',
        '.rtf',
        '.ppt',
        '.pptx',
        '.arj',
        '.z',
        '.wav',
        '.aif',
        '.au',
        '.ram',
        '.wma',
        '.mmf',
        '.aac',
        '.flac',
        '.navi',
        '.mpge',
        '.avi',
        '.mpg',
        '.swf',
        '.mp4',
        '.fr3',
      ],
      // mode: 'file',
    },

    cors: {
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
      exposeHeaders: [ 'content-disposition' ],
    },

    // 中间件支持xml
    bodyParser: {
      enableTypes: [ 'json', 'form', 'text', 'xml' ],
      extendTypes: {
        text: [ 'text/xml', 'application/xml' ],
      },
    },

    effectTime: 60, // 请求有效时间
  };
};
