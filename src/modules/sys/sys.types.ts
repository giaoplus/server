// 角色
export interface Role {
  id: string;
  name: string;
  remark?: string;
  status: number;
  type: number;
}

// 菜单
export interface Menu {
  id?: string;
  createdAt: string;
  name: string;
  parentId?: string,
  groupId?: string;
  orderNum: number;
  path: string;
  component: string;
  status: number;
  type: number;
  icon?: string;
  remark?: string;
  permissions?: string;
}

// 更新菜单
export interface UpdateMenu {
  id: string;
  name: string;
  parentId?: string,
  groupId?: string;
  orderNum: number;
  path: string;
  component: string;
  status: number;
  type: number;
  icon?: string;
  remark?: string;
}

// 菜单操作权限
export interface MenuPermission {
  id?: string,
  menuId: string;
  status: number;
  permissions: string;
  name: string;
  remark?: string;
}

// 角色菜单关系
export interface RoleMenuPermission {
  id?: string;
  roleId: string;
  menuId: string;
  permissions?: string;
}
