import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Col from '../col/Col';
import PropTypes from 'prop-types';

const Header = props => {
  const { columns } = props;

  return (
    <div className="header fixed">
      {columns.map(el => {
        return <Col key={el.key} text={el.title} />;
      })}
    </div>
  );
};

Header.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => {
  return {
    count: state.count,
  };
};

const mapDispatch = dispatch => ({
  setColWidth: payload => dispatch({ type: 'SET_COL_WIDTH', payload }),
});

export default connect(mapStateToProps, mapDispatch)(Header);
