import { z } from 'zod'

export const userSchema = z.object({
   email: z.email("Email inválido"),
   name: z.string()
      .min(2, "O nome deve ter pelo menos 2 caracteres")
      .max(100, "O nome deve ter no máximo 100 caracteres"),
   password: z.string()
      .min(6, "A senha precisa ter pelo menos 6 caracteres")
      .max(100, "A senha deve ter no máximo 100 caracteres")
})
