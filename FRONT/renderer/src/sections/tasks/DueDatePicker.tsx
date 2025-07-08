import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Control } from "react-hook-form"
import { TaskFormData } from "./types"

interface DueDatePickerProps {
    control: Control<TaskFormData>
}

export function DueDatePicker({ control }: DueDatePickerProps) {
  return (
    <FormField
      control={control}
      name="dueDate"
      rules={{ required: "La fecha límite es obligatoria" }}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Fecha Límite *</FormLabel>
          <FormControl>
            <input
              type="date"
              className="w-full border rounded px-3 py-2"
              value={field.value ? (typeof field.value === 'string' ? field.value : field.value.toISOString().split('T')[0]) : ''}
              min={new Date().toISOString().split('T')[0]}
              onChange={e => {
                // Guardar como Date
                const val = e.target.value
                field.onChange(val ? new Date(val) : undefined)
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
