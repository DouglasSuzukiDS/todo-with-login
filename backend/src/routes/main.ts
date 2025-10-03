import { Router } from "express";
import * as userController from "../controllers/user"
import * as authController from "../controllers/auth"
import * as todoController from "../controllers/todo"
import { authMiddleware } from "../middleware/authMiddleware";

export const mainRoutes = Router()

mainRoutes.get('/', authMiddleware, (req, res) => {
   res.send('RBMK Reactor')
})

mainRoutes.get('/auth', authMiddleware, (req, res) => {
   res.send('RBMK Reactor')
})

mainRoutes.post('/auth/signup', authController.signUp)
mainRoutes.post('/auth/signin', authController.signIn)
mainRoutes.post('/auth/signout', authController.signOut)

mainRoutes.post('/user', userController.getUser)
mainRoutes.post('/user/token', authMiddleware, userController.getUserByToken)
mainRoutes.post('/user', authMiddleware, userController.createUser)
mainRoutes.put('/user', authMiddleware, userController.updateUser)
mainRoutes.delete('/user/:id', authMiddleware, userController.deleteUser)

mainRoutes.get('/todos', authMiddleware, todoController.getTodos)
mainRoutes.post('/todo', authMiddleware, todoController.createTodo)
mainRoutes.put('/todo/:id', authMiddleware, todoController.updateTodo)
mainRoutes.put('/todo/:id/completed', authMiddleware, todoController.toggleTodoCompleted)
mainRoutes.delete('/todo/:id', authMiddleware, todoController.deleteTodo)