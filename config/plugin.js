'use strict';
const path = require('path');

exports.nunjucks = {
  enable: false,
  package: 'egg-view-nunjucks',
};

exports.knex = {
  enable: true,
  package: 'egg-knex',
};

exports.routerPlus = {
  enable: true,
  package: 'egg-router-plus',
};

exports.ua = {
  enable: true,
  path: path.join(__dirname, '../lib/plugin/egg-ua'),
};

exports.cors = {
  enable: true,
  package: 'egg-cors',
};

exports.validate = {
  enable: true,
  package: 'egg-validate',
};
