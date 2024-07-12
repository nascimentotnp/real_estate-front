import React, { Component } from "react";
import { flavors } from "./Data";
import "./Section.css";
import { NavLink } from "react-router-dom";
import Button from "../../../button/Button";

interface Flavor {
  image: undefined | any | string;
  text: string;
  id: number;
  price?: number;
}

class Section extends Component {
  handleBuyClick = (item: Flavor) => {
    localStorage.setItem("selectedPizza", JSON.stringify(item));
  };

  display_section = () => {
    let items = flavors.map((item, index) => {
      return (
        <div className="b mb-5 text-center p-3 shadow rounded m-2" key={index}>
          <img
            className="img-fluid mb-3"
            src={item.image}
            alt="pizza"
          />
          <p className="title">{item.text}</p>
          <Button className="btn-sm btn-custom">
            <NavLink
              className="nav-link position-relative btn-custom hover"
              to={`/pizza/${item.id}`}
              onClick={() => this.handleBuyClick(item)}
            >
              Comprar <i className="ms-2 fas fa-chevron-right"></i>
            </NavLink>
          </Button>
        </div>
      );
    });
    return items;
  };

  render() {
    return (
      <div className="s1 py-5">
        <div className="container">
          <div className="d d-flex flex-wrap justify-content-center">
            {this.display_section()}
          </div>
        </div>
      </div>
    );
  }
}

export default Section;
