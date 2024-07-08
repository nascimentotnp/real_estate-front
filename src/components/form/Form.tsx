import React, { useEffect, useState, useCallback } from "react";
import Button from "../button/Button";
import { useNavigate } from 'react-router-dom';
import "./Form.css";
import SweetAlertWrapper from "../sweetAlert/SweetAlertWrapper";

interface Pizza {
  name: string;
  basePrice: number;
  filling: string;
  size: string;
  stuffed_pizza_edge: string;
  flavor_stuffed_pizza_edge: string;
  price: number;
}

interface FormErrors {
  [key: string]: string;
}

function Formulary() {
  const navigate = useNavigate();

  const [pizza, setPizza] = useState<Pizza>({
    name: "",
    basePrice: 0.00,
    filling: "",
    size: "",
    stuffed_pizza_edge: "",
    flavor_stuffed_pizza_edge: "",
    price: 0,
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const storedPizza = JSON.parse(localStorage.getItem("selectedPizza") || '{}');
    if (storedPizza) {
      setPizza({
        ...storedPizza,
        size: "",
        stuffed_pizza_edge: "",
        flavor_stuffed_pizza_edge: "",
        price: 0,
      });
    }
  }, []);

  const checkUserLoggedIn = () => {
    const isLoggedIn = localStorage.getItem('userLoggedIn');
    if (isLoggedIn) {
      let purchases = JSON.parse(localStorage.getItem("purchases") || '[]');
      purchases.push(pizza);
      localStorage.setItem("purchases", JSON.stringify(purchases));
      console.log("Pizza enviada:", pizza);
      navigate('/purchase');
    } else {
      localStorage.setItem("pendingPizza", JSON.stringify(pizza));
      navigate('/login');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: FormErrors = {};
    Object.keys(pizza).forEach((key) => {
      if (!pizza[key as keyof Pizza] && key !== "flavor_stuffed_pizza_edge") {
        errors[key] = "Este campo é obrigatório";
      }
    });
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      checkUserLoggedIn();
      setShowAlert(true);
    } else {
      console.error("Há campos obrigatórios não preenchidos");
    }
  };

  return (
    <div>
      <SweetAlertWrapper
        show={showAlert}
        icon="success"
        title="Compra Realizada com Sucesso!"
        html={`Você comprou uma pizza ${pizza.name} por R$${pizza.price}.`}
        onConfirm={() => {
          setShowAlert(false);
          navigate('/purchase');
        }}
      />
      <form onSubmit={handleSubmit} id="pizzaForm">
        <h1>Coccina DiTrento</h1>
        <label className="centered-letter pt-5 ditrento-brand span" htmlFor="foodType">
          <span>Faça </span>Seu<span> Pedido</span>
        </label>
        <div className="label-input-container">
          <label className="centered-letter" htmlFor="pizzaName"></label>
          <p className="centered-letter">
            Nome: {pizza.name}
          </p>
          <label className="centered-letter" htmlFor="pizzaPrice"></label>
          <p className="centered-letter">Total R${Number(pizza.price).toFixed(2)}</p>

          <div id="pizzaOptions">
            <label className="centered-letter" htmlFor="pizzaSize"></label>
            <select className="centered-letter"
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
            <select className="centered-letter"
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
                <select className="centered-letter"
                  id="crustFlavor"
                  name="flavor_stuffed_pizza_edge"
                  value={pizza.flavor_stuffed_pizza_edge}
                  onChange={handleChange}
                >
                  <option value="">Sabor da Borda</option>
                  <option value="creamCheese">Cream Cheese</option>
                  <option value="catupiry">Catupiry</option>
                  <option value="cheddar">Cheddar</option>
                </select>
              </div>
            )}
          </div>
        </div>
        <div className="centered-button">
          <Button>Comprar</Button>
        </div>
      </form>
    </div>
  );
}

export default Formulary;
