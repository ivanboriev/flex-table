import React from 'react';
import Col from '../col/Col';
import PropTypes from 'prop-types';

const Header = props => {
  const { columns } = props;

  return (
    <div className="header">
      {columns.map(el => {
        return <Col key={el.key} text={el.title} />;
      })}
    </div>
  );
};

Header.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default Header;
