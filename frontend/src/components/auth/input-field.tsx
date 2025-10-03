import { Input } from "../ui/input"
import { Label } from "../ui/label"

type Props = {
   label: string
   type?: 'text' | 'email' | 'password'
   placeholder: string
   disabled?: boolean
   onFocus?: boolean
   value: string
   onChange: (value: string) => void
}
export const InputField = ({ label, type = 'text', placeholder, disabled, onFocus, value, onChange }: Props) => {
   return (
      <div className="w-full md:max-w-sm flex flex-col gap-4">
         <Label
            htmlFor={label}
            className="text-zinc-400">{label}</Label>

         <Input
            id={label}
            type={type}
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            autoFocus={onFocus}
            onChange={(e) => onChange(e.target.value)}
            className="text-zinc-400" />
      </div>
   )
}