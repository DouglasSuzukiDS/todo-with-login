import { Prisma, PrismaClient } from "../generated/prisma"
import { prisma } from "../utils/prisma"
import { getUserById } from "./user"

export const getTodos = async (userId: number) => {
   const getUser = await getUserById(userId)
   console.log(getUser)

   if (!getUser) return null

   const todos = await prisma.todo.findMany({
      where: { userId }
   })

   return todos
}

export const createTodo = async (title: string, userId: number) => {
   const todo = await prisma.todo.create({
      data: {
         title,
         userId
      }
   })

   return todo
}

export const updateTodo = async (id: number, userId: number, data: Prisma.TodoUpdateInput) => {
   const todoExists = await prisma.todo.findFirst({
      where: { id, userId }
   })

   if (!todoExists) throw new Error("Não foi possível atualizar a tarefa")

   const updatedTodo = await prisma.todo.update({
      where: { id },
      data: {
         ...data
      }
   })

   return updatedTodo
}

export const deleteTodo = async (id: number, userId: number) => {
   const todoExists = await prisma.todo.findFirst({
      where: { id, userId }
   })

   if (!todoExists) return false

   const deletedTodo = await prisma.todo.delete({
      where: { id }
   })

   if (!deletedTodo) return false

   return true
}