'use client'

import { useAuth } from "@/store/auth"
import { Auth } from "./auth"
import { useEffect } from "react"
import { getCookie } from "@/utils/cookie"
import { Button } from "./ui/button"

export const Todo = () => {
   const { user, setUser, getUser, token, setToken, logout } = useAuth()

   useEffect(() => {
      getCookie()
         .then(token => {
            if (token !== null) {
               setToken(token.value)
            }
         })
   }, [])

   useEffect(() => {
      if (token) {
         getUser(token as string)
      }
   }, [token])

   return (
      <main className="w-full h-screen flex flex-col items-center justify-center bg-zinc-950">
         <h1 className="text-4xl text-zinc-400 font-bold mb-4">TODO LIST</h1>

         {user && token && <div className="flex items-center gap-4">
            <p className="text-zinc-400 font-bold">{user?.name && `Logado como ${user.name}`}</p>

            <Button
               variant={'destructive'}
               onClick={() => logout(token as string)}>Sair</Button>
         </div>

         }

         {!user && !token &&
            <Auth />
         }

         {user && token &&
            <h1>TODO</h1>
         }
      </main>
   )
}