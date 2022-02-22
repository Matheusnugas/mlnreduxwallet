import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Form from '../components/Form';
import { requestRates, fetchCurrencies as fetchAPI } from '../actions';
import ExpenseTable from '../components/ExpenseTable';
import './Wallet.css';
import walletImg from '../images/walletImage.png';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '0',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'alimentacao',
    };
    this.handleChange = this.handleChange.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
  }

  buttonClick() {
    const { setValue } = this.props;
    const { id } = this.state;
    setValue(this.state);
    // Aumenta o ID em 1 cada vez que clica no botão
    this.setState({ id: id + 1, value: '', description: '' });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <div className="title">
          <h1>
            Redux Wallet
          </h1>
          <img src={ walletImg } alt="wallet" />
        </div>

        <Header />
        <Form
          money={ value }
          description={ description }
          currency={ currency }
          metodo={ method }
          category={ tag }
          handleChange={ this.handleChange }
          buttonClick={ this.buttonClick }
          // Passando somente as chaves das currencies vindas da API
          currencies={ Object.keys(currencies) }
        />
        <ExpenseTable />
      </div>
    );
  }
}

Wallet.propTypes = {
  currencies: PropTypes.instanceOf(Object).isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => (
  {
    setValue: (payload) => dispatch(requestRates(payload)),
    fetchCurrencies: (payload) => dispatch(fetchAPI(payload)),
  }
);

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
