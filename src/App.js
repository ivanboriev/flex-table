import React from 'react'
import Table from './components/table/Table'

const data = [
	{
		id: 1,
		name: 'Root 1',
		childs: [
			{
				id: 11,
				name: 'Sub root 11',
			},
			{
				id: 12,
				name: 'Sub root 12',
			},
			{
				id: 13,
				name: 'Sub root 13',
			},
			{
				id: 14,
				name: 'Sub root 14',
			},
			{
				id: 15,
				name: 'Sub root 15',
			},
			{
				id: 16,
				name: 'Sub root 16',
			},
		],
	},
	{
		id: 2,
		name: 'Root 2',
		childs: [
			{
				id: 21,
				name: 'Sub root 21',
			},
			{
				id: 22,
				name: 'Sub root 22',
			},
			{
				id: 23,
				name: 'Sub root 23',
			},
			{
				id: 24,
				name: 'Sub root 24',
			},
			{
				id: 25,
				name: 'Sub root 25',
			},
			{
				id: 26,
				name: 'Sub root 26',
			},
		],
	},
]

function App() {
	return (
		<div className='App'>
			<Table dataSource={data} />
		</div>
	)
}

export default App
