'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { useAuth } from "@/store/auth"
import { api } from "@/utils/api"
import { toast } from "sonner"
import { InputField } from "./auth/input-field"

export const Auth = () => {
   const { user, setUser, signIn, signUp } = useAuth()

   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [step, setStep] = useState(1)
   const [find, setFind] = useState(false)

   const handleFindEmail = async () => {
      if (!email) {
         toast.error('Digite um email válido')
         return
      }

      try {
         await api.post('/user', { email })

         setFind(true)

         setStep(2)

         toast.info('Digite sua senha.')

      } catch (err: any) {
         if (err.response?.status === 404) {
            setFind(false)

            setStep(2)

            toast.info('Realize seu cadastro!')
         } else {
            toast.error('Erro ao verificar email. Tente novamente.')
            console.error('Erro:', err)
         }
      }
   }

   const handleSubmit = async () => {
      if (!find && name && email && password) {
         const userCreated = await signUp(name, email, password)

         userCreated ? toast.success('Usuário cadastrado com sucesso!') : toast.error('Erro ao cadastrar usuário')

         setName('')
         setPassword('')
         setEmail('')
         setStep(1)
         setFind(false)
      }

      if (find && email && password) {
         const userLoggedIn = await signIn(email, password)

         userLoggedIn === true ? toast.success('Logado!') : toast.error('Erro ao logar')
      }
   }

   return (
      <div>
         <div className="flex flex-col gap-4">
            <InputField
               label="Email"
               type="email"
               placeholder="Email"
               value={email}
               onChange={setEmail} />

            {find && step === 2 &&
               <InputField
                  label="Senha"
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={setPassword} />
            }

            {!find && step === 2 &&
               <div className="flex flex-col gap-4">
                  <InputField
                     label="Nome"
                     placeholder="Nome"
                     value={name}
                     onChange={setName} />

                  <InputField
                     label="Senha"
                     type="password"
                     placeholder="Senha"
                     value={password}
                     onChange={setPassword} />
               </div>
            }

            {step === 1 &&
               <Button
                  onClick={handleFindEmail}
                  className="text-white bg-blue-400 cursor-pointer hover:bg-blue-500">Proseguir</Button>
            }

            {step === 2 &&
               <Button
                  onClick={handleSubmit}
                  className="text-white bg-blue-400 cursor-pointer hover:bg-blue-500">
                  {find ? 'Entrar' : 'Cadastrar'}
               </Button>
            }
         </div>

      </div >
   )
}