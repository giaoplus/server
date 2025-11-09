import sql from '@/utils/db';
import { Role, Menu, UpdateMenu, MenuPermission, RoleMenuPermission } from './sys.types'

// 查询角色列表
export async function getRoles(): Promise<Role []> {
  return await sql`
    SELECT * FROM public.sys_role
  `
}

// 创建菜单
export async function createMenu(menu: Menu): Promise<Menu> {
  const menus = await sql`
    INSERT INTO public.sys_menu (name, parent_id, group_id, order_num, remark, path, component, type, status, icon)
    VALUES (${menu.name}, ${menu.parentId || null}, ${menu.groupId || null}, ${menu.orderNum}, ${menu.remark || null}, ${menu.path}, ${menu.component}, ${menu.type}, ${menu.status}, ${menu.icon || null})
    RETURNING *
  `

  return menus[0] as Menu
}

// 更新菜单
export async function updateMenu(menu: UpdateMenu): Promise<Menu> {
  const item =  await sql`
    UPDATE public.sys_menu SET
      name = ${menu.name},
      parent_id = ${menu.parentId || null},
      group_id = ${menu.groupId || null},
      order_num = ${menu.orderNum},
      path = ${menu.path},
      component = ${menu.component || null},
      status = ${menu.status},
      type = ${menu.type},
      icon = ${menu.icon || null},
      remark = ${menu.remark || null},
      WHERE id = ${menu.id} RETURNING *
  `

  return item[0] as Menu
}

// 删除菜单
export async function deleteMenu(id: string) {
  return await sql`
    DELETE FROM public.sys_menu WHERE id = ${id} RETURNING *
  `
}

// 查询菜单(树形结构、附带菜单权限)
export async function getAllMenus() {
  return await sql`
    SELECT public.sys_menu.*, STRING_AGG(public.sys_menu_permissions.permissions, ',') as permissions
      FROM public.sys_menu 
      LEFT JOIN public.sys_menu_permissions ON public.sys_menu.id = public.sys_menu_permissions.menu_id 
      GROUP BY public.sys_menu.id
      ORDER BY public.sys_menu.order_num ASC;
  `
}

// 创建菜单权限
export async function createMenuPermissions(data: MenuPermission): Promise<MenuPermission> {
  const items = await sql`
    INSERT INTO public.sys_menu_permissions (menu_id, status, permissions, name, remark)
    VALUES (${data.menuId}, ${data.status || 1}, ${data.permissions}, ${data.name}, ${data.remark || null})
    RETURNING *
  `

  return items[0] as MenuPermission
}

// 删除菜单权限
export async function deleteMenuPermissions(id: string) {
  return await sql`
    DELETE FROM public.sys_menu_permissions WHERE id = ${id} RETURNING *
  `
}

// 更新菜单权限
export async function updateMenuPermissions(data: MenuPermission): Promise<MenuPermission> {
  const items = await sql`
    UPDATE public.sys_menu_permissions SET
    name = ${data.name},
    remark = ${data.remark || null},
    menu_id = ${data.menuId},
    status = ${data.status},
    permissions = ${data.permissions},
    RETURNING *
  `

  return items[0] as MenuPermission
}

export async function getMenuPermissions(id: string) {
  return await sql`
    SELECT * FROM public.sys_menu_permissions WHERE menu_id = ${id} ORDER BY order_num ASC
  `
}

// 关联角色与菜单
export async function createRoleMenus(data: RoleMenuPermission) {
  const menus = await sql`
    SELECT * from public.sys_role_menu_permissions WHERE role_id = ${data.roleId} AND menu_id = ${data.menuId}
  `
  
  if (!menus[0]) {
    return await sql`
      INSERT INTO public.sys_role_menu_permissions (role_id, menu_id, permissions)
      VALUES (${data.roleId}, ${data.menuId}, ${data.permissions || null}) RETURNING *
    `
  } else {
    throw new Error('当前角色已经绑定该菜单')
  }
}

// 删除角色与菜单关联关系
export async function deleteRoleMenu(data: RoleMenuPermission) {
  return await sql`
    DELETE FROM public.sys_role_menu_permissions WHERE role_id = ${data.roleId} AND menu_id = ${data.menuId} RETURNING *
  `
}

// 获取角色菜单列表（附带菜单权限）
export async function getRoleMenus(roleId: string) {
  return await sql`
    SELECT * FROM public.sys_role_menu_permissions 
      LEFT JOIN public.sys_menu ON public.sys_role_menu_permissions.menu_id = public.sys_menu.id
      WHERE role_id = ${roleId}
  `
}
