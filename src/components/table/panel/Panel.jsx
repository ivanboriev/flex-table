import React from 'react'
import PropTypes from 'prop-types'

const Panel = props => {
	const { title, expanded, onClick } = props
	return (
		<div className={expanded ? 'panel expanded' : 'panel'} onClick={onClick} aria-hidden>
			<span className={expanded ? 'arrow down' : 'arrow'} />
			<span className='title'>{title}</span>
		</div>
	)
}

Panel.defaultProps = {
	expanded: false,
}

Panel.propTypes = {
	title: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	expanded: PropTypes.bool,
}

export default Panel
