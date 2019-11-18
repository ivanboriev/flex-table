import React from 'react';
import PropTypes from 'prop-types';
import Header from './header/Header';
import Body from './body/Body';
import './Table.scss';

const Table = props => {
  const { dataSource, header, columns } = props;
  const getKeys = arr =>
    arr.reduce((acc, item) => {
      if (item.children) {
        return [...acc, ...getKeys(item.children)];
      }
      return [...acc, item.dataIndex];
    }, []);

  const dataKeys = getKeys(columns);
  console.log(dataKeys);
  return (
    <div className="table_wrapper">
      <div className="table">
        {header && <Header />}
        {dataSource && <Body dataSource={dataSource} dataKeys={dataKeys} />}
      </div>
    </div>
  );
};
Table.defaultProps = {
  header: false,
};

Table.propTypes = {
  header: PropTypes.bool,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Table;
