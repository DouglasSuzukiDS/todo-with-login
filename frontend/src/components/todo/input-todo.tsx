import { useTodo } from "@/store/todo"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useAuth } from "@/store/auth"
import { toast } from "sonner"
import { TodoSelected } from "@/types/todo-selected"

type Props = {
   task: TodoSelected | null
   setTask: (task: TodoSelected | null) => void
   onSave: 'update' | 'create'
   setOnSave: (mode: 'update' | 'create') => void
}
export const InputTodo = ({ task, setTask, onSave, setOnSave }: Props) => {
   const { user } = useAuth()
   const { createTodo, updateTodo } = useTodo()

   const handleSubmit = async () => {
      if (task === null || !task.title || task.title.trim() === '') {
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
         const todo = task && await updateTodo(task.id, task.title, user?.id as number)

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
            value={task && task.title || ''}
            onChange={(e) => setTask({ id: task?.id, title: e.target.value } as TodoSelected)}
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