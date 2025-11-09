import Router from 'koa-router';
import * as userController from './user.controller';
import { AppContext } from '@/types/context';
import { Context } from 'koa';
import { jwtAuth } from '../auth';


const userRouter = new Router<Context, AppContext>({ prefix: '/api/user'});

userRouter.use(jwtAuth(['user', 'system', 'admin']))

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: 创建用户
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: 用户创建成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 email:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 role:
 *                   type: string
 *       400:
 *         description: 创建失败
 */
userRouter.post('/', userController.createUser)

/**
 * @swagger
 * /api/user:
 *   put:
 *     summary: 更新用户信息
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: 用户信息更新成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 email:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 role:
 *                   type: string
 *       400:
 *         description: 更新失败
 */
userRouter.put('/:id', userController.updateUser)

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: 查询用户信息
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 用户ID
 *     responses:
 *       200:
 *         description: 用户列表
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   email:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   role:
 *                     type: string
 *       400:
 *         description: 获取失败
 */
userRouter.get('/:id', userController.getUser)

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: 删除用户
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 用户ID
 *     responses:
 *       200:
 *         description: 用户删除成功
 *       400:
 *         description: 删除失败
 */
// 只允许管理员删除用户
userRouter.use(jwtAuth(['admin']))
userRouter.delete('/:id', userController.deleteUser);

export default userRouter;