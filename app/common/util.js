'use strict';

const crypto = require('crypto');
const xml2js = require('xml2js');
const XLSX = require('xlsx');
const math = require('mathjs');
const _ = require('lodash');

module.exports = {
  calSignature(body = {}, timestamp, key) {
    const type = Object.prototype.toString.call(body);
    if (!Object.keys(body).length) body = '';
    else if (type === '[object Null]' || type === '[object Undefined]') {
      body = '';
    } else if (type === '[object Object]' || type === '[object Array]') {
      body = JSON.stringify(body);
    }

    const preMd5String = 'payload=' + body;
    console.log(preMd5String);
    return crypto.createHash('md5').update(preMd5String).digest('hex');
  },

  calPwd(password) {
    return crypto.createHash('md5')
      .update(password)
      .digest('hex')
      .toUpperCase();
  },

  calToken(userId) {
    return crypto.createHash('md5')
      .update(userId + '|' + Date.now())
      .digest('hex');
  },

  xmlParser: async source_res => {
    const parser = new xml2js.Parser({ trim: true, explicitArray: false, explicitRoot: false });
    return await parser.parseStringPromise(source_res);
  },

  xmlBuild: data => {
    const builder = new xml2js.Builder();
    return builder.buildObject(data);
  },

  wrapExcel: (excel_data, excel_parse = {}) => {
    const SheetNames = _.isEmpty(excel_parse) ?
        [ 'sheet1' ] :
        _.map(excel_parse, 'sheetName'),
      Sheets = _.map(excel_parse, 'data');

    Sheets[0] = excel_data;
    const workSheet = { SheetNames, Sheets: {} };
    Sheets.forEach((v, i) => {
      workSheet.Sheets[SheetNames[i]] = XLSX.utils.json_to_sheet(v);
    });
    return Buffer.from(XLSX.write(workSheet, {
      bookType: 'xlsx',
      bookSST: false,
      type: 'binary',
    }), 'binary');
  },

  decimal_add: (...number) => {
    return _.reduce(number, (sum, n) => {
      return math.add(math.bignumber(sum), math.bignumber(n)).toNumber();
    }, 0);
  },

  decimal_multi: (...number) => {
    return _.reduce(number, (sum, n) => {
      return math.multiply(math.bignumber(sum), math.bignumber(n)).toNumber();
    }, 1);
  },

  decimal_subtract: (subtractor, subtracted) => {
    return math.subtract(math.bignumber(subtractor), math.bignumber(subtracted)).toNumber();
  },

  decimal_divide: (divisor, dividend) => {
    return math.divide(math.bignumber(divisor), math.bignumber(dividend)).toNumber();
  },
};
