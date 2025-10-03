import { Todo } from "@/types/todo";
import { create } from "zustand";
import { useAuth } from "./auth";
import { api } from "@/utils/api";

type TodoStore = {
   todos: Todo[] | []
   setTodos: (todos: Todo[]) => void

   getTodos: (userId: number) => void

   createTodo: (title: string, userId: number) => Promise<boolean>

   updateTodo: (id: number, title: string, userId: number) => Promise<boolean>

   toggleTodoCompleted: (id: number) => Promise<boolean>

   deleteTodo: (id: number) => Promise<boolean>
}
export const useTodo = create<TodoStore>((set, get) => ({
   todos: [],
   setTodos: (todos: Todo[]) => set({ todos }),

   getTodos: async (userId: number) => {

      const userTodos = await api.get('/todos', { params: { userId } })

      set({ todos: userTodos.data })
   },

   createTodo: async (title: string, userId: number) => {
      const { getTodos } = get()

      const todo = await api.post('/todo', { title, userId })

      if (todo.status === 201) {
         getTodos(userId)

         return true
      }

      return false
   },

   updateTodo: async (id: number, title: string, userId: number) => {
      const { getTodos } = get()

      const todo = await api.put(`/todo/${id}`, { title })

      if (todo.status === 200) {
         getTodos(userId)

         return true
      }

      return false
   },

   toggleTodoCompleted: async (id: number) => {
      const { todos, setTodos, getTodos } = get()

      const todo = await api.put(`/todo/${id}/completed`, {
         completed: !todos.find(t => t.id === id)?.completed
      })

      if (todo.status === 200) {
         setTodos(
            todos.map(t =>
               t.id === id ? { ...t, completed: !t.completed } : t
            )
         )

         return true
      }

      return false
   },

   deleteTodo: async (id: number) => {
      const { todos, setTodos } = get()

      const todo = await api.delete(`/todo/${id}`)

      if (todo.status === 200) {
         setTodos(todos.filter(t => t.id !== id))
         return true
      }

      return false
   }

}))