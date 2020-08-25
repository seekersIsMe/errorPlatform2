
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