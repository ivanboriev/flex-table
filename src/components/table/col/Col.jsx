import React from 'react';
import Proptypes from 'prop-types';

const Col = props => {
  const { text, left } = props;
  return (
    <div className={left ? 'col text-left' : 'col'}>
      <span>{text}</span>
    </div>
  );
};

Col.defaultProps = {
  left: false,
};

Col.propTypes = {
  text: Proptypes.any.isRequired,
  left: Proptypes.bool,
};
export default Col;
