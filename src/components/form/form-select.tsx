import { cn } from "@/lib/utils";
import { CommandLoading } from "cmdk";
import {
  AsteriskIcon,
  CheckIcon,
  ChevronsUpDownIcon,
  XIcon,
} from "lucide-react";
import {
  useFormContext,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface FormSelectProps<TFieldValues extends FieldValues> {
  className?: string;
  description?: React.ReactNode;
  disabled?: boolean;
  label: React.ReactNode;
  loading?: boolean;
  name: FieldPath<TFieldValues>;
  onSearchChange?: (search: string) => void;
  options: { label: string; value: string }[];
  required?: boolean;
  search?: string;
}

export function FormSelect<TFieldValues extends FieldValues>(
  props: FormSelectProps<TFieldValues>,
) {
  const {
    className,
    description,
    disabled,
    label,
    loading,
    name,
    onSearchChange,
    options,
    required,
    search,
  } = props;

  const { control } = useFormContext<TFieldValues>();

  return (
    <FormField
      name={name}
      control={control}
      disabled={disabled}
      render={({
        field: { disabled, onBlur: handleBlur, onChange, value },
      }) => (
        <FormItem className="my-4 flex w-full flex-col">
          <FormLabel className="flex gap-1">
            {label}
            {required && <AsteriskIcon className="size-4 text-destructive" />}
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  role="combobox"
                  variant="outline"
                  disabled={disabled}
                  className={cn(
                    "w-full justify-between px-3",
                    !value && "text-muted-foreground",
                    className,
                  )}
                >
                  {value ? options.find(op => op.value === value)?.label : "‎"}
                  {value ? (
                    <XIcon
                      onClick={() => onChange("")}
                      className="ml-2 size-4 shrink-0 rounded-sm opacity-50 hover:bg-destructive-foreground hover:text-destructive hover:opacity-75"
                    />
                  ) : (
                    <ChevronsUpDownIcon className="ml-2 size-4 shrink-0 opacity-50" />
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-fit p-0">
              <Command onBlur={handleBlur}>
                <CommandInput
                  placeholder="Pesquisar..."
                  {...(search !== undefined && onSearchChange !== undefined
                    ? { onValueChange: onSearchChange, value: search }
                    : {})}
                />
                <CommandList>
                  {loading ? (
                    <CommandLoading className="py-6 text-center text-sm">
                      Carregando...
                    </CommandLoading>
                  ) : (
                    <CommandEmpty>Não encontrado.</CommandEmpty>
                  )}
                  <CommandGroup>
                    {options.map(option => (
                      <CommandItem
                        key={option.value}
                        value={option.label}
                        onSelect={() =>
                          value === option.value
                            ? onChange("")
                            : onChange(option.value)
                        }
                      >
                        <CheckIcon
                          className={cn(
                            "mr-2 size-4",
                            option.value === value
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>

                  {!["", null, undefined].includes(value) && (
                    <>
                      <CommandSeparator />
                      <CommandGroup>
                        <CommandItem
                          onSelect={() => onChange("")}
                          className="justify-center text-center"
                        >
                          Limpar
                        </CommandItem>
                      </CommandGroup>
                    </>
                  )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
