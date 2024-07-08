import React, { useState, useEffect } from "react";
import "./Pizza.css";

function Pizza() {
  const [pizzas, setPizzas] = useState<any[]>([]); 
  useEffect(() => {
    loadPizzasFromStorage();
  }, []);

  const loadPizzasFromStorage = () => {
    const purchasedPizzas = JSON.parse(localStorage.getItem("purchases") || '[]');
    setPizzas(purchasedPizzas);
  };

  return (
    <section className='pizza'>
      <div>
        <h2>Lista de Pizzas Compradas</h2>
        <ul>
          {pizzas.map((pizza: any, index: number) => (
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
    </section>
  );
}

export default Pizza;
