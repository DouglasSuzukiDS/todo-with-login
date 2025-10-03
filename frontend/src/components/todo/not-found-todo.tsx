import { ShieldAlert } from "lucide-react"

export const NotFoundTodo = () => {
   return (
      <div className="flex flex-col items-center gap-4">
         <ShieldAlert className="size-20 text-yellow-400" />

         <p className="text-center text-zinc-400 font-bold">Você ainda não possui tarefas registradas.</p>
      </div>
   )
}