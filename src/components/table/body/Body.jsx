import React from 'react';
import PropTypes from 'prop-types';
import Panel from '../panel/Panel';
import DataTable from '../data-table/DataTable';
import { cloneDeep } from 'lodash';
import { connect } from 'react-redux';
//import { VariableSizeList as List } from 'react-window';
import { AutoSizer, List } from 'react-virtualized';

class Body extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }
  flatDataSource = (data = [], parent = {}, visible = true) => {
    const cloneData = cloneDeep(data);
    return cloneData.reduce((acc, item) => {
      if (Object.keys(parent).length > 0) {
        item.parentId = parent.id;
        item.id = `${item.id}-${parent.id}`;
      } else {
        item.parentId = null;
      }
      if (item.categories) {
        return [
          ...acc,
          {
            ...item,
            categories: null,
            hasChilds: true,
            visible: visible,
            class: 'category',
            expanded: false,
            resizable: false,
          },
          ...this.flatDataSource(item.categories, item, false),
        ];
      }

      if (item.items) {
        return [
          ...acc,
          {
            ...item,
            hasChilds: true,
            items: null,
            visible: visible,
            class: 'item',
            expanded: false,
            resizable: false,
          },
          ...this.flatDataSource(item.items, item, false),
        ];
      }

      return [
        ...acc,
        {
          ...item,
          hasChilds: false,
          visible: visible,
          expanded: false,
          resizable: true,
        },
      ];
    }, []);
  };

  componentDidMount() {
    const { dataSource } = this.props;
    const flatData = this.flatDataSource(dataSource);
    this.setState({ data: flatData });
  }

  toggleElement(element) {
    const { data } = this.state;
    const isExpand = (element.expanded = !element.expanded);
    const parents = [];
    if (element.hasChilds) {
      parents.push(element.id);
    }

    return data.map(el => {
      if (isExpand) {
        if (parents.indexOf(el.parentId) !== -1) {
          el.visible = true;
        }
      } else {
        if (parents.indexOf(el.parentId) !== -1) {
          el.visible = false;
          el.expanded = false;
          if (el.hasChilds) {
            parents.push(el.id);
          }
        }
      }
      return el;
    });
  }

  handleClick(element) {
    const changedData = this.toggleElement(element);
    this.setState({ data: changedData });
  }

  rowRenderer = ({ key, index, style }) => {
    const { data } = this.state;

    const { dataKeys } = this.props;
    const filteredData = data.filter(el => el.visible);
    const ref = React.createRef();

    const el = filteredData[index];
    return (
      <div style={style} key={key}>
        {el.hasChilds ? (
          <Panel
            key={el.id}
            ref={ref}
            style={style}
            title={el.name}
            onClick={() => this.handleClick(el)}
            expanded={el.expanded}
            className={el.class}
            hasChilds={el.hasChilds}
          />
        ) : (
          <DataTable key={el.id} item={el} index={index} dataKeys={dataKeys} />
        )}
      </div>
    );
  };

  render() {
    const { data } = this.state;
    const { height, width, colWidth } = this.props.flexTable;
    const filteredData = data.filter(el => el.visible);

    const getRowSize = (arr, { index }, hw) => {
      if (!arr[index].resizable) {
        return 41;
      }
      const chars = arr[index].name.length;
      const containerWidth = hw;

      const defHeight = 41;
      const checkboxWidth = 35;
      const charWidth = 8.5; // !: примерная ширина символа... другого решения придумать не могу, к несчастью...

      const strWidth = charWidth * chars; // *: расчетная ширина строки.
      const maxStrWidth = containerWidth - 16; // *: максимально возможная ширина строки.

      const lineIncrease = 20; // *: значение, на которое увеличим строку.
      const increaseRaito = Math.floor(strWidth / maxStrWidth); // *: коэфициент увеличеиня строки

      return !increaseRaito
        ? defHeight
        : defHeight + lineIncrease * increaseRaito;
    };

    return (
      <div className="body" key="key">
        <List
          height={height}
          rowCount={filteredData.length}
          rowHeight={index => getRowSize(filteredData, index, colWidth)}
          rowRenderer={this.rowRenderer}
          width={width}
        />
      </div>
    );
  }
}

Body.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapState = state => ({
  flexTable: state.flexTable,
});

export default connect(mapState)(Body);
