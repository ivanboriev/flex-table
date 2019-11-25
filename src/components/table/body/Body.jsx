import React from 'react';
import PropTypes from 'prop-types';
import Panel from '../panel/Panel';
import DataTable from '../data-table/DataTable';
import { cloneDeep } from 'lodash'; // ?: Есть смысл использовать дипклон тут?

class Body extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }
  flatDataSource = (data = [], parent = {}, visible = true) => {
    const cloneData = cloneDeep(data); // ?: Есть смысл использовать дипклон тут?
    return cloneData.reduce((acc, item) => {
      if (Object.keys(parent).length > 0) {
        item.parentId = parent.id; // ?: мутация
        item.id = `${item.id}-${parent.id}`;  // ?: мутация
      } else {
        item.parentId = null; // ?: мутация
      }
      if (item.categories) {
        return [
          ...acc,
          {
            ...item,
            categories: null,
            hasChilds: true,
            visible: visible,
            class: 'category',  // ?: class - зарезервированное слово, лучше className
            expanded: false,
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
            class: 'item', // ?: class - зарезервированное слово, лучше className
            expanded: false,
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
    const isExpand = (element.expanded = !element.expanded); // ?: мутация, плюс неочевидно, что происходит, возможно переписать?
    const parents = [];
    if (element.hasChilds) {
      parents.push(element.id); // ?: возможно написать метод по получению парентов? слишком большая ответственность у метода, плюс мутации.
    }

    return data.map(el => {
      if (isExpand) {
        if (parents.indexOf(el.parentId) !== -1) { // ?: parents.includes(el.parentId)
          el.visible = true; // ?: мутация
        }
      } else { // ?: тут можно обойтись ранним ретерном, чем меньше вложенность, тем лучше.
        if (parents.indexOf(el.parentId) !== -1) { // ?: parents.includes(el.parentId)
          el.visible = false; // ?: мутация
          el.expanded = false; // ?: мутация
          if (el.hasChilds) {
            parents.push(el.id); // ?: Зачем на этом этапе заполняется массив парентов? он больше нигде не используестся
          }
        }
      }
      return el; // ?: можно избавиться, за счет раннего ретерна
    });
  }

  handleClick(element) {
    const changedData = this.toggleElement(element);
    this.setState({ data: changedData });
  }

  render() {
    const { data } = this.state;
    const { dataKeys } = this.props;
    const filteredData = data.filter(el => el.visible);
    return (
      <div className="body" key="key">
        {filteredData.map(el => {
          const expanded = el.expanded; // ?: тут, в принципе, можно не записывать в переменную значения, но если писать, то через деструктуризацию в данном случае
          const hasChilds = el.hasChilds; // ?: тут, в принципе, можно не записывать в переменную значения, но если писать, то через деструктуризацию в данном случае
          return hasChilds ? (
            <Panel // ?: ExpandingRow или ContainerRow или еще что-то семантически более близкое к тому что делает строка
              key={el.id}
              title={el.name}
              onClick={() => this.handleClick(el)}
              expanded={expanded}
              className={el.class}
              hasChilds={el.hasChilds}
            />
          ) : (
            <DataTable key={el.id} item={el} dataKeys={dataKeys} />
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
