import React from 'react';
import Table from './components/table/Table';

import data from './data.json';
import columns from './columns.json';

function App() {
  return (
    <div className="App">
      <Table dataSource={data} columns={columns} />
    </div>
  );
}

export default App;
