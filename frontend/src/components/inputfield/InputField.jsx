import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// eslint-disable-next-line react/prop-types
function InputField({ form, label, fieldname, disabled }) {
  return (
    // eslint-disable-next-line react/prop-types
    <FormField
      control={form.control}
      name={fieldname}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={label}
              {...field}
              value={field.value || ""}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default InputField;
