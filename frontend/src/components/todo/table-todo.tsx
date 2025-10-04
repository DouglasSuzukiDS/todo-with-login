'use client'
import { useAuth } from "@/store/auth"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useTodo } from "@/store/todo"
import { Button } from "../ui/button"
import { CheckSquare, Edit, Square, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Todo } from "@/types/todo"
import { TodoSelected } from "@/types/todo-selected"

type Props = {
   setTask: (task: TodoSelected | null) => void
   onSave: 'update' | 'create'
   setOnSave: (mode: 'update' | 'create') => void
}

export const TableTodo = ({ setTask, onSave, setOnSave }: Props) => {
   const { user } = useAuth()
   const { todos, toggleTodoCompleted, deleteTodo } = useTodo()

   const handleToggleCompleted = async (id: number) => {
      const updated = await toggleTodoCompleted(id)

      updated ?
         toast.success('Tarefa atualizada com sucesso!') : toast.error('Erro ao atualizar tarefa. Tente novamente.')
   }

   const handleUpdate = async (task: Todo) => {
      setTask({
         id: task.id,
         title: task.title
      })

      setOnSave('update')
   }

   const handleDelete = async (id: number) => {
      const deleted = await deleteTodo(id)

      deleted ?
         toast.success('Tarefa deletada com sucesso!') : toast.error('Erro ao deletar tarefa. Tente novamente.')
   }

   return (
      <div className="w-full">
         <Table>
            <TableCaption>Lista de Tarefas de {user?.name}</TableCaption>

            <TableHeader>
               <TableRow className="text-center text-zinc-400">
                  <TableHead className="w-6 text-center text-zinc-400">Concluído</TableHead>
                  <TableHead className="flex-1 text-zinc-400">Tarefa</TableHead>
                  <TableHead className="w-8 text-center text-zinc-400">Ações</TableHead>
               </TableRow>
            </TableHeader>

            <TableBody>
               {todos.map(todo => (
                  <TableRow key={todo.id} className="text-center">
                     <TableCell className="w-6 text-center">
                        <Button
                           variant="link" size="sm"
                           onClick={() => handleToggleCompleted(todo.id)}
                           className={`cursor-pointer border ${todo.completed ? 'border-green-400 hover:border-green-600' : 'border-zinc-400 hover:border-zinc-600'}`}>
                           {todo.completed ?
                              <CheckSquare className='text-green-400' /> :
                              <Square className='text-zinc-400' />}
                        </Button>
                     </TableCell>

                     <TableCell
                        className={`flex-1 text-left text-zinc-400 truncate ${todo.completed && 'line-through italic'}`}>{todo.title}</TableCell>

                     <TableCell className="w-8">
                        <div className="flex gap-2 justify-center">
                           <Button variant="link" size="sm"
                              disabled={todo.completed}
                              onClick={() => handleUpdate(todo)}
                              className={`cursor-pointer border border-yellow-400 hover:border-yellow-600 ${todo.completed && 'opacity-50 cursor-not-allowed'}`}>
                              <Edit className="text-yellow-400 w-4 h-4" />
                           </Button>

                           <Button
                              variant="link" size="sm"
                              onClick={() => handleDelete(todo.id)}
                              className="cursor-pointer border border-red-400 hover:border-red-600">
                              <Trash2 className="text-red-400 w-4 h-4" />
                           </Button>
                        </div>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>
   )
}