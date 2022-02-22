import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import './Header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.findTotal = this.findTotal.bind(this);
  }

  findTotal() {
    const { expenses } = this.props;
    let total = '';
    for (let i = 0; i < expenses.length; i += 1) {
      const sum = Number(
        Number(expenses[i].value)
          * Number(expenses[i].exchangeRates[expenses[i].currency].ask),
      ).toFixed(2);
      total = Number(total) + Number(sum);
    }
    return Number(total);
  }

  render() {
    const { user } = this.props;
    return (
      <div className="headerWrapper">
        <p data-testid="email-field" className="emailField">{user.email}</p>
        <p data-testid="total-field" className="totalField">
          Dinheiro gasto:
          {this.findTotal()}
          {' '}
          BRL 🇧🇷
        </p>
      </div>
    );
  }
}

Header.propTypes = {
  expenses: PropTypes.instanceOf(Array).isRequired,
  user: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Header);
