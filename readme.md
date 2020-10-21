
> 成熟的前端监控系统有sentry、bugsnag

### 后端
* 登陆验证，token
* 文件上传（批量文件上传）
* 解析source-map
* 重复的报错不存数据库，存数据库前查询有没有该报错，前端做错误收集，放到一个数组中，并且做去重

### 前端
* webpack文件上传插件
* 通过scp2上传dist打包文件到静态服务器
* 通过Vue.config.errorHandler监听vue报错


### koa
* koa解决的问题
 1. 令人困惑的request和response(res.end，res.writeHead), 原生的api不够优雅
 2. 复杂的业务逻辑，包括流程描述、切面描述Aop(例如用户进来之前要鉴权，走之后要写日志)
* koa中间件机制，洋葱圈模型
