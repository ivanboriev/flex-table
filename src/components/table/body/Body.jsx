import React from 'react';
import PropTypes from 'prop-types';
import Panel from '../panel/Panel';
import DataTable from '../data-table/DataTable';

class Body extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }
  flatDataSource = (data = [], parent = {}, visible = true) => {
    return data.reduce((acc, item) => {
      if (Object.keys(parent).length > 0) {
        item.parentId = parent.id;
        item.id = `${item.id}-${parent.id}`;
      } else {
        item.parentId = null;
      }

      if (item.categories) {
        item.hasChilds = true;
        item.childName = 'categories';
        item.visible = visible;
        item.class = 'category';

        return [...acc, item, ...this.flatDataSource(item.categories, item, false)];
      }

      if (item.items) {
        item.hasChilds = true;
        item.childName = 'items';
        item.visible = visible;
        item.class = 'item';

        return [...acc, item, ...this.flatDataSource(item.items, item, false)];
      }
      item.hasChilds = false;
      item.visible = visible;
      return [...acc, item];
    }, []);
  };

  componentDidMount() {
    const { dataSource } = this.props;
    const flatData = this.flatDataSource(dataSource);
    this.setState({ data: flatData });
  }

  toggleChilds = childs => {
    return childs.map(element => {
      element.visible = !element.visible;
      return element;
    });
  };

  handleClick(element) {
    const { data } = this.state;
    element.expanded = !element.expanded;
    const changedData = data.map(el => {
      if (el.parentId === element.id) {
        el.visible = !el.visible;
        el.expanded = !el.expanded;
      }
      if (!el.visible && el.hasChilds) {
        return el[el.childName].map(e => {
          e.visible = false;
          e.expanded = false;
        });
      }
      return el;
    });

    this.setState({ data: changedData });
  }

  render() {
    const { data } = this.state;
    const { dataKeys } = this.props;
    const filteredData = data.filter(el => el.visible === true);
    return (
      <div className="body">
        {filteredData.map(el => {
          const expanded = el.expanded;
          const hasChilds = el.hasChilds;
          return hasChilds ? (
            <Panel
              key={el.id}
              title={el.name}
              onClick={() => this.handleClick(el)}
              expanded={expanded}
              className={el.class}
              hasChilds={el.hasChilds}
            />
          ) : (
            <DataTable item={el} dataKeys={dataKeys} />
          );
        })}
      </div>
    );
  }
}

Body.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Body;
