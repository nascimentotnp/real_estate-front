import React, { useState, useEffect } from "react";
import "./Pizza.css";

interface PizzaPurchase {
  name: string;
  price: number;
  size: string;
  stuffed_pizza_edge: boolean;
  flavor_stuffed_pizza_edge?: string;
}

function Pizza() {
  const [purchases, setPurchases] = useState<PizzaPurchase[]>([]);

  useEffect(() => {
    loadPizzasFromStorage();
  }, []);

  const loadPizzasFromStorage = () => {
    const purchasedPizzas = JSON.parse(localStorage.getItem("purchases") || "[]") as PizzaPurchase[];
    setPurchases(purchasedPizzas);
  };

  return (
    <section className="pizza">
      <div>
        <h2>Pizzas vendidas</h2>
        <ul>
          {purchases.map((pizza, index) => (
            <li key={index}>
              <strong>Sabor:</strong> {pizza.name} - <strong>Preço:</strong> R${pizza.price.toFixed(2)}
              <br />
              <strong>Tamanho:</strong> {pizza.size}
              {pizza.stuffed_pizza_edge && (
                <span> - <strong>Borda Recheada:</strong> {pizza.flavor_stuffed_pizza_edge}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Pizza;
