import sql from '@/utils/db';
import { User } from './user.types'

class UserService {
  async createUser(user: User) {
    return await sql`
      INSERT INTO public.user (name, phone, email)
      VALUES (${user.name}, ${user.phone}, ${user.email})
      RETURNING *
    `
  }
  async getUserById(id: string) {
    console.log(id)
    const a = await sql`
      SELECT * FROM public.user WHERE id = ${id} 
    `
    console.log(a)
    return a
  }
  async getAllUsers() {
    return await sql`
      SELECT * FROM public.user
    `
  }
  async updateUser(id: string, user: User) {
    return await sql`
      UPDATE public.user SET name = ${user.name}, phone = ${user.phone}, email = ${user.email} WHERE id = ${id} RETURNING *
    `
  }
  async deleteUser(id: string) {
    return await sql`
      DELETE FROM public.user WHERE id = ${id} RETURNING *
    `
  }
}

export default new UserService();