'use client'

import { useAuth } from "@/store/auth"
import { Auth } from "../auth/auth"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { InputTodo } from "../todo/input-todo"
import { TableTodo } from "../todo/table-todo"
import { useTodo } from "@/store/todo"
import { getAuthToken } from "@/utils/cookie"
import { api } from "@/utils/api"
import { Todo } from "@/types/todo"
import { NotFoundTodo } from "../todo/not-found-todo"

export const TodoContainer = () => {
   const { user, getUser, token, setToken, signOut } = useAuth()
   const { todos, getTodos } = useTodo()

   const [task, setTask] = useState<Todo | null>(null)
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
      <main className="w-full h-screen flex flex-col justify-center items-center p-4 md:justify-normal md:p-10 bg-zinc-950">
         <h1 className="text-4xl text-zinc-400 font-bold">TODO LIST</h1>

         {user && token && <div className="flex items-center gap-4 my-5">
            <p className="text-zinc-400 font-bold">{user?.name && `Logado como ${user.name}`}</p>

            <Button
               variant={'destructive'}
               onClick={() => signOut(token as string)}
               className="cursor-pointer">Sair</Button>
         </div>}

         {!user && !token &&
            <Auth />
         }

         {user && token &&
            <div className="flex flex-col w-full gap-4 md:gap-10 md:w-3/4">
               <InputTodo
                  task={task} setTask={setTask}
                  onSave={onSave} setOnSave={setOnSave} />

               {todos.length >= 1 ?
                  <TableTodo
                     task={task} setTask={setTask}
                     onSave={onSave} setOnSave={setOnSave} /> :
                  <NotFoundTodo />
               }
            </div>
         }
      </main>
   )
}