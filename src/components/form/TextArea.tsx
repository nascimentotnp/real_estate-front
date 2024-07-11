import {
  Box,
  Textarea as TextAreaChakra,
  Text,
  TextareaProps,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";

interface TextAreaComponentProps extends TextareaProps {
  size?: string;
  id: string;
  name: string;
  label: string;
  rows?: number;
  cols?: number;
  error?: string;
}

export const TextArea = ({
  id,
  name,
  label,
  error = "Campo obrigatório",
  mr = 0,
  ml = 0,
  ...rest
}: TextAreaComponentProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl flex="1" mt={4} mr={mr} ml={ml}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Box mt={2}>
        <TextAreaChakra
          id={id}
          focusBorderColor="orange.400"
          bgColor="blackAlpha.100"
          variant="filled"
          _hover={{
            bgColor: "blackAlpha.100",
          }}
          _focus={{
            bgColor: "blackAlpha.100",
          }}
          size="md"
          {...rest}
          {...register(name, { required: error })}
        />
      </Box>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <Text color="red">{message}</Text>}
      />
    </FormControl>
  );
};
