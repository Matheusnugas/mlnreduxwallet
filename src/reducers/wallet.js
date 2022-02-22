// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { RECEIVE_CURRENCIES, SEND_WALLET_DATA, RM_EXPENSE_ID } from '../actions';

const INITIAL_STATE = {
  currencies: {},
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  const { expense, rates } = action;
  switch (action.type) {
  case SEND_WALLET_DATA:
    // Colocando a chave exchangeRates das expenses já como as rates retornadas da API. Ideia retirada do github do colega Leonardo Henrique (leonardohenriquedev).
    expense.exchangeRates = rates;
    return {
      ...state,
      expenses: [...state.expenses, expense],
    };
  case RECEIVE_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };
  case RM_EXPENSE_ID:
    return { ...state,
      expenses: state.expenses
        .filter((item) => item.id !== action.payload),
    };
  default:
    return state;
  }
};

export default walletReducer;
