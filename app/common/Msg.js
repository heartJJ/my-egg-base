'use strict';

const _ = require('lodash');
const msg_zh_cn = require('./myMsg');

/**
 * 定义msg
 */
class Msg extends Error {
  constructor(code = 0, params = {}) {
    let errMsg = _.get(msg_zh_cn, Math.abs(code), '');
    errMsg = Object.keys(params).reduce((p, c) => {
      return p.replace(new RegExp(`\\$\\{${c}\\}`, 'gm'), params[c]);
    }, errMsg);

    super(errMsg);
    this.code = -1 * Math.abs(code);
    this.params = params;
  }

  get [Symbol.toStringTag]() {
    return 'Msg';
  }
}

module.exports = Msg;
