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
      if (!email) return

      const findUser = await api.get('/user', { params: { email } })

      if (!findUser.data.email) {
         setFind(false)
         setStep(2)
      }

      setFind(true)
      setStep(2)
   }

   const handleSubmit = async () => {
      if (!find && name && email && password) {
         const userCreated = await signUp(name, email, password)

         userCreated ? toast.success('Usuário cadastrado com sucesso!') : toast.error('Erro ao cadastrar usuário')
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
               < div >
                  {/* <div className="grid w-full max-w-sm items-center gap-4 ">
                     <Label
                        htmlFor="name"
                        className="text-zinc-400">Nome</Label>

                     <Input
                        id="name"
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="text-zinc-400"
                     />
                     </div>

                  <div className="grid w-full max-w-sm items-center gap-4 ">
                     <Label
                        htmlFor="password"
                        className="text-zinc-400">Senha</Label>

                     <Input
                        id="password"
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="text-zinc-400"
                     />
                  </div> */}

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
               <Button onClick={handleFindEmail}>Proseguir</Button>
            }

            {step === 2 && find &&
               <Button onClick={handleSubmit}>{find ? 'Entrar' : 'Cadastrar'}</Button>
            }
         </div>

      </div >
   )
}