import React, { forwardRef } from "react";
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from "@chakra-ui/react";

interface ButtonProps extends ChakraButtonProps {
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ children, ...rest }, ref) {
    return (
      <ChakraButton
        ref={ref}
        bgColor="light.primary"
        color="white"
        type="submit"
        _hover={{
          opacity: "0.75",
        }}
        {...rest}
      >
        {children}
      </ChakraButton>
    );
  }
);
