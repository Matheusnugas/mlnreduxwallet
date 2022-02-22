import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import './ExpenseTable.css';
import { removeExpense } from '../actions/index';

class ExpenseTable extends React.Component {
  render() {
    const { expenses, removeBtn } = this.props;
    return (
      <div className="tableWrapper">
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
            {expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>
                  {expense.description}
                </td>
                <td>
                  {expense.tag}
                </td>
                <td>
                  {expense.method}
                </td>
                <td>
                  {expense.value}
                </td>
                <td>
                  {expense.exchangeRates[expense.currency].name}
                </td>
                <td>
                  {Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}
                </td>
                <td>
                  { (expense.value * expense.exchangeRates[expense.currency].ask)
                    .toFixed(2) }
                </td>
                <td>
                  Real
                </td>
                <td className="buttonCell">
                  <button
                    type="button"
                    id="deleteButton"
                    onClick={ () => removeBtn(expense.id) }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </thead>
        </table>
      </div>
    );
  }
}

ExpenseTable.propTypes = {
  expenses: PropTypes.instanceOf(Array).isRequired,
  removeBtn: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  removeBtn: (id) => dispatch(removeExpense(id)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
