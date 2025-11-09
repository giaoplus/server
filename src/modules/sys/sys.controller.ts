import { AppContext } from '@/types/context';
import * as sysService from './sys.service'
import { Menu, MenuPermission, RoleMenuPermission, UpdateMenu } from './sys.types';

// 查询菜单列表
export async function getMenuList(ctx: AppContext) {
  const newMenu = await sysService.getAllMenus()
  ctx.success(newMenu, 200)
}

// 创建菜单
export async function createMenu(ctx: AppContext) {
  const menu = ctx.request.body as Menu
  const newMenu = await sysService.createMenu(menu)
  ctx.success(newMenu, 200)
}

// 更新菜单
export async function updateMenu(ctx: AppContext) {
  const menu = ctx.request.body as UpdateMenu
  const newMenu = await sysService.updateMenu(menu)
  ctx.success(newMenu, 200)
}

// 删除菜单
export async function deleteMenu(ctx: AppContext) {
  const menuId = ctx.params.id;
  await sysService.deleteMenu(menuId)
  ctx.success(true, 200);
}

// 创建菜单权限
export async function createMenuPermissions(ctx: AppContext) {
  const menu = ctx.request.body as MenuPermission
  const newMenu = await sysService.createMenuPermissions(menu)
  ctx.success(newMenu, 200)
}

// 更新菜单权限
export async function updateMenuPermissions(ctx: AppContext) {
  const menu = ctx.request.body as MenuPermission
  const newMenu = await sysService.updateMenuPermissions(menu)
  ctx.success(newMenu, 200)
}

// 获取菜单权限
export async function getMenuPermissions(ctx: AppContext) {
  const id = ctx.params.id;
  const menuPermissions = await sysService.getMenuPermissions(id)
  ctx.success(menuPermissions, 200);
}

// 删除菜单权限
export async function deleteMenuPermissions(ctx: AppContext) {
  const id = ctx.params.id;
  await sysService.deleteMenuPermissions(id)
  ctx.success(true, 200);
}

// 关联角色与菜单
export async function createRoleMenus(ctx: AppContext) {
  const data = ctx.request.body as RoleMenuPermission;
  const relations = await sysService.createRoleMenus(data)
  ctx.success(relations, 200);
}

// 删除角色与菜单关联
export async function deleteRoleMenu(ctx: AppContext) {
  const data = ctx.request.body as RoleMenuPermission;
  await sysService.deleteRoleMenu(data)
  ctx.success(true, 200);
}
