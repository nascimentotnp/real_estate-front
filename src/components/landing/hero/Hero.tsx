import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";
import hero from "../../../images/sections/hero.svg";

class Hero extends Component<{}> {
  render() {
    return (
      <div className="hero py-5 mb-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="c col-lg-6 col-12">
              <div className="left-side mb-lg-0 mb-5 text-lg-start text-center">
                <h3 className="title py-5">
                  Bem-vindo a Pizzaria <span>DiTrento</span>!
                </h3>
                <p className="desc mb-lg-4 mb-5">
                  Na DiTrento, acreditamos que uma pizza perfeita é uma
                  combinação de ingredientes frescos, técnicas artesanais e amor
                  pelo que fazemos. Cada pizza é preparada com massa de
                  fermentação lenta, ingredientes selecionados e receitas que
                  foram passadas de geração em geração. Nosso cardápio oferece
                  uma variedade de sabores autênticos, desde as clássicas
                  Muçarela e Calabresa até as nossas criações exclusivas, todas
                  assadas em forno a lenha para garantir uma crocância e sabor
                  inigualáveis. Além das pizzas, contamos com uma seleção de
                  entradas, saladas e sobremesas que complementam perfeitamente
                  a sua refeição.
                </p>
                <div className="buttons">
                  <Link
                    className="btn text-capitalize me-3 shadow btn-custom"
                    to="/sobre"
                  >
                    Conheça nossa História<i className="fas fa-arrow-right ms-2"></i>
                  </Link>
                  <Link
                    className="btn btn-outline-custom text-capitalize shadow"
                    to="/plans"
                  >
                    Conheça nossos Sabores
                    <i className="fas fa-arrow-right ms-2"></i>
                  </Link>
                </div>
              </div>
            </div>

            <div className="c col-lg-6 col-12">
              <div className="right-side text-lg-end text-center">
                <img className="w-75 img-fluid" src={hero} alt="hero" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Hero;
