import Router from 'koa-router';
import * as userController from './user.controller';
import { AppContext } from '@/types/context';
import { Context } from 'koa';
import { jwtAuth } from '../auth';

const userRouter = new Router<Context, AppContext>({ prefix: '/api/user'});

userRouter.use(jwtAuth(['user', 'editor', 'admin']))

userRouter
  .post('/', userController.createUser)
  .get('/:id', userController.getUser)
  .put('/:id', userController.updateUser)
  .delete('/:id', userController.deleteUser);

export default userRouter;