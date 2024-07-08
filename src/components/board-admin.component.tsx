import { Component } from "react";
import IUser from "../types/user.type";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

type Props = {
  currentUser: IUser | undefined;
};

type State = {
  content: string;
};

export default class BoardAdmin extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    const { currentUser } = this.props;

    if (currentUser && currentUser.role && currentUser.role.includes("ROLE_ADMIN")) {
      UserService.getAdminBoard().then(
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
    } else {
      this.setState({
        content: "Acesso negado: Você não tem permissão para acessar esta página."
      });
    }
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
      </div>
    );
  }
}
