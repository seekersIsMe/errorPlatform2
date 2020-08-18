'use strict';
const path = require('path')
const fs = require('fs');
const Controller = require('egg').Controller;
const streamWormhole = require('stream-wormhole');
const { rejects } = require('assert');
class UploadController extends Controller {
  async index() {
    const { ctx } = this;
    console.log('请求头',ctx.header)
    const stream = await ctx.getFileStream()
    let fileName = stream.filename
    // console.log('文件信息', stream)
    let target = path.resolve(__dirname, '../public', fileName)
    let result = await new Promise((resolve,reject) =>{
         // 创建写入流
        const writeStream = fs.createWriteStream(target)
        // 以管道的方式写入
        stream.pipe(writeStream)
        let errFlag = false
        writeStream.on('error', (err)=>{
            errFlag = true
            // 停止写入
            streamWormhole(stream)
            writeStream.destroy()
            reject(err)
        })
        writeStream.on('finish', () =>{
            if(errFlag) return
            resolve({
                fileName
            })
        })
    })
   
    ctx.body = {
        code: 0,
        data: result,
        msg: ''
    }
  }
}

module.exports = UploadController;
