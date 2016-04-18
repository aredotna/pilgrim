import Q from 'bluebird-q';
import { default as React, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { loginSuccess, startLoading, stopLoading } from '../../actions/index';
import login from '../../api/login';

const { APP_URL } = process.env;

class LoginForm extends React.Component {
  render() {
    const {
      fields: { email, password },
      handleSubmit,
      submitting,
    } = this.props;

    return (
      <div className="l-login-form">
        <form onSubmit={handleSubmit(submit)}>
          <input type="email" placeholder="Email" {...email}/>
          <input type="password" placeholder="Password" {...password}/>
          {password.touched && password.error && <div>{password.error}</div>}
          <button type="submit" disabled={submitting}>
            {submitting ? <i/> : <i/>} Login to Are.na
          </button>
        </form>
      </div>
    );
  }
}


const submit = (values, dispatch) => {
  return Q.promise((resolve, reject) => {
    dispatch(startLoading());
    login(values)
      .then(({ user }) => {
        dispatch(loginSuccess(user));
        dispatch(stopLoading());
        resolve(user);
      })
      .catch((err) => {
        dispatch(stopLoading());
        reject({ password: 'Invalid credentials', _error: 'Login failed!' });
      })
  })
};

export default reduxForm({
  form: 'login',
  fields: [ 'email', 'password' ]
})(LoginForm);
