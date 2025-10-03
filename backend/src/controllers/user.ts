import { RequestHandler } from 'express'
import { userSchema } from '../schemas/user'
import * as userService from '../services/user'

export const getUser: RequestHandler = async (req, res) => {
   try {
      const { email } = req.body

      if (!email) return res.status(400).json({ message: "Email é obrigatório e deve ser uma string" })


      const user = await userService.getUser(email as string)

      if (!user) return res.status(404).json({ message: "Usuário não encontrado" })

      res.status(200).json({
         id: user.id,
         name: user.name,
         email: user.email,
      })
   } catch (error) {
      console.error('Erro no getUser:', error)
      res.status(500).json({ message: "Erro interno do servidor" })
   }
}

export const getUserByToken: RequestHandler = async (req, res) => {
   const { token } = req.body

   const user = await userService.getUserByToken(token as string)

   if (!user) return res.status(404).json({ message: "Usuário não encontrado" })

   res.status(200).json(user)
}

export const createUser: RequestHandler = async (req, res) => {
   const safeParse = await userSchema.safeParse(req.body)

   if (!safeParse.success) {
      res.status(400).json({ message: safeParse.error.flatten().fieldErrors })
      return
   }

   const user = await userService.createUser(safeParse.data)

   res.status(201).json(user)
}

export const updateUserToken: RequestHandler = async (req, res) => {
   const { token } = req.body

   const user = await userService.getUserByToken(token)

   if (!user) return res.status(404).json({ message: "Usuário não encontrado" })

   await userService.updateUserToken(user.email, token)

   return res.status(200).json({ message: "Token atualizado com sucesso" })
}

export const updateUser: RequestHandler = async (req, res) => {
   const { name, email, password } = req.body

   const user = await userService.updateUser({
      name,
      email,
      password
   })

   if (!user) return res.status(404).json({ message: "Usuário não encontrado" })

   return res.status(200).json(user)
}

export const deleteUser: RequestHandler = async (req, res) => {
   const { id } = req.params

   const user = await userService.deleteUser(parseInt(id))

   if (!user) return res.status(404).json({ message: "Usuário não encontrado" })

   return res.status(200).json({ message: "Usuário deletado com sucesso" })
}