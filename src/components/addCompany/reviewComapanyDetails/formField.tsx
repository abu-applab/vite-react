import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FormFieldProps {
  label: string
  value: string
  isEditing?: boolean
  onChange?: (value: string) => void
  type?: string
  id?: string
  required?: boolean
  disabled?: boolean
  placeholder?: string
  options?: string[]
  error?: string
}

export function FormField({
  label,
  value,
  isEditing = true,
  onChange,
  type = "text",
  id,
  required = false,
  disabled = false,
  placeholder = '',
  options = [],
  error = '',
}: FormFieldProps) {
  if (type === 'select') {
    return (
      <div className="space-y-2">
        <Label htmlFor={id}>
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
        <Select onValueChange={onChange} value={value}>
          <SelectTrigger className={`w-full ${error ? "border-red-600" : ""}`}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && <span className="text-sm text-red-600">{error}</span>}
      </div>
    )
  }
  
  return (
    <div>
      <Label htmlFor={id} className={`text-sm gap-0 ${!isEditing ? 'text-zinc-500' : 'text-foreground'}`}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      {isEditing ? (
        <Input
          id={id}
          type={type}
          value={value}
          className={`text-sm ${disabled && 'bg-zinc-100'}`}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          placeholder={placeholder}
        />
      ) : (
        <p className="text-base text-zinc-900 mt-1">{value}</p>
      )}
    </div>
  )
}
