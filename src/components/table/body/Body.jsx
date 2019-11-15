import React from 'react'
import PropTypes from 'prop-types'
import Panel from '../panel/Panel'

class Body extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			expandedGroups: new Set(),
		}
	}

	handleClick(element) {
		const { expandedGroups } = this.state

		const copyExpandedGroups = new Set([...expandedGroups])

		if (!copyExpandedGroups.delete(element)) {
			copyExpandedGroups.add(element)
		}
		this.setState({
			expandedGroups: copyExpandedGroups,
		})
	}

	render() {
		const { dataSource } = this.props
		const { expandedGroups } = this.state
		return (
			<div className='body'>
				{dataSource.map(element => {
					const isGroupExpanded = expandedGroups.has(element)
					return (
						<React.Fragment key={element.id}>
							<Panel
								title={element.name}
								onClick={() => this.handleClick(element)}
								expanded={isGroupExpanded}
								key={element.id}
							/>
							{isGroupExpanded &&
								element.categories.map(el => {
									const isSubGroupExpanded = expandedGroups.has(el)
									return (
										<Panel
											title={el.name}
											onClick={() => this.handleClick(el)}
											expanded={isSubGroupExpanded}
											key={el.id}
										/>
									)
								})}
						</React.Fragment>
					)
				})}
			</div>
		)
	}
}

Body.propTypes = {
	dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Body
