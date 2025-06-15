import Router from 'koa-router';
import userController from './user.controller';

const userRouter = new Router({ prefix: '/api/user'});

userRouter
  .post('/', userController.createUser)
  .get('/:id', userController.getUser)
  .put('/:id', userController.updateUser)
  .delete('/:id', userController.deleteUser);

export default userRouter;