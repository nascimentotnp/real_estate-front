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
                <h3 className="title text-capitalize">
                  Bem-vindo a Pizzaria <span>DiTrento</span>!
                </h3>
                <p className="sub-title text-muted text-capitalize">
                  Onde seu futuro começa
                </p>
                <p className="desc pb-3">
                  Tenha uma ERP de Qualidade para o seu suporte técnico e
                  manutenção
                </p>
                <div className="buttons">
                  <Link
                    className="btn btn-primary text-capitalize me-3 shadow btn-custom"
                    to="/sobre"
                  >
                    Saiba mais<i className="ms-2 fas fa-chevron-right"></i>
                  </Link>
                  <Link
                    className="btn btn-outline-custom text-capitalize shadow"
                    to="/plans"
                  >
                    Conheça nossos Sabores<i className="ms-2 fas fa-chevron-right"></i>
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
