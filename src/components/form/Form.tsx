import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Flex } from "@chakra-ui/react";
import AuthService from "../../services/auth.service"; // Importar o AuthService
import "./Form.css";

interface Pizza {
  name: string;
  basePrice: number;
  filling: string;
  size: string;
  stuffed_pizza_edge: string;
  flavor_stuffed_pizza_edge: string;
  price: number;
  userId?: number; // Adicionar userId opcional
}

interface FormErrors {
  [key: string]: string;
}

export default function Formulary() {
  const navigate = useNavigate();
  const handleBack = (e: any) => {
    e.preventDefault();
    navigate("/plans");
  };

  const [pizza, setPizza] = useState<Pizza>({
    name: "",
    basePrice: 0.0,
    filling: "",
    size: "",
    stuffed_pizza_edge: "",
    flavor_stuffed_pizza_edge: "",
    price: 0,
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  useEffect(() => {
    const storedPizza = JSON.parse(localStorage.getItem("selectedPizza") || "{}");
    if (storedPizza && storedPizza.name) {
      setPizza({
        ...storedPizza,
        size: "",
        stuffed_pizza_edge: "",
        flavor_stuffed_pizza_edge: "",
        price: 0,
      });
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setPizza((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const calculatePrice = useCallback(() => {
    let price = pizza.basePrice || 0;
    switch (pizza.size) {
      case "Pequena":
        price += 0;
        break;
      case "Média":
        price += 4;
        break;
      case "Grande":
        price += 6;
        break;
      case "Gigante":
        price += 8;
        break;
      default:
        break;
    }
    if (pizza.stuffed_pizza_edge === "true") {
      price += 3;
    }
    if (isNaN(price)) {
      price = 0;
    }
    setPizza((prevState) => ({
      ...prevState,
      price: price,
    }));
  }, [pizza.basePrice, pizza.size, pizza.stuffed_pizza_edge]);

  useEffect(() => {
    calculatePrice();
  }, [pizza.size, pizza.stuffed_pizza_edge, calculatePrice]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: FormErrors = {};
    Object.keys(pizza).forEach((key) => {
      if (!pizza[key as keyof Pizza] && key !== "flavor_stuffed_pizza_edge") {
        errors[key] = "Este campo é obrigatório";
      }
    });
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      const currentUser = AuthService.getCurrentUser();
      if (currentUser) {
        const pizzaWithUser = { ...pizza, userId: currentUser.id };
        let compras = localStorage.getItem('purchases');
        if (!compras) {
          compras = '[]';
        }
        const parsedCompras = JSON.parse(compras);
        parsedCompras.push(pizzaWithUser);
        localStorage.setItem('purchases', JSON.stringify(parsedCompras));
        toast.success("Compra realizada com sucesso");
      } else {
        toast.error("Você precisa estar logado para realizar uma compra");
      }
    } else {
      console.error("Há campos obrigatórios não preenchidos");
    }
  };

  return (
    <div>
      <form id="pizzaForm" onSubmit={onSubmit}>
        <h1>Coccina DiTrento</h1>
        <label
          className="centered-letter pt-5 ditrento-brand span"
          htmlFor="foodType"
        >
          <span>Faça </span>Seu<span> Pedido</span>
        </label>
        <div className="label-input-container">
          <label className="centered-letter" htmlFor="pizzaName"></label>
          <p className="centered-letter">Nome: {pizza.name}</p>
          <label className="centered-letter" htmlFor="pizzaPrice"></label>
          <p className="centered-letter">Total R${Number(pizza.price)}</p>

          <div id="pizzaOptions">
            <label className="centered-letter" htmlFor="pizzaSize"></label>
            <select
              className="centered-letter"
              id="pizzaSize"
              required
              name="size"
              value={pizza.size}
              onChange={handleChange}
            >
              <option value="">Escolha o Tamanho</option>
              <option value="Pequena">Pequena</option>
              <option value="Média">Média</option>
              <option value="Grande">Grande</option>
              <option value="Gigante">Gigante</option>
            </select>
            <label className="centered-letter" htmlFor="stuffedCrust"></label>
            <select
              className="centered-letter"
              id="stuffedCrust"
              required
              name="stuffed_pizza_edge"
              value={pizza.stuffed_pizza_edge}
              onChange={handleChange}
            >
              <option value="">Quer Borda Recheada?</option>
              <option value="true">Sim</option>
              <option value="false">Não</option>
            </select>
            {pizza.stuffed_pizza_edge === "true" && (
              <div id="crustFlavorOptions">
                <label htmlFor="crustFlavor"></label>
                <select
                  className="centered-letter"
                  id="crustFlavor"
                  name="flavor_stuffed_pizza_edge"
                  value={pizza.flavor_stuffed_pizza_edge}
                  onChange={handleChange}
                >
                  <option value="">Sabor da Borda</option>
                  <option value="Cream Cheese">Cream Cheese</option>
                  <option value="Catupiry">Catupiry</option>
                  <option value="Cheddar">Cheddar</option>
                </select>
              </div>
            )}
          </div>
        </div>
        <Flex justifyContent="space-between" alignSelf="end">
          <button className="button mx-2 px-2" onClick={handleBack}>Voltar</button>
          <button className="button" type="submit">Comprar</button>
        </Flex>
      </form>
    </div>
  );
}
