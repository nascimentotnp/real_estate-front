import React, { Component } from "react";
import "./Hero.css";
import { Link } from "react-router-dom";
import about from "../../../images/sections/about.svg";

class Hero extends Component<{}> {
  render() {
    return (
      <div className="hero py-5 mb-5">
        <div className="container">
          <div className="title pt-1 pb-5 text-center">
            <h4 className="sub-title">
              Nós somos a <span>DiTrento Pizzaria</span>
            </h4>
          </div>
          <div className="row align-items-center">
            <div className="c col-lg-6 col-12">
              <div className="left-side mb-lg-0 mb-5 text-lg-start text-center">
                <p className="desc mb-lg-4 mb-5">
                  Onde tradição e sabor se encontram para proporcionar a você a
                  melhor experiência em pizzas! Nossa história começa com uma
                  paixão inigualável pela culinária italiana e o desejo de
                  trazer um pedaço da Itália para a sua mesa.
                </p>
                <p className="desc mb-lg-4 mb-5">
                  {" "}
                  O nome DiTrento homenageia a província de Trento, de onde
                  nossa família imigrou para o Brasil no século 19. Essa rica
                  herança italiana é a base de tudo o que fazemos, desde as
                  receitas tradicionais até o cuidado com cada detalhe na
                  preparação de nossas pizzas.
                </p>
                
                <p className="desc mb-lg-4 mb-5">
                  Estamos comprometidos com a qualidade e a satisfação de nossos
                  clientes, proporcionando um ambiente acolhedor e familiar onde
                  você pode desfrutar de momentos especiais. Seja para um jantar
                  em família, um encontro com amigos ou uma comemoração
                  especial, a DiTrento é o lugar ideal para saborear o melhor da
                  pizza italiana.
                </p>
                <p className="desc mb-lg-4 mb-5">
                  Peça agora mesmo no site e descubra por que a DiTrento é
                  sinônimo de tradição, qualidade e sabor!
                </p>
              </div>
            </div>
            <div className="c col-lg-6 col-12">
              <div className="right-side text-lg-end text-center">
                <img className="w-75 img-fluid mb-5" src={about} alt="about" />
                <div className="mx-auto dc text-center">
                  <Link className="cources text-capitalize" to="/plans">
                    Escolha sua Pizza{" "}
                    <i className="fas fa-arrow-right ms-2"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Hero;
