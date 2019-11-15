import React from 'react'
import PropTypes from 'prop-types'
import Header from './header/Header'
import Body from './body/Body'
import './Table.scss'

const Table = props => {
	const { dataSource, header } = props
	return (
		<div className='table_wrapper'>
			<div className='table'>
				{header && <Header />}
				{dataSource && <Body dataSource={dataSource} />}
			</div>
		</div>
	)
}
Table.defaultProps = {
	header: false,
}

Table.propTypes = {
	header: PropTypes.bool,
	dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Table
