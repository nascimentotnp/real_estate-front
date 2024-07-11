import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import IUser from "../types/user.type";

type Props = {};

type State = {
  redirect: string | null;
  userReady: boolean;
  currentUser: IUser & { accessToken: string };
};

export default class Profile extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { accessToken: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) {
      this.setState({ redirect: "/" });
    } else {
      this.setState({ currentUser: { ...currentUser, accessToken: "" }, userReady: true });
    }
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        {this.state.userReady && (
          <div>
            <header className="jumbotron">
              <h3>
                <strong>{currentUser.username}</strong> Profile
              </h3>
            </header>
            
            <p>
              <strong>Id:</strong> {currentUser.id}
            </p>
            <p>
              <strong>Email:</strong> {currentUser.email}
            </p>
            <p>
              <strong>user:</strong> {currentUser.username}
            </p>
            <p>
              <strong>Role:</strong> {currentUser.role}
            </p>
            
          </div>
        )}
      </div>
    );
  }
}
