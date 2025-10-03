import { Input } from "../ui/input"
import { Label } from "../ui/label"

type Props = {
   label: string
   type?: 'text' | 'email' | 'password'
   placeholder: string
   value: string
   onChange: (value: string) => void
}
export const InputField = ({ label, type = 'text', placeholder, value, onChange }: Props) => {
   return (
      <div className="grid w-full max-w-sm items-center gap-4">
         <Label
            htmlFor={label}
            className="text-zinc-400">{label}</Label>

         <Input
            id={label}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="text-zinc-400"
         />
      </div>
   )
}