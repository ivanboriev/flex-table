import React from 'react'
import PropTypes from 'prop-types'
import Col from '../col/Col'

const DataTable = props => {
	const { item, dataKeys, index } = props
	return (
		<div className='panel data'>
			{dataKeys.map((el, i) => {
				return el === 'date' ? (
					<Col key={item.id + i} text=' ' />
				) : (
					<Col key={`col-${item.id}-${i}`} text={item[el]} left={el === 'name'} index={index} />
				)
			})}
		</div>
	)
}

DataTable.defaultProps = {
	item: {},
}

DataTable.propTypes = {
	item: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number])
	),
	dataKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default DataTable
