import { useTodo } from "@/store/todo"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useAuth } from "@/store/auth"
import { toast } from "sonner"
import { Todo } from "@/types/todo"

type Props = {
   task: Todo | null
   setTask: (task: Todo | null) => void
   onSave: 'update' | 'create'
   setOnSave: (mode: 'update' | 'create') => void
}
export const InputTodo = ({ task, setTask, onSave, setOnSave }: Props) => {
   const { user } = useAuth()
   const { createTodo, updateTodo } = useTodo()

   const handleSubmit = async () => {
      if (task === null) {
         toast.warning('Digite a tarefa antes de salvar.')
         return
      }

      if (onSave === 'create') {
         const todo = task && await createTodo(task.title, user?.id as number)

         if (todo) {
            toast.success('Tarefa criada com sucesso!')

            setTask(null)
         } else {
            toast.error('Erro ao criar tarefa. Tente novamente.')
         }
      } else {
         const todo = task && await updateTodo(task.id, task.title, task.userId)

         if (todo) {
            toast.success('Tarefa atualizada com sucesso!')

            setTask(null)

            setOnSave('create')
         } else {
            toast.error('Erro ao editar tarefa. Tente novamente.')
         }
      }
   }

   const handleCancel = () => {
      setTask(null)
      setOnSave('create')
   }

   return (
      <div className="flex flex-col md:flex-row gap-4">
         <Input
            placeholder="O que precisa ser feito?"
            value={task?.title || ''}
            onChange={(e) => setTask({ ...task, title: e.target.value } as Todo)}
            className="text-zinc-400 font-bold" />

         <div className="flex gap-4">
            <Button
               onClick={handleSubmit}
               className="flex-1 text-white bg-blue-400 cursor-pointer hover:bg-blue-500">
               {onSave === 'create' ? 'Adicionar' : 'Atualizar'}</Button>

            {onSave === 'update' &&
               <Button
                  onClick={handleCancel}
                  className="flex-1 text-white bg-red-400 cursor-pointer hover:bg-red-500">
                  Cancelar</Button>
            }
         </div>

      </div>
   )
}
