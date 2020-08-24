const Controller = require('egg').Controller
const sourceMap = require('source-map')
const path = require('path')
const glob = require('glob')
const fs = require('fs')
class GeterrController extends Controller {
    async index(){
        let {ctx} = this
        //  message,
        // errType: name,
        // stack
        let params = ctx.request.body
        console.log('报错请求参数',params)
        let {stack, message, errType } = params
        
        let stackAry = stack.split('\n')
        let stack1 = stackAry[1].match(/\((.+?)\)/g)[0].slice(1,-1)
        let stackDat = stack1.split(':')
        let line = stackDat[3]
        let col = stackDat[4]
        let url = stackDat[0]+ ':' + stackDat[1] + ':' + stackDat[2]
        let fileName = path.basename(url)
        console.log(fileName)
        console.log(line)
        console.log(col)
        let fileUrl = path.resolve(__dirname, `../errMapStatic/${fileName}.map`)
        let mapFile = await fs.readFileSync(fileUrl)
        let result = ''
        try {
            await sourceMap.SourceMapConsumer.with(mapFile.toString(), null, consumer=>{
                // console.log('消费者',consumer.sources);
                // console.log('报错',consumer.originalPositionFor({
                //     line: Number(line),
                //     column: Number(col)
                // }));
                result = consumer.originalPositionFor({
                    line: Number(line), // 必须是数字
                    column: Number(col)
                })
                console.log('报错',result)
                // resolve(result)
            })
            ctx.body = {
                code: 0,
                data: result,
                msg: '报错收集成功'
            }
        } catch (error) {
            ctx.body = {
                code: 1,
                msg: '解析错误'
            }
        }
    }
}   
module.exports = GeterrController