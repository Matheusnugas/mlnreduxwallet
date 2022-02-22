/* eslint-disable eol-last */
// Coloque aqui suas actions
export const SEND_PERSONAL_DATA = 'SEND_PERSONAL_DATA';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
export const SEND_WALLET_DATA = 'SEND_WALLET_DATA';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const RM_EXPENSE_ID = 'RM_EXPENSE_ID';

export const sendPersonalData = (payload) => ({
  type: SEND_PERSONAL_DATA,
  payload,
});

// Action com 2 argumentos para recuperar o gasto e os rates da API.
export const sendWalletData = (expense, rates) => ({
  type: SEND_WALLET_DATA,
  expense,
  rates,
});

const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES });

const receiveCurrencies = (currencies) => ({
  type: RECEIVE_CURRENCIES,
  currencies,
});

export const removeExpense = (payload) => ({
  type: RM_EXPENSE_ID,
  payload,
});

export const fetchCurrencies = () => (dispatch) => {
  dispatch(requestCurrencies());
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((payload) => dispatch(receiveCurrencies(payload)));
};

// Ideia da função pelo colega Leonardo Henrique github leonardohenriquedev.
export const requestRates = (expense) => (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
  .then((response) => response.json())
  .then((rates) => dispatch(sendWalletData(expense, rates)));
