import React, { Component } from "react";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service"; // Adicione isso para obter o usuário atual
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

    this.loadUserPurchases();
  }

  loadUserPurchases() {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) {
      EventBus.dispatch("logout");
      return;
    }
    const allPurchases = JSON.parse(localStorage.getItem("purchases") || '[]');
    const userPurchases = allPurchases.filter((purchase: { userId: any; }) => purchase.userId === currentUser.id);
    this.setState({ purchases: userPurchases });
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
        <div>
          <ul>
            {this.state.purchases.map((purchase, index) => (
              <li key={index}>
                {purchase.name} - {purchase.size} {purchase.flavor_stuffed_pizza_edge ? 'com borda de ' + purchase.flavor_stuffed_pizza_edge : null} - R${purchase.price.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
