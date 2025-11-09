import Router from 'koa-router';
import * as sysController from './sys.controller'
import { AppContext } from '@/types/context';
import { Context } from 'koa';
import { jwtAuth } from '../auth';


const sysRouter = new Router<Context, AppContext>({ prefix: '/api/sys'});

sysRouter.use(jwtAuth(['admin']))

/**
 * @swagger
 * tags:
 *   name: System
 *   description: 系统管理相关接口
 */

/**
 * @swagger
 * /api/sys/menu:
 *   get:
 *     summary: 获取菜单列表
 *     tags: [System]
 *     responses:
 *       200:
 *         description: 菜单列表
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
sysRouter.get('/menu', sysController.getMenuList);

/**
 * @swagger
 * /api/sys/menu:
 *   post:
 *     summary: 创建菜单
 *     tags: [System]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               parentId:
 *                 type: string
 *               groupId:
 *                 type: string
 *               orderNum:
 *                 type: integer
 *               path:
 *                 type: string
 *               component:
 *                 type: string
 *               status:
 *                 type: integer
 *               type:
 *                 type: integer
 *               icon:
 *                 type: string
 *               remark:
 *                 type: string
 *     responses:
 *       200:
 *         description: 创建成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 name:
 *                   type: string
 *                 parentId:
 *                   type: string
 *                 groupId:
 *                   type: string
 *                 orderNum:
 *                   type: integer
 *                 path:
 *                   type: string
 *                 component:
 *                   type: string 
 *                 status:
 *                   type: integer
 *                 type:
 *                   type: integer
 *                 icon:
 *                   type: string
 *                 remark:
 *                   type: string
 */
sysRouter.post('/menu', sysController.createMenu);

/**
 * @swagger
 * /api/sys/menu:
 *   put:
 *     summary: 更新菜单
 *     tags: [System]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               parentId:
 *                 type: string
 *               groupId:
 *                 type: string
 *               orderNum:
 *                 type: integer
 *               path:
 *                 type: string
 *               component:
 *                 type: string
 *               status:
 *                 type: integer
 *               type:
 *                 type: integer
 *               icon:
 *                 type: string
 *               remark:
 *                 type: string
 *     responses:
 *       200:
 *         description: 更新成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 name:
 *                   type: string
 *                 parentId:
 *                   type: string
 *                 groupId:
 *                   type: string
 *                 orderNum:
 *                   type: integer
 *                 path:
 *                   type: string
 *                 component:
 *                   type: string
 *                 status:
 *                   type: integer
 *                 type:
 *                   type: integer
 *                 icon:
 *                   type: string
 *                 remark:
 *                   type: string
 */
sysRouter.put('/menu', sysController.updateMenu)

/**
 * @swagger
 * /api/sys/menu:
 *   delete:
 *     summary: 删除菜单
 *     tags: [System]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 菜单ID
 *     responses:
 *       200:
 *         description: 删除成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time                  
 *                 name:    
 *                   type: string
 *                 parentId:
 *                   type: string
 *                 groupId:
 *                   type: string
 *                 orderNum:
 *                   type: integer
 *                 path:
 *                   type: string
 *                 component:
 *                   type: string
 *                 status:
 *                   type: integer
 *                 type:
 *                   type: integer
 *                 icon:
 *                   type: string
 *                 remark:
 *                   type: string
 */
sysRouter.delete('/menu', sysController.deleteMenu)

/**
 * @swagger
 * /api/sys/menuPermissions:
 *   post:
 *     summary: 创建菜单权限
 *     tags: [System]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               menuId:
 *                 type: string
 *               status:
 *                 type: integer
 *               permissions:
 *                 type: string
 *               name:
 *                 type: string
 *               remark:
 *                 type: string
 *     responses:
 *       200:
 *         description: 创建成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 menuId:
 *                   type: string
 *                 status:
 *                   type: integer
 *                 permissions:
 *                   type: string
 *                 name:
 *                   type: string
 *                 remark:
 *                   type: string
 */
sysRouter.post('/menuPermissions', sysController.createMenuPermissions)

/**
 * @swagger
 * /api/sys/menuPermissions:
 *   put:
 *     summary: 更新菜单权限
 *     tags: [System]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               menuId:
 *                 type: string
 *               status:
 *                 type: integer
 *               permissions:
 *                 type: string
 *               name:
 *                 type: string
 *               remark:
 *                 type: string
 *     responses:
 *       200:
 *         description: 更新成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 menuId:
 *                   type: string
 *                 status:
 *                   type: integer
 *                 permissions:
 *                   type: string
 *                 name:
 *                   type: string
 *                 remark:
 *                   type: string
 */
sysRouter.put('/menuPermissions', sysController.updateMenuPermissions)

/**
 * @swagger
 * /api/sys/menuPermissions:
 *   delete:
 *     summary: 删除菜单权限
 *     tags: [System]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 菜单权限ID
 *     responses:
 *       200:
 *         description: 删除成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 menuId:
 *                   type: string
 *                 status:
 *                   type: integer
 *                 permissions:
 *                   type: string
 *                 name:
 *                   type: string
 *                 remark:
 *                   type: string
 */
sysRouter.delete('/menuPermissions', sysController.deleteMenuPermissions)

/**
 * @swagger
 * /api/sys/menuPermissions/{id}:
 *   get:
 *     summary: 获取菜单权限
 *     tags: [System]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 菜单ID
 *     responses:
 *       200:
 *         description: 菜单权限列表
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
sysRouter.get('menuPermissions', sysController.getMenuPermissions)

/**
 * @swagger
 * /api/sys/roleMenus:
 *   post:
 *     summary: 关联角色与菜单
 *     tags: [System]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roleId:
 *                 type: string
 *               menuId:
 *                 type: string
 *               permissions:
 *                 type: string
 *     responses:
 *       200:
 *         description: 关联成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 roleId:
 *                   type: string
 *                 menuId:
 *                   type: string
 *                 permissions:
 *                   type: string
 */
sysRouter.post('/roleMenus', sysController.createRoleMenus)

/**
 * @swagger
 * /api/sys/roleMenus:
 *   delete:
 *     summary: 删除角色与菜单关联
 *     tags: [System]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 角色菜单关联ID
 *     responses:
 *       200:
 *         description: 删除成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 roleId:
 *                   type: string
 *                 menuId:
 *                   type: string
 *                 permissions:
 *                   type: string
 */
sysRouter.delete('/roleMenus', sysController.deleteRoleMenu)

export default sysRouter
