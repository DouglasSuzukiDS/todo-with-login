import { RequestHandler } from "express"
import * as userService from "../services/user"
import bcrypt from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"
import { userSchema } from "../schemas/user"
import { createJWT } from "../utils/create-jwt"

export const signUp: RequestHandler = async (req, res) => {
   const safeParse = await userSchema.safeParse(req.body)

   if (!safeParse.success) {
      res.status(400).json({ message: safeParse.error.flatten().fieldErrors })
      return
   }

   const user = await userService.createUser(safeParse.data)

   if (!user) return res.status(500).json({ message: "Não foi possível realizar o cadastro" })

   res.status(201).json(user)
}

export const signIn: RequestHandler = async (req, res) => {
   const { email, password } = req.body

   const user = await userService.getUser(email)

   if (!user) return res.status(404).json({ messages: "Email/Senha inválidos. USER" })

   const comparePassword = await bcrypt.compare(password, user.password)

   if (!comparePassword) return res.status(404).json({ messages: "Email/Senha inválidos. PASS" })

   const token = await createJWT(email)

   await userService.updateUserToken(email, token)

   res.status(200).json({ token })
}

export const signOut: RequestHandler = async (req, res) => {
   const { token } = req.body

   const user = await userService.getUserByToken(token)

   if (!user) return res.status(404).json({ message: "Usuário não encontrado" })

   const response = await userService.updateUserToken(user.email, "")

   if (!response) return res.status(500).json({ message: "Não foi possível realizar o logout" })

   res.status(200).json({ message: "Logout realizado com sucesso" })
}