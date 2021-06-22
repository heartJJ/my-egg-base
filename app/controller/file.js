'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const dayjs = require('dayjs');


// const _mkdirsSync = dirname => {
//   if (fs.existsSync(dirname)) {
//     return true;
//   } else if (_mkdirsSync(path.dirname(dirname))) {
//     fs.mkdirSync(dirname);
//     return true;
//   }
// };

class FileController extends Controller {

  async upload() {
    const { ctx } = this,
      { file } = ctx.service,
      Timestamp = Number(ctx.request.query.Timestamp);
    const stream = await ctx.getFileStream({ requireFile: false });

    const filePath = path.join(__dirname, '../../upload/', dayjs(Timestamp).format('YYYY/MM/DD')),
      filename = path.basename(stream.filename),
      extname = path.extname(filename);

    // 创建目录
    file.mkdirsSync(filePath);
    const writerStream = fs.createWriteStream(`${filePath}/${filename}`);
    stream.pipe(writerStream);
    // writerStream.write(stream);
    // writerStream.end();
    ctx.body = await file.saveFile(filename, filePath, extname);
  }

  async download() {
    const { ctx } = this,
      { file } = ctx.service,
      fileId = ctx.params.fileId;

    const { filename, filepath, extname } = await file.getFile(fileId);
    ctx.body = {
      type: 'file',
      data: fs.readFileSync(`${filepath}/${filename}`),
      extname,
    };
  }
}

module.exports = FileController;
