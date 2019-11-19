import React from 'react';
import PropTypes from 'prop-types';
import Col from '../col/Col';

const DataTable = props => {
  const { item, dataKeys } = props;
  return (
    <div className="panel data">
      {dataKeys.map((el, i) => {
        return el === 'date' ? (
          <Col text="" />
        ) : (
          <Col key={`col-${item.id}-${i}`} text={item[el]} left={el === 'name' ? true : false} />
        );
      })}
    </div>
  );
};

DataTable.defaultProps = {
  item: {},
};

DataTable.propTypes = {
  item: PropTypes.shape(PropTypes.string, PropTypes.bool, PropTypes.number),
  dataKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default DataTable;
