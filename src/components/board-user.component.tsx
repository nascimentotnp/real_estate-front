import React, { Component } from "react";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

type Props = {};

type State = {
  content: string;
  purchases: any[];
};

export default class BoardUser extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: "",
      purchases: []
    };
  }

  componentDidMount() {
    UserService.getUserBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );

    const purchases = JSON.parse(localStorage.getItem("purchases") || '[]');
    this.setState({ purchases });
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
        <div>
          <h4>Compras Realizadas</h4>
          <ul>
            {this.state.purchases.map((purchase, index) => (
              <li key={index}>
                {purchase.name} - {purchase.size} - R${purchase.price.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
