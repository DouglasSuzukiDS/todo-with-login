'use client'

import { useState } from "react"
import { Button } from "../ui/button"
import { useAuth } from "@/store/auth"
import { api } from "@/utils/api"
import { toast } from "sonner"
import { InputField } from "./input-field"
import { emailSchema } from "@/schema/email-schema"
import { userSchema } from "@/schema/user-schema"
import { loginSchema } from "@/schema/login-schema"

export const Auth = () => {
   const { signIn, signUp } = useAuth()

   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [step, setStep] = useState(1)
   const [find, setFind] = useState(false)

   const handleFindEmail = async () => {
      const safeEmail = emailSchema.safeParse({ email })

      if (!email || !safeEmail.success) {
         toast.warning('Digite um email válido')
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

   const handleBack = () => {
      setName('')
      setPassword('')
      setEmail('')
      setStep(1)
      setFind(false)
   }

   const handleSubmit = async () => {
      const createUserSafeParse = userSchema.safeParse({ name, email, password })

      if (!createUserSafeParse.success) {
         const fieldErrors = createUserSafeParse.error.flatten().fieldErrors

         toast.warning(`
            Preencha todos os campos corretamente para se cadastrar.

            ${fieldErrors.name && `Nome: ${fieldErrors.name}\n`}

            ${fieldErrors.email && `Email: ${fieldErrors.email}\n`}

            ${fieldErrors.password && `Senha: ${fieldErrors.password}\n`}
         `)
      }

      if (!find && createUserSafeParse.success) {
         const userCreated = await signUp(name, email, password)

         userCreated ?
            toast.success('Usuário cadastrado com sucesso!') : toast.error('Erro ao cadastrar usuário')

         setName('')
         setPassword('')
         setEmail('')
         setStep(1)
         setFind(false)

         return
      }

      const loginSafeParse = loginSchema.safeParse({ email, password })

      if (find && !loginSafeParse.success) {
         toast.warning('Preencha todos os campos corretamente para entrar.')
         return
      }

      if (find && email && password) {
         const userLoggedIn = await signIn(email, password)

         userLoggedIn === true ?
            toast.success('Logado!') : toast.error('Erro ao logar')
      }
   }

   return (
      <div className="w-full md:w-1/3 flex flex-col gap-4 mt-5 md:mt-10">
         <InputField
            label="Email"
            type="email"
            placeholder="Email"
            value={email}
            disabled={step === 2}
            onFocus={true}
            onChange={setEmail} />

         {find && step === 2 &&
            <InputField
               label="Senha"
               type="password"
               placeholder="Senha"
               value={password}
               onFocus={true}
               onChange={setPassword} />
         }

         {!find && step === 2 &&
            <div className="flex flex-col gap-4">
               <InputField
                  label="Nome"
                  placeholder="Nome"
                  value={name}
                  onFocus={true}
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
            <div className="flex flex-col gap-4 md:flex-row">
               <Button
                  onClick={handleBack}
                  className="flex-1 text-black bg-zinc-100 cursor-pointer hover:bg-zinc-200">
                  Voltar
               </Button>

               <Button
                  onClick={handleSubmit}
                  className="flex-1 text-white bg-blue-400 cursor-pointer hover:bg-blue-500">
                  {find ? 'Entrar' : 'Cadastrar'}
               </Button>
            </div>
         }
      </div>
   )
}