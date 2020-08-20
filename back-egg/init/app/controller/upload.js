'use strict';
// egg-oss
// https://www.jianshu.com/p/08d4a89d7148
// egg-multipart
// https://github.com/eggjs/egg-multipart
const path = require('path')
const fs = require('fs');
const Controller = require('egg').Controller;
const streamWormhole = require('stream-wormhole');
const { rejects } = require('assert');
const { delDir } = require('../util')
class UploadController extends Controller {
  async index() {
    // const { ctx } = this;
    // console.log('请求头',ctx.header)
    // const stream = await ctx.getFileStream()
    // let fileName = stream.filename
    // // console.log('文件信息', stream)
    // let target = path.resolve(__dirname, '../errMapStatic', fileName)
    // let result = await new Promise((resolve,reject) =>{
    //      // 创建写入流
    //     const writeStream = fs.createWriteStream(target)
    //     // 以管道的方式写入
    //     stream.pipe(writeStream)
    //     let errFlag = false
    //     writeStream.on('error', (err)=>{
    //         errFlag = true
    //         // 停止写入
    //         streamWormhole(stream)
    //         writeStream.destroy()
    //         reject(err)
    //     })
    //     writeStream.on('finish', () =>{
    //         if(errFlag) return
    //         resolve({
    //             fileName
    //         })
    //     })
    // })
   
    // ctx.body = {
    //     code: 0,
    //     data: result,
    //     msg: ''
    // }
    delDir(path.resolve(__dirname, '../errMapStatic'))
    console.log('执行的次数')
    const { ctx } = this;
    const parts = ctx.multipart();
    let part;
    while ((part = await parts()) != null) {
      if (part.length) {
        // arrays are busboy fields
        console.log('field: ' + part[0]);
        console.log('value: ' + part[1]);
        console.log('valueTruncated: ' + part[2]);
        console.log('fieldnameTruncated: ' + part[3]);
      } else {
        if (!part.filename) {
          // user click `upload` before choose a file,
          // `part` will be file stream, but `part.filename` is empty
          // must handler this, such as log error.
          continue;
        }
        // otherwise, it's a stream
        console.log('field: ' + part.fieldname);
        console.log('filename: ' + part.filename);
        console.log('encoding: ' + part.encoding);
        console.log('mime: ' + part.mime);
        let target = path.resolve(__dirname, '../errMapStatic',  part.filename)
        const writeStream = fs.createWriteStream(target)
       // 以管道的方式写入
        part.pipe(writeStream)
        // const result = await ctx.oss.put('egg-multipart-test/' + part.filename, part);
        // console.log(result);
      }
    }
    ctx.body={
        code:0
    }
  }
}

module.exports = UploadController;
