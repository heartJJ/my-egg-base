'use strict';
const XLSX = require('xlsx'),
  path = require('path'),
  { wrapExcel } = require('../common/util'),
  _ = require('lodash');

module.exports = () => {
  return async function excelParse(ctx, next) {
    let filepath = '';

    // 校验excel是否可解析
    const content_type = ctx.request.headers['content-type'] || '';
    if (content_type.indexOf('multipart/form-data') !== -1) {
      const file = ctx.request.files[0],
        ext_name = path.extname(file.filename);

      if ([ '.xlsx', '.xls' ].includes(ext_name)) {
        filepath = file.filepath;
      }
    }

    // 解析完整的excel数据，存放在 ctx.params.excel_parse 对象中
    if (filepath) {
      const workSheetArr = XLSX.readFile(filepath, { cellDates: true });
      ctx.params.excel_parse = workSheetArr.SheetNames.map(v => {
        return {
          sheetName: v,
          data: XLSX.utils.sheet_to_json(workSheetArr.Sheets[v], { raw: true, defval: '' }),
        };
      });

      // 读取sheet1数据，赋值给 ctx.params.excel_data 属性
      ctx.params.excel_data = (ctx.params.excel_parse[0] || {}).data || [];
      if (ctx.params.excel_data.length === 0) {
        throw new ctx.app.Msg(700);
      }
    }

    await next();

    // 需要回写excel
    if (!_.isEmpty(ctx.params.excel_write)) {
      const { excel_data, excel_name } = ctx.params.excel_write,
        buf = wrapExcel(excel_data, ctx.params.excel_parse);

      ctx.body = {
        type: 'excel', buf, excel_name,
      };
    }
  };
};
