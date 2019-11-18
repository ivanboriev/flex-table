import React from 'react';
import PropTypes from 'prop-types';
import Col from '../col/Col';

const DataTable = props => {
  const { item, dataKeys } = props;
  return (
    <div className="panel data">
      {dataKeys.map(el => {
        return <Col text={item[el]} />;
      })}
    </div>
  );
};

DataTable.propTypes = {
  item: PropTypes.shape(PropTypes.string, PropTypes.bool, PropTypes.number).isRequired,
};

export default DataTable;
