'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const jwt = app.middleware.jwt({app}) 
  
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/login', controller.login.index);
  router.post('/register', controller.register.index);
  router.get('/user/getcode', controller.user.getCode);
  router.get('/getList',jwt, controller.getList.index);
  router.post('/upload', controller.upload.index);
  router.post('/senderr', controller.senderr.index);
};
