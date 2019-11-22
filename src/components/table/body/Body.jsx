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
            size: 41,
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
            size: 41,
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
          size: item.name.length <= 32 ? 39 : 61,
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

    const el = filteredData[index];
    return (
      <div style={style} key={key}>
        {el.hasChilds ? (
          <Panel
            key={el.id}
            style={style}
            title={el.name}
            onClick={() => this.handleClick(el)}
            expanded={el.expanded}
            className={el.class}
            hasChilds={el.hasChilds}
          />
        ) : (
          <DataTable key={el.id} item={el} dataKeys={dataKeys} />
        )}
      </div>
    );
  };

  render() {
    const { data } = this.state;
    const { height, width } = this.props.flexTable;
    const filteredData = data.filter(el => el.visible);

    const funct = ({ index }) => {
      const size = filteredData[index].size;
      return size;
    };

    return (
      <div className="body" key="key">
        <List
          height={height}
          rowCount={filteredData.length}
          rowHeight={index => funct(index)}
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
