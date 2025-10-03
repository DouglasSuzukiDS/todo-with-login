import { NextFunction, Request, Response } from "express";
import { getUserByToken } from "../services/user";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
   const authHeader = req.headers['authorization']

   if (!authHeader) {
      res.status(401).json({ error: "Não Autorizado" })
      return
   }

   const tokenSplit = authHeader.split('Bearer ')

   if (!tokenSplit[1]) {
      res.status(401).json({ error: "Não Autorizado" })
      return
   }

   const token = tokenSplit[1]

   const user = getUserByToken(token)

   if (!user) {
      res.status(401).json({ error: "Não Autorizado" })
      return
   }

   (req as any).userId = user

   next()
}