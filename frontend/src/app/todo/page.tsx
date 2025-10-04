'use client'

import { useAuth } from "@/store/auth"
import { useEffect, useState } from "react"
import { useTodo } from "@/store/todo"
import { getAuthToken } from "@/utils/cookie"
import { api } from "@/utils/api"
import { TodoSelected } from "@/types/todo-selected"
import { Button } from "@/components/ui/button"
import { InputTodo } from "@/components/todo/input-todo"
import { TableTodo } from "@/components/todo/table-todo"
import { NotFoundTodo } from "@/components/todo/not-found-todo"
import { useRouter } from "next/navigation"

export default function TodoContainer() {
   const { user, getUser, token, setToken, signOut } = useAuth()
   const { todos, getTodos } = useTodo()

   const [task, setTask] = useState<TodoSelected | null>(null)
   const [onSave, setOnSave] = useState<'create' | 'update'>('create')

   const router = useRouter()

   const handleLogout = async () => {
      await signOut(token as string)

      router.push('/')
   }

   useEffect(() => {
      token === null && router.push('/')

      getAuthToken()
         .then(token => {
            if (token !== null) {
               setToken(token.value)

               api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
            }
         })
         .catch(handleLogout)
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

         <div className="flex items-center gap-4 my-5">
            <p className="text-zinc-400 font-bold">{user?.name && `Logado como ${user.name}`}</p>

            <Button
               variant={'destructive'}
               onClick={handleLogout}
               className="cursor-pointer">Sair</Button>
         </div>

         <div className="flex flex-col w-full gap-4 md:gap-10 md:w-3/4">
            <InputTodo
               task={task} setTask={setTask}
               onSave={onSave} setOnSave={setOnSave} />

            {todos.length >= 1 ?
               <TableTodo
                  setTask={setTask}
                  onSave={onSave} setOnSave={setOnSave} /> :
               <NotFoundTodo />
            }
         </div>
      </main>
   )
}