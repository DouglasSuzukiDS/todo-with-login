import { z } from 'zod'

export const loginSchema = z.object({
   email: z.email("Email inválido"),
   password: z.string()
      .min(6, "A senha precisa ter pelo menos 6 caracteres")
      .max(100, "A senha deve ter no máximo 100 caracteres")
})
