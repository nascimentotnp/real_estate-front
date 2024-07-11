import React, { useState, useEffect } from "react";
import "./Pizza.css";
import { pizzas as pizzaData } from "./data";

function Pizza() {
  const [purchases, setPurchases] = useState<any[]>([]);

  useEffect(() => {
    loadPizzasFromStorage();
  }, []);

  const loadPizzasFromStorage = () => {
    const purchasedPizzas = JSON.parse(localStorage.getItem("purchases") || '[]');
    setPurchases(purchasedPizzas);
  };

  return (
    <section className='pizza'>
      <div>
        <ul>
          {purchases.map((pizza: any, index: number) => (
            <li key={index}>
              <strong>Sabor:</strong> {pizza.name} - <strong>Preço:</strong> R${pizza.price.toFixed(2)}
              <br />
              <strong>Tamanho:</strong> {pizza.size}
              {pizza.stuffed_pizza_edge === "true" && (
                <span> - <strong>Borda Recheada:</strong> {pizza.flavor_stuffed_pizza_edge}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Lista de Pizzas Disponíveis</h2>
        <ul>
          {pizzaData.map((pizza: any) => (
            <li key={pizza.id}>
              <strong>Nome:</strong> {pizza.name} - <strong>Ingredientes:</strong> {pizza.text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Pizza;


