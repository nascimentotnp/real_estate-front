import React, { useState, useEffect } from "react";
import "./Pizza.css";
import { flavors } from "../plans/sections/section1/Data";

interface Flavor {
  image: any;
  text: string;
  id: number;
  price?: number;
}

function Pizza() {
  const [pizza, setPizza] = useState<Flavor[]>([]);

  useEffect(() => {
    getPizza();
  }, []);

  const getPizza = () => {
    // Simula a busca de dados
    setPizza(flavors);
  };

  return (
    <section className='pizza'>
      <div>
        <h2>Lista de Pizzas</h2>
        <ul>
          {pizza.map(pizza => (
            <li key={pizza.id}>
              <strong>Sabor:</strong> {pizza.text} - <strong>Preço:</strong> {pizza.price}
              <a href={`/pizza/${pizza.id}`}>Editar</a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Pizza;
