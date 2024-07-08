import { FaUserAlt , FaSignInAlt, FaPizzaSlice, FaUserCheck  } from "react-icons/fa";

export interface NavbarItem {
  name?: string;
  icon?: any;
  public?: boolean;
  animated?: boolean; 
  roles: string[]; 
}

const navbar_items: NavbarItem[] = [
  {
    name: "Login",
    icon: FaUserAlt,
    public: true,
    animated: true, 
    roles: ["user", "admin"],

  },
  {
    name: "Registrar",
    icon: FaSignInAlt,
    public: true,
    animated: true,
    roles: ["user", "admin"],

  },
  {
    name: "pizzas",
    icon: FaPizzaSlice,
    public: false,
    animated: true,
    roles: ["admin"],

  },
  {
    name: "user",
    icon: FaUserCheck ,
    public: false,
    animated: true,
    roles: ["user"],
  },
];

export { navbar_items };
