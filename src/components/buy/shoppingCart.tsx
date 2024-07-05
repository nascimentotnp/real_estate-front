import React, { Component } from "react";

type State = {
  cartItems: any[];
};

class Cart extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      cartItems: []
    };
  }

  componentDidMount() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    this.setState({ cartItems });
  }

  render() {
    const { cartItems } = this.state;

    return (
      <div className="container">
        <h2>Carrinho de Compras</h2>
        {cartItems.length > 0 ? (
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>{item.name} - {item.price}</li>
            ))}
          </ul>
        ) : (
          <p>O carrinho está vazio</p>
        )}
      </div>
    );
  }
}

export default Cart;
