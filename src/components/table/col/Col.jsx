import React from 'react'
import Proptypes from 'prop-types'

const Col = props => {
	const { text, left, index } = props
	return (
		<div className={left ? `col text-left index-${index}` : `col index-${index}`}>
			<span>{text}</span>
		</div>
	)
}

Col.defaultProps = {
	left: false,
}

Col.propTypes = {
	text: Proptypes.any.isRequired,
	index: Proptypes.number.isRequired,
	left: Proptypes.bool,
}
export default Col
