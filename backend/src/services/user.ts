import { Prisma } from "../generated/prisma"
import { prisma } from "../utils/prisma"
import bcrypt from "bcryptjs"

export const getUser = async (email: string) => {
   const user = await prisma.user.findFirst({
      where: { email }
   })

   console.log(user)

   return user ? user : null
}

export const getUserById = async (id: number) => {
   const user = await prisma.user.findUnique({
      where: { id }
   })

   return user ? true : null
}

export const getUserByToken = async (token: string) => {
   const user = await prisma.user.findFirst({
      where: { token }
   })

   return user ? user : null
}

export const createUser = async (data: Prisma.UserCreateInput) => {
   const userExists = await getUser(data.email)

   if (userExists) throw new Error("Não foi possível realizar o cadastro.")

   const hashedPassword = await bcrypt.hash(data.password, 10)

   const user = await prisma.user.create({
      data: {
         ...data,
         password: hashedPassword
      }
   })

   if (!user) throw new Error("Não foi possível realizar o cadastro.")

   return {
      user: {
         id: user.id,
         name: user.name,
         email: user.email,
      }
   }
}

export const updateUser = async (data: Prisma.UserUpdateInput) => {
   const userExists = await getUser(data.email as string)

   if (!userExists) throw new Error("Não foi possível atualizar os dados do usuário")

   if (data.password) {
      const hashedPassword = await bcrypt.hash(data.password as string, 10)

      const updatedUser = await prisma.user.update({
         where: { id: userExists.id },
         data: {
            ...data,
            password: hashedPassword,
         }
      })

      return updatedUser
   }
}

export const updateUserToken = async (email: string, token: string) => {
   const user = await getUser(email)

   if (!user) throw new Error("Usuário não encontrado")

   const updatedToken = await prisma.user.update({
      where: { id: user.id },
      data: { token }
   })

   return updatedToken
}

export const deleteUser = async (id: number) => {
   const user = await prisma.user.findUnique({
      where: { id }
   })

   if (!user) throw new Error("Usuário não encontrado")

   await prisma.user.delete({
      where: { id }
   })

   return 'Usuário excluído com sucesso'
}