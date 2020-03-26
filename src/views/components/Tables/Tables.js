import React from 'react'

import { useTable } from 'react-table'

import makeData from './makeData'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
	table: {
		borderSpacing: 0,
		borderTop: '1px solid #dfe2e5',
		borderLeft: '1px solid #dfe2e5',
	},

	td: {
		margin: 0,
		padding: '0.5rem',
		borderBottom: '1px solid #dfe2e5',
		borderRight: '1px solid #dfe2e5',

		':last-child': {
			borderRight: 0,
		},
	},
	tr: {
		'&:nth-child(2n)': {
			backgroundColor: '#f6f8fa',
		},
	},

	code: {
		borderRadius: 2,
		backgroundColor: '#efefef',
		padding: '2px 4px',
	},
	th: {
		margin: 0,
		padding: '0.5rem',
		borderBottom: '1px solid #dfe2e5',
		borderRight: '1px solid #dfe2e5',

		':last-child': {
			borderRight: 0,
		},
	},
}))

function Tables({ data }) {
	const classes = useStyles()

	const columns = React.useMemo(
		() => [
			{
				Header: 'PropsName',
				accessor: 'propsName',
			},
			{
				Header: 'PropsType',
				accessor: 'propsType',
				Cell: cellInfo => {
					return (
						<code className={classes.code}>
							{cellInfo.row.values.propsType}
						</code>
					)
				},
			},

			{
				Header: 'DefaultValue',
				accessor: 'defaultValue',
			},
			{
				Header: 'Description',
				accessor: 'description',
			},
		],
		[]
	)

	const dataDefault = React.useMemo(() => makeData(20), [])
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = useTable({
		columns,
		data: data.length > 0 ? data : dataDefault,
	})

	// Render the UI for your table
	return (
		<table {...getTableProps()} className={classes.table}>
			<thead>
				{headerGroups.map(headerGroup => (
					<tr className={classes.tr} {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map(column => (
							<th className={classes.th} {...column.getHeaderProps()}>
								{column.render('Header')}
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody {...getTableBodyProps()}>
				{rows.map((row, i) => {
					prepareRow(row)
					return (
						<tr className={classes.tr} {...row.getRowProps()}>
							{row.cells.map(cell => {
								return (
									<td className={classes.td} {...cell.getCellProps()}>
										{cell.render('Cell')}
									</td>
								)
							})}
						</tr>
					)
				})}
			</tbody>
		</table>
	)
}

export default Tables
