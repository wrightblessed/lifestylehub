import React from 'react';
import { withRouter } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

class Signin extends React.Component {
    render() {
        return (
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email('Email is invalid')
                        .required('Email is required'),

                    password: Yup.string()
                        .min(6, 'Password must be at least 6 characters')
                        .required('Password is required')
                })}
                onSubmit={({ email, password }) => {
                    console.log(email, password);

                    // fetch('https://pacific-hollows-12017.herokuapp.com/signin',{
                    fetch('https://pacific-hollows-12017.herokuapp.com/signin', {
                        method: 'post',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email: email,
                            password: password
                        })
                    })
                        .then(response => response.json())
                        .then(user => {
                            if (user.id) {
                                switch (user.accounttype) {
                                    case 'subscriber':
                                        this.setState({ errMessage: 'invalid login credentials' });
                                        break;
                                    default:
                                        this.props.loadUser(user);
                                        this.props.history.push('/dashboard');
                                        break;
                                }

                            } else {
                                this.setState({ errMessage: user });
                            }
                        })

                }}

                render={({ errors, touched }) => (
                    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-1 mw6 shadow-5 center" style={{ backgroundColor: 'rgba(150, 150, 150, 1)' }}>
                        <Form className="pa4 black-80">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f4 fw76 ph0 mh0">Sign In</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email">Email</label>
                                    <Field
                                        name="email"
                                        type="email"
                                        id="email"
                                        className={"form-control b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" + (errors.email && touched.email ? ' is-invalid' : '')}
                                    />
                                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <Field
                                        name="password"
                                        type="password"
                                        id="password"
                                        className={"form-control b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" + (errors.password && touched.password ? ' is-invalid' : '')}
                                    />
                                    <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                </div>
                            </fieldset>
                            <div className="">
                                <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib mr-2" type="submit" value="Sign In" />
                                <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="reset" value="Reset" />
                            </div>
                        </Form>
                    </article>

                )}
            />
        )
    }
}

export default withRouter(Signin);