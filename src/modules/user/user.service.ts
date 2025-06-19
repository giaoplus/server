import sql from '@/utils/db';
import { User, CreateUserDTO } from './user.types'

export async function createUser(user: CreateUserDTO) {
  const users = await sql`
    INSERT INTO public.user (name, phone, email)
    VALUES (${user.name}, ${user.phone}, ${user.email})
    RETURNING *
  `
  return users[0]
}
export async function getUserById(id: string): Promise<any> {
  const user = await sql`
    SELECT * FROM public.user WHERE id = ${id} 
  `
  return user[0]
}
export async function getAllUsers(): Promise<User []> {
  return await sql`
    SELECT * FROM public.user
  `
}
export async function updateUser(id: string, user: User) {
  return await sql`
    UPDATE public.user SET name = ${user.name}, phone = ${user.phone}, email = ${user.email} WHERE id = ${id} RETURNING *
  `
}
export async function deleteUser(id: string) {
  return await sql`
    DELETE FROM public.user WHERE id = ${id} RETURNING *
  `
}
