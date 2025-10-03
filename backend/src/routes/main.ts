import { Router } from "express";
import * as userController from "../controllers/user"
import * as authController from "../controllers/auth"
import * as todoController from "../controllers/todo"

export const mainRoutes = Router()

mainRoutes.post('/auth/signup', authController.signUp)
mainRoutes.post('/auth/signin', authController.signIn)
mainRoutes.post('/auth/logout', authController.logout)

mainRoutes.get('/user', userController.getUser)
mainRoutes.get('/user/token', userController.getUserByToken)
mainRoutes.post('/user', userController.createUser)
mainRoutes.put('/user', userController.updateUser)
mainRoutes.delete('/user/:id', userController.deleteUser)

mainRoutes.get('/todos', todoController.getTodos)
mainRoutes.post('/todo', todoController.createTodo)
mainRoutes.put('/todo/:id', todoController.updateTodo)
mainRoutes.put('/todo/:id/completed', todoController.toggleTodoCompleted)
mainRoutes.delete('/todo/:id', todoController.deleteTodo)