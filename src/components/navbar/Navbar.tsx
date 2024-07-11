import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { navbar_items, NavbarItem } from "./Data";
import IUser from "../../types/user.type";

interface NavbarProps {
  currentUser: IUser | undefined;
  showModeratorBoard: boolean;
  showAdminBoard: boolean;
  logOut: () => void;
}

interface NavbarState {
  s: boolean;
}

class Navbar extends Component<NavbarProps, NavbarState> {
  state: NavbarState = { s: false };

  display_navbar_items = (): JSX.Element[] => {
    const { currentUser } = this.props;

    return navbar_items
      .filter((item: NavbarItem) => {
        if (item.name === "Login" && currentUser) {
          return false; 
        }
        if (item.name === "Registrar" && currentUser?.role === "user") {

          return false; 
        }
        if (item.public) {
          return true;
        }
        if (currentUser && currentUser.role) {
          return item.roles.includes(currentUser.role);
        }
        return false;
      })
      .map((item: NavbarItem, index: number) => {
        const IconComponent = item.icon;

        return (
          <li className="nav-item me-lg-3 my-lg-0 my-2" key={index}>
            <Link
              className="nav-link text-capitalize position-relative hover"
              to={`/${item.name === '' ? '' : item.name}`}
              title={item.name === '' ? 'home' : item.name}
            >
              <IconComponent
                className={`me-2 nav-item-icon ${item.animated ? 'animate-icon' : ''}`}
                title={item.name === '' ? 'home' : item.name}
              />
            </Link>
          </li>
        );
      });
  };

  add_shadow = (): void => {
    window.scrollY >= 80
      ? this.setState({ s: true })
      : this.setState({ s: false });
  };

  componentDidMount() {
    window.addEventListener("scroll", this.add_shadow);
    document.addEventListener("DOMContentLoaded", this.add_shadow);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.add_shadow);
    document.removeEventListener("DOMContentLoaded", this.add_shadow);
  }

  render() {
    const { currentUser, showAdminBoard, logOut } = this.props;

    return (
      <nav className={`navbar navbar-expand-lg navbar-light text-dark fixed-top ${this.state.s ? "shadow-xs" : "shadow"}`}>
        <div className="container">
          <Link className="navbar-brand px-0" to="/">
            <span>Di</span>Trento<span> 0.1</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">{this.display_navbar_items()}</ul>

            {currentUser && (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={logOut}>
                    Sair
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
