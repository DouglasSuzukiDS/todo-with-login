'use client'

import { useAuth } from "@/store/auth"
import { Auth } from "./auth"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { InputTodo } from "./todo/input-todo"
import { TableTodo } from "./todo/table-todo"
import { useTodo } from "@/store/todo"
import { getAuthToken } from "@/utils/cookie"
import { api } from "@/utils/api"

export const Todo = () => {
   const { user, setUser, getUser, token, setToken, signOut } = useAuth()
   const { getTodos } = useTodo()

   const [task, setTask] = useState('')
   const [onSave, setOnSave] = useState<'create' | 'update'>('create')

   useEffect(() => {
      getAuthToken()
         .then(token => {
            if (token !== null) {
               setToken(token.value)

               api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
            }
         })
         .catch(signOut)
   }, [])

   useEffect(() => {
      if (token) {
         getUser(token as string)
      }

   }, [token])

   useEffect(() => {
      if (user) {
         getTodos(user.id)
      }
   }, [user])

   return (
      <main className="w-full h-screen flex flex-col items-center p-10 bg-zinc-950">
         <h1 className="text-4xl text-zinc-400 font-bold border">TODO LIST</h1>

         {user && token && <div className="flex items-center gap-4 my-5">
            <p className="text-zinc-400 font-bold">{user?.name && `Logado como ${user.name}`}</p>

            <Button
               variant={'destructive'}
               onClick={() => signOut(token as string)}>Sair</Button>
         </div>}

         {!user && !token &&
            <Auth />
         }

         {user && token &&
            <div className="flex flex-col gap-10 w-3/4 border">
               <InputTodo task={task} setTask={setTask} onSave={onSave} />

               <TableTodo />
            </div>
         }
      </main>
   )
}