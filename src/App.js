import React from 'react';
import { connect } from 'react-redux';
import Table from './components/table/Table';

const App = props => {
  const { data, columns } = props;

  return (
    <div className="App">
      <Table dataSource={data} columns={columns} />
    </div>
  );
};
const mapState = state => ({
  data: state.flexTable.data,
  columns: state.flexTable.columns,
});

const mapDispatch = dispatch => ({
  setData: payload => dispatch({ type: 'SET_DATA', payload }),
  setColumns: payload => dispatch({ type: 'SET_COLUMNS', payload }),
});
export default connect(mapState, mapDispatch)(App);
