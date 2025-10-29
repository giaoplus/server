import { AppContext } from '@/types/context';
import * as userService from './user.service';
import { User, CreateUserDTO } from './user.types';

export async function createUser(ctx: AppContext) {
  const user = ctx.request.body as CreateUserDTO;
  const newUser = await userService.createUser(user);
  ctx.success(newUser, 200);
}
export async function getUser(ctx: AppContext) {
  const userId = ctx.params.id;
  const user = await userService.getUserById(userId);
  ctx.success(user, 200);
}
export async function updateUser (ctx: AppContext) {
  const userId = ctx.params.id;
  const user = ctx.request.body as User;
  const updatedUser = await userService.updateUser(userId, user); 
  ctx.success(updatedUser, 200);
}
export async function deleteUser(ctx: AppContext) {
  const userId = ctx.params.id;
  await userService.deleteUser(userId);
  ctx.success(true, 200);
}