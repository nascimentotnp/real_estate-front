import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
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
        if (item.public) {
          return !currentUser;
        }
        return currentUser;
      })
      .map((item: NavbarItem, index: number) => {
        const IconComponent = item.icon;

        return (
          <li className="nav-item me-lg-3 my-lg-0 my-2" key={index}>
            <NavLink
              className="nav-link text-capitalize position-relative hover"
              to={`/${item.name === '' ? '' : item.name}`}
              title={item.name === '' ? 'home' : item.name}
            >
              <IconComponent
                className={`me-2 nav-item-icon ${item.animated ? 'animate-icon' : ''}`}
                title={item.name === '' ? 'home' : item.name}
              />
            </NavLink>
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
    const { currentUser, showModeratorBoard, showAdminBoard, logOut } = this.props;

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
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">{this.display_navbar_items()}</ul>

            <ul className="navbar-nav">
              {showModeratorBoard && (
                <li className="nav-item">
                  <Link to={"/mod"} className="nav-link">
                    Moderator Board
                  </Link>
                </li>
              )}

              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
              )}

              {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    Usuário
                  </Link>
                </li>
              )}
            </ul>

            {currentUser && (
              <ul className="navbar-nav ml-auto">
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
