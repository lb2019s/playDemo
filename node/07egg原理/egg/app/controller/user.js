'use strict';

const { Controller } = require('egg')

class UserController extends Controller {
  async index () {
    // this.ctx.body = [
    //   {
    //     name: '王五'
    //   }
    // ]
    const { ctx } = this
    ctx.body = await ctx.service.user.getAll()
  }
}

module.exports = UserController