import React from 'react';
import Proptypes from 'prop-types';

const Col = props => {
  const { text } = props;
  return (
    <div className="col">
      <span>{text}</span>
    </div>
  );
};

Col.propTypes = {
  text: Proptypes.any.isRequired,
};
export default Col;
