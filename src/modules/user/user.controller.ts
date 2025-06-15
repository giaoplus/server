import { Context } from 'koa';
import userService from './user.service';
import { User } from './user.types';

class UserController {
  async createUser(ctx: Context) {
    const user = ctx.request.body as User;
    const newUser = await userService.createUser(user);
    ctx.success(newUser, 200);
  }
  async getUser(ctx: Context) {
    const userId = ctx.params.id;
    const user = await userService.getUserById(userId);
    ctx.success(user, 200);
  }
  async updateUser(ctx: Context) {
    const userId = ctx.params.id;
    const user = ctx.request.body as User;
    const updatedUser = await userService.updateUser(userId, user); 
    ctx.success(updatedUser, 200);
  }
  async deleteUser(ctx: Context) {
    const userId = ctx.params.id;
    await userService.deleteUser(userId);
    ctx.success(true, 200);
  }
}

export default new UserController();