import { Component } from "react";
import { Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import IUser from "./types/user.type";

import Register from "./components/register.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardAdmin from "./components/board-admin.component";

import EventBus from "./common/EventBus";
import ScroolButton from "./components/scroolButton/ScroolButton";
import Navbar from "./components/navbar/Navbar";
import Login from "./components/login/login.component";
import Footer from "./components/footer/Footer";
import About from "./components/about/About";
import Landing from "./components/landing/Landing";
import Notfound from "./components/notfound/Notfound";
import Plans from "./components/plans/Plans";
import Pizza from "./components/pizza/Pizza";
import Formulary from "./components/form/Form";
import { ToastContainer } from "react-toastify";

type Props = {};

type State = {
  showModeratorBoard: boolean;
  showAdminBoard: boolean;
  currentUser: IUser | undefined;
};

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
       
      });
    }

    EventBus.on("logout", this.logOut);
  }

  componentWillUnmount() {
    EventBus.remove("logout", this.logOut);
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div>
        <ScroolButton />
        <div className="_navbar">
          <Navbar
            currentUser={currentUser}
            showModeratorBoard={showModeratorBoard}
            showAdminBoard={showAdminBoard}
            logOut={this.logOut}
          />
        </div>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registrar" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/compras" element={<BoardUser />} />
            <Route path="/admin" element={<BoardAdmin currentUser={undefined} />} />
            <Route path="/sobre" element={<About />} />
            <Route path="*" element={<Notfound />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/pizzas" element={< Pizza/>}/>
            <Route path="/pizza/:id" element={<Formulary />} />
          </Routes>
        </div>
        <div className="_footer">
          <Footer />
        </div>
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
