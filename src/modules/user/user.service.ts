import sql from '@/utils/db';
import { User, CreateUserDTO } from './user.types'

export async function createUser(user: CreateUserDTO) {
  const users = await sql`
    INSERT INTO public.sys_user (name, phone, email, password, role)
    VALUES (${user.name}, ${user.phone}, ${user.email}, ${user.password}, ${user.role})
    RETURNING *
  `
  return users[0]
}
export async function getUserById(id: string): Promise<User> {
  const user = await sql`
    SELECT * FROM public.sys_user WHERE id = ${id} 
  `
  return user[0] as User
}
export async function getUserByPhone(phone: string): Promise<any> {
  const user = await sql`
    SELECT * FROM public.sys_user WHERE phone = ${phone} 
  `
  return user[0]
}
export async function getAllUsers(): Promise<User []> {
  return await sql`
    SELECT * FROM public.sys_user
  `
}
export async function updateUser(id: string, user: User) {
  return await sql`
    UPDATE public.sys_user SET name = ${user.name}, email = ${user.email} WHERE id = ${id} RETURNING *
  `
}
export async function deleteUser(id: string) {
  return await sql`
    DELETE FROM public.sys_user WHERE id = ${id} RETURNING *
  `
}
