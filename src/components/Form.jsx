/* eslint-disable max-len */
/* eslint-disable react/jsx-max-depth */
import PropTypes from 'prop-types';
import React from 'react';
import './Form.css';

class Form extends React.Component {
  render() {
    const { handleChange,
      money,
      description,
      currency, metodo,
      category,
      buttonClick,
      currencies } = this.props;
    return (
      <div className="moneyFormWrap">
        <form className="moneyForm">
          <label htmlFor="money">
            Despesa:
            <input
              placeholder="1000"
              type="number"
              value={ money }
              min="0"
              step="0.01"
              data-number-to-fixed="2"
              data-number-stepfactor="100"
              name="value"
              data-testid="value-input"
              onChange={ handleChange }
              id="moneyInput"
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              value={ description }
              name="description"
              data-testid="description-input"
              onChange={ handleChange }
              id="descricao"
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              value={ currency }
              name="currency"
              data-testid="currency-input"
              onChange={ handleChange }
              id="currency"
            >
              {currencies.filter((curr) => curr !== 'USDT').map((curr) => (
                <option data-testid={ curr } key={ curr } value={ curr }>{curr}</option>
              ))}
            </select>
          </label>
          <label htmlFor="metodo">
            Método de pagamento:
            <select
              value={ metodo }
              name="method"
              data-testid="method-input"
              onChange={ handleChange }
              id="metodo"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
            <label htmlFor="category">
              Categoria:
              <select
                onChange={ handleChange }
                value={ category }
                name="tag"
                data-testid="tag-input"
                id="category"
              >
                <option value="Alimentação">Alimentação</option>
                <option value="Lazer">Lazer</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Transporte">Transporte</option>
                <option value="Saúde">Saúde</option>
              </select>
            </label>
          </label>
          <button id="submitExpense" type="button" onClick={ buttonClick }>Adicionar despesa</button>
        </form>
      </div>

    );
  }
}

Form.propTypes = {
  buttonClick: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  currencies: PropTypes.instanceOf(Array).isRequired,
  currency: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  metodo: PropTypes.string.isRequired,
  money: PropTypes.string.isRequired,
};

export default Form;
