/* eslint-disable react/jsx-max-depth */
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { sendPersonalData } from '../actions';
import loginImg from '../images/login-image.png';
import moneyImg from '../images/moneyImage.png';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      buttonDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateButton = this.validateButton.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value }, () => {
      this.validateButton();
    });
  }
  // Funcao para fazer a validação do botão

  validateButton() {
    let buttonState = true;
    const minLength = 6;
    const { email, password } = this.state;
    if (email.includes('@') && email.includes('.com') && password.length >= minLength) {
      buttonState = false;
    } else {
      buttonState = true;
    }
    this.setState({ buttonDisabled: buttonState });
  }

  // Função para fazer a mudança da rota ao clicar no botão. Funcao essa para ser chamada em buttonClick();
  routeChange() {
    const { history } = this.props;
    const path = '/carteira';
    history.push(path);
  }

  // Função utilizada no clique do botão para enviar as informações para o estado global e modificar a rota;
  buttonClick() {
    const { setValue } = this.props;
    const { email } = this.state;
    setValue(email);
    this.routeChange();
  }

  render() {
    const { email, password, buttonDisabled } = this.state;
    return (
      <div className="loginPage">
        <div className="loginWrapper">
          <h1>
            Money Saver
            {' '}
            <span><img src={ moneyImg } alt="money" /></span>
          </h1>
          <div className="formWrapper">
            <form>
              <label htmlFor="emailInput">
                E-mail:
                <input
                  type="email"
                  data-testid="email-input"
                  name="email"
                  value={ email }
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="passworldInput">
                Password:
                <input
                  type="password"
                  data-testid="password-input"
                  name="password"
                  value={ password }
                  onChange={ this.handleChange }
                />
              </label>
              <button
                type="button"
                className="formButton"
                disabled={ buttonDisabled }
                onClick={ this.buttonClick }
              >
                Entrar

              </button>
            </form>
            <img src={ loginImg } alt="illustration" />
          </div>
        </div>
      </div>

    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  setValue: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => (
  {
    setValue: (payload) => dispatch(sendPersonalData(payload)),
  }
);

export default connect(null, mapDispatchToProps)(Login);
