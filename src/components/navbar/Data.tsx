import { FaUserAlt , FaSignInAlt  } from "react-icons/fa";

export interface NavbarItem {
  name?: string;
  icon?: any;
  public?: boolean;
  animated?: boolean; // Adiciona a opção de animação
}

const navbar_items: NavbarItem[] = [
  {
    name: "Login",
    icon: FaUserAlt,
    public: true,
    animated: true, // Ative a animação para este ícone
  },
  {
    name: "Registrar",
    icon: FaSignInAlt,
    public: true,
    animated: true, // Ative a animação para este ícone
  }
];

export { navbar_items };
