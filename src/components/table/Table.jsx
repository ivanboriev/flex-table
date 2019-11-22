import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './header/Header';
import Body from './body/Body';
import './Table.scss';

const Table = props => {
  useEffect(() => {
    watchResizeWindow();
    window.addEventListener('resize', watchResizeWindow);
  }, []);

  const watchResizeWindow = () => {
    //TODO React.createRef realization
    // Need column_id in props for watching
    const tableWidth = document.getElementsByClassName('header')[0].offsetWidth;
    const colWidth = document.getElementsByClassName('header')[0].children[1]
      .offsetWidth;
    props.setWidthAndHeightAndColWidth({
      width: tableWidth,
      height: 600,
      colWidth: colWidth,
    });
  };
  const { dataSource, header, columns } = props;
  const getKeys = arr =>
    arr.reduce((acc, item) => {
      if (item.children) {
        return [...acc, ...getKeys(item.children)];
      }
      return [...acc, item.index];
    }, []);

  const dataKeys = getKeys(columns);

  return (
    <div className="table_wrapper">
      <div className="table">
        {header && <Header columns={columns} />}
        {dataSource && <Body dataSource={dataSource} dataKeys={dataKeys} />}
      </div>
      <h2>
        Width: {props.flexTable.width} Height: {props.flexTable.height}{' '}
        ColWidth: {props.flexTable.colWidth}
      </h2>
    </div>
  );
};

Table.defaultProps = {
  header: true,
};

Table.propTypes = {
  header: PropTypes.bool,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapState = state => ({
  flexTable: state.flexTable,
});
const mapDispatch = dispatch => ({
  setWidthAndHeight: payload =>
    dispatch({ type: 'SET_WIDTH_AND_HEIGHT', payload }),
  setWidthAndHeightAndColWidth: payload =>
    dispatch({ type: 'SET_WIDTH_AND_HEIGHT_AND_COL_WIDTH', payload }),
  setColWidth: payload => dispatch({ type: 'SET_COL_WIDTH', payload }),
});

export default connect(mapState, mapDispatch)(Table);
