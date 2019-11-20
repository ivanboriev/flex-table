import React from 'react';
import PropTypes from 'prop-types';

const Panel = props => {
  const { title, expanded, className, hasChilds, onClick } = props;
  const classPanel = expanded ? `panel ${className} expanded` : `panel ${className}`;

  return (
    <div className={classPanel} onClick={onClick} aria-hidden>
      {hasChilds ? <span className={expanded ? 'arrow down' : 'arrow'} /> : null}
      <span className="title">{title}</span>
    </div>
  );
};

Panel.defaultProps = {
  expanded: false,
  hasChilds: false,
};

Panel.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  expanded: PropTypes.bool,
  hasChilds: PropTypes.bool,
};

export default Panel;
