import { RequestHandler } from 'express'
import * as todoService from '../services/todo'

export const getTodos: RequestHandler = async (req, res) => {
   const { userId } = req.body

   const todos = await todoService.getTodos(userId)

   res.status(200).json(todos)
}

export const createTodo: RequestHandler = async (req, res) => {
   const { title, userId } = req.body

   const todo = await todoService.createTodo(title, userId)

   if (!todo) return res.status(500).json({ message: "Não foi possível criar a tarefa" })

   res.status(201).json(todo)
}

export const updateTodo: RequestHandler = async (req, res) => {
   const { id } = req.params
   const { userId, ...data } = req.body

   const updatedTodo = await todoService.updateTodo(parseInt(id), userId, data)

   if (!updatedTodo) return res.status(500).json({ message: "Não foi possível atualizar a tarefa" })

   res.status(200).json(updatedTodo)
}

export const deleteTodo: RequestHandler = async (req, res) => {
   const { id } = req.params
   const { userId } = req.body

   const deleted = await todoService.deleteTodo(parseInt(id), userId)

   res.status(200).json({ deleted })
}