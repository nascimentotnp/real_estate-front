import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Select as SelectChakra,
  SelectProps,
  Text,
} from "@chakra-ui/react";
import { ErrorMessage } from "@hookform/error-message";

interface SelectComponentProps<T> extends SelectProps {
  id: string;
  name?: string;
  label: string;
  boolean?: boolean;
  booleanTrueLabel?: string;
  booleanFalseLabel?: string;
  booleanTrueValue?: string;
  booleanFalseValue?: string;
  error?: string;
  children?: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

export function Select<T>({
  id,
  name,
  label,
  boolean,
  booleanTrueLabel = "Ativo",
  booleanFalseLabel = "Inativo",
  booleanTrueValue = "ATIVO",
  booleanFalseValue = "INATIVO",
  error = "Campo obrigatório",
  mr = 0,
  ml = 0,
  onChange,
  children,
  ...rest
}: SelectComponentProps<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const registerProps = name ? { ...register(name, { required: error }) } : {};
  return (
    <FormControl flex="1" mt={4} mr={mr} ml={ml}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <SelectChakra
        placeholder="Selecione"
        id={id}
        focusBorderColor="light.primary"
        variant="outline"
        size="md"
        onChange={onChange}
        {...registerProps}
        {...rest}
      >
        {boolean && (
          <>
            <option value={booleanTrueValue}>{booleanTrueLabel}</option>
            <option value={booleanFalseValue}>{booleanFalseLabel}</option>
          </>
        )}
        {children}
      </SelectChakra>
      {name && (
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => <Text color="red">{message}</Text>}
        />
      )}
    </FormControl>
  );
}
