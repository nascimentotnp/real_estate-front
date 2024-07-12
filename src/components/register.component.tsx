import { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import AuthService from "../services/auth.service";
import withNavigation from "./withNavigation";
import { users } from "../services/data"; 

type Props = {
  navigate: any;
};

type State = {
  username: string,
  email: string,
  password: string,
  successful: boolean,
  message: string,
  role: string,
  isAdmin: boolean
};

class Register extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      message: "",
      role: "user", // Default role for standard users
      isAdmin: false // Assume not an admin initially
    };
  }

  componentDidMount() {
    // Check if the current user is an admin
    const currentUser = AuthService.getCurrentUser();
    if (currentUser && currentUser.role === "admin") {
      this.setState({ isAdmin: true });
    }
  }

  validationSchema() {
    return Yup.object().shape({
      username: Yup.string()
        .test(
          "len",
          "The username must be between 3 and 20 characters.",
          (val: any) =>
            val &&
            val.toString().length >= 3 &&
            val.toString().length <= 20
        )
        .required("This field is required!"),
      email: Yup.string()
        .email("This is not a valid email.")
        .required("This field is required!"),
      password: Yup.string()
        .test(
          "len",
          "The password must be between 6 and 40 characters.",
          (val: any) =>
            val &&
            val.toString().length >= 6 &&
            val.toString().length <= 40
        )
        .required("This field is required!"),
      role: Yup.string().required("This field is required!")
    });
  }

  handleRegister(formValue: { username: string; email: string; password: string; role: string }) {
    const { username, email, password, role } = formValue;

    this.setState({
      message: "",
      successful: false
    });

    AuthService.register(username, email, password, role).then(
      response => {
        this.setState({
          successful: true,
          message: "Registration successful!"
        });
        this.props.navigate("/login"); 
      },
      error => {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          successful: false,
          message: resMessage
        });
      }
    );
  }

  render() {
    const { successful, message, isAdmin } = this.state;

    const initialValues = {
      username: "",
      email: "",
      password: "",
      role: isAdmin ? "" : "user"
    };

    return (
      <div className="col-md-12">
        <div className="card card-container py-3">
          
          <Formik
            initialValues={initialValues}
            validationSchema={this.validationSchema}
            onSubmit={this.handleRegister}
          >
            <Form>
              {!successful && (
                <div>
                  <div className="form-group">
                    <label htmlFor="username"> Username </label>
                    <Field name="username" type="text" className="form-control" />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email"> Email </label>
                    <Field name="email" type="email" className="form-control" />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password"> Password </label>
                    <Field name="password" type="password" className="form-control" />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  {isAdmin && (
                    <div className="form-group">
                      <label htmlFor="role"> Role </label>
                      <Field as="select" name="role" className="form-control">
                        <option value="">Select a role</option>
                        {users.map((role: { id: number, role: string }) => (
                          <option key={role.id} value={role.role}>{role.role}</option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="role"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>
                  )}

                  {!isAdmin && (
                    <Field type="hidden" name="role" />
                  )}

                  <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                  </div>
                </div>
              )}

              {message && (
                <div className="form-group">
                  <div
                    className={successful ? "alert alert-success" : "alert alert-danger"}
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
              )}
            </Form>
          </Formik>
        </div>
      </div>
    );
  }
}

export default withNavigation(Register);
