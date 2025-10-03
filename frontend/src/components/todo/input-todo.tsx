import { useTodo } from "@/store/todo"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useAuth } from "@/store/auth"
import { toast } from "sonner"

type Props = {
   task: string
   setTask: (task: string) => void
   onSave: 'update' | 'create'
}
export const InputTodo = ({ task, setTask, onSave }: Props) => {
   const { user } = useAuth()
   const { createTodo, updateTodo } = useTodo()

   const handleSubmit = async () => {
      if (onSave === 'create') {
         const todo = await createTodo(task, user?.id as number)

         if (todo) {
            toast.success('Tarefa criada com sucesso!')

            setTask('')
         } else {
            toast.error('Erro ao criar tarefa. Tente novamente.')
         }
      }
   }

   return (
      <div className="flex gap-4">
         <Input
            placeholder="O que precisa ser feito?"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="text-zinc-400 font-bold" />

         <Button
            onClick={handleSubmit}
            className="text-white bg-blue-400 cursor-pointer hover:bg-blue-500">
            {onSave === 'create' ? 'Adicionar' : 'Atualizar'}</Button>
      </div>
   )
}
