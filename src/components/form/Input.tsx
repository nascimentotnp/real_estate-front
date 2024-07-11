import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  Text,
} from "@chakra-ui/react";
import { UseFormReturn, useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

interface InputProps extends ChakraInputProps {
  name?: string;
  label?: string;
  error?: string;
}

export const Input = ({
  id,
  name,
  label,
  children,
  mr = 0,
  ml = 0,
  error = "Campo obrigatório",
  ...rest
}: InputProps) => {
  let registerProps = {};
  let errors = {};

  const context = useFormContext();
  if (context) {
    const { register, formState } = context as UseFormReturn;
    errors = formState.errors;
    if (name) {
      registerProps = { ...register(name, { required: error }) };
    }
  }

  return (
    <FormControl flex="1" mt={4} mr={mr} ml={ml}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <ChakraInput
        id={id}
        focusBorderColor="light.primary"
        variant="outline"
        size="md"
        {...rest}
        {...registerProps}
      />
      {name && (
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => <Text color="red">{message}</Text>}
        />
      )}
    </FormControl>
  );
};
