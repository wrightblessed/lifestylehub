import React from "react";
import { withRouter } from "react-router-dom";
import "tachyons";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import LoaderSmall from "../Loaders/LoaderSmall";
import "./Register.css";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,3})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      errMessage: ""
    };
  }

  render() {
    return (
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          role: "99",
          phone: "",
          photo: null,
          password: "",
          confirmPassword: ""
        }}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().required("First Name is required"),
          lastName: Yup.string().required("Last Name is required"),
          email: Yup.string()
            .email("Email is invalid")
            .required("Email is required"),
          phone: Yup.string()
            .length(11, "Please enter a valid Mobile number")
            .matches(
              phoneRegExp,
              "Invalid format. Please enter a valid Mobile number"
            ),
          photo: Yup.mixed(),
          password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm Password is required")
        })}
        onSubmit={({ firstName, lastName, email, phone, photo, password }) => {
          // console.log(photo.name);
          // console.log(photo.type);
          // console.log(`${photo.size} bytes`);
          this.setState({
            disabled: true
          });
          fetch("https://lshub.herokuapp.com/api/v1/auth/register", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              firstname: firstName,
              lastname: lastName,
              email: email,
              role: "99",
              password: password
            }),
            redirect: "follow"
          })
            .then(response => response.json())
            .then(user => {
              this.setState({
                disabled: false
              });
              switch (user.status) {
                case "success":
                  this.props.history.push("/confirmation");
                  break;
                case "fail":
                  this.setState({
                    disabled: false,
                    errMessage: "Error" + user.message
                  });
                  break;
                default:
                  this.setState({
                    disabled: false,
                    errMessage: user.message
                  }).catch(err => {
                    this.setState({
                      disabled: false,
                      errMessage: "Error" + err
                    });
                  });
              }
            });
        }}
        render={({ errors, touched, setFieldValue }) => (
          <article className="br3 mv4 w-100 w-50 w-25-1 mw6 center">
            <Form className="pa4">
              <div className="measure">
                <fieldset id="register" className="register-box">
                  <div className="label">
                    <h1>Register</h1>
                  </div>

                  <div className="w-100">
                    {this.state.disabled === true ? <LoaderSmall /> : ""}
                    <p className="p-0" style={{ color: "brown" }}>
                      {this.state.errMessage}
                    </p>
                  </div>
                  <div className="mt4">
                    <Field
                      type="text"
                      name="firstName"
                      id="name"
                      placeholder="First Name*"
                      className={
                        "form-control b pa2 input-reset  bg-transparent hover-white w-100 name-box" +
                        (errors.firstName && touched.firstName
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="mt4">
                    <Field
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="Last Name*"
                      className={
                        "form-control b pa2 input-reset  bg-transparent hover-white w-100 name-box" +
                        (errors.lastName && touched.lastName
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="mt4">
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email*"
                      className={
                        "form-control b pa2 input-reset  bg-transparent hover-white w-100 email-box" +
                        (errors.email && touched.email ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="mt4">
                    <Field
                      type="phone"
                      name="phone"
                      id="phone"
                      placeholder="Phone"
                      className={
                        "form-control b pa2 input-reset  bg-transparent hover-white w-100 phone-box" +
                        (errors.phone && touched.phone ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="mt4">
                    <input
                      type="file"
                      name="photo"
                      id="photo"
                      placeholder="Photo"
                      onChange={event => {
                        setFieldValue("photo", event.currentTarget.files[0]);
                      }}
                      className={
                        "form-control b pa2 input-reset  bg-transparent hover-white w-100 photo-box " +
                        (errors.photo && touched.photo ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="file"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="mv4">
                    <Field
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password *"
                      className={
                        " form-control pa2 input-reset bg-transparent hover-white w-100 password-box" +
                        (errors.password && touched.password
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="mv4">
                    <Field
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      className={
                        " form-control pa2 input-reset bg-transparent hover-white w-100 password-box" +
                        (errors.confirmPassword && touched.confirmPassword
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </fieldset>
                <div className="button-box">
                  <input
                    className="b ph3 pv2 input-reset ba bg-transparent grow pointer f6"
                    type="submit"
                    value="Sign In"
                    disabled={this.state.disabled}
                  />
                </div>
              </div>
            </Form>
          </article>
        )}
      />
    );
  }
}

export default withRouter(Register);