'use strict';

const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

class FileService extends Service {
  /**
   * 递归创建目录
   * @param {String} dirname 目录
   */
  mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
      return true;
    } else if (this.mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }

  /**
  * 保存文件信息
  * @param {String} filename 文件名
  * @param {String} filePath 文件路径
  * @param {String} extname 后缀
  */
  async saveFile(filename, filePath, extname) {
    const [ fileId ] = await this.ctx.trx('file').insert({
      filename, filePath, extname,
    });
    return { fileId };
  }

  /**
   * 读取文件
   * @param {Number} fileId 文件
   */
  async getFile(fileId) {
    const { app } = this;

    const [ fileRecord = {} ] = await app.knex('file').where('id', fileId);

    if (_.isEmpty(fileRecord)) {
      throw new app.Msg(10000);
    }

    return fileRecord;
  }
}

module.exports = FileService;
