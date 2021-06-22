'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    console.log('is IOS', this.ctx.isIOS);
    this.ctx.body = 'Hello, this is my egg base server';
  }
}

module.exports = HomeController;
