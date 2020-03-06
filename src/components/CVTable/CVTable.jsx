import React, { useState } from 'react'
import { Box, Grid, makeStyles } from '@material-ui/core'
import CVTableItem from '@components/CVTableItem'

const arr = [
	{ id: 11, email: '2020/02/30', name: 'test' },
	{ id: 21, email: '2020/02/30', name: 'test' },
	{ id: 31, email: '2020/02/30', name: 'test' },
	{ id: 41, email: '2020/02/30', name: 'test' },
	{ id: 51, email: '2020/02/30', name: 'test' },
	{ id: 61, email: '2020/02/30', name: 'test' },
	{ id: 112, email: '2020/02/30', name: 'test' },
	{ id: 122, email: '2020/02/30', name: 'test' },
	{ id: 132, email: '2020/02/30', name: 'test' },
	{ id: 142, email: '2020/02/30', name: 'test' },
	{ id: 152, email: '2020/02/30', name: 'test' },
	{ id: 162, email: '2020/02/30', name: 'test' },
	{ id: 211, email: '2020/02/30', name: 'test' },
	{ id: 221, email: '2020/02/30', name: 'test' },
	{ id: 231, email: '2020/02/30', name: 'test' },
	{ id: 241, email: '2020/02/30', name: 'test' },
	{ id: 251, email: '2020/02/30', name: 'test' },
	{ id: 261, email: '2020/02/30', name: 'test' },
	{ id: 311, email: '2020/02/30', name: 'test' },
	{ id: 321, email: '2020/02/30', name: 'test' },
	{ id: 331, email: '2020/02/30', name: 'test' },
	{ id: 341, email: '2020/02/30', name: 'test' },
	{ id: 351, email: '2020/02/30', name: 'test' },
	{ id: 361, email: '2020/02/30', name: 'test' },
	{ id: 411, email: '2020/02/30', name: 'test' },
	{ id: 421, email: '2020/02/30', name: 'test' },
	{ id: 431, email: '2020/02/30', name: 'test' },
	{ id: 441, email: '2020/02/30', name: 'test' },
	{ id: 451, email: '2020/02/30', name: 'test' },
	{ id: 461, email: '2020/02/30', name: 'test' },
]

const useStyles = makeStyles(theme => ({
	root: {
		overflow: 'hidden',
		height: '100%',
		flexWrap: 'nowrap',
	},
	table__header: {
		padding: '8px 16px',
		borderTop: `1px solid ${theme.palette.common.gray}`,
		borderBottom: `1px solid ${theme.palette.common.gray}`,
		'&>div:first-child': {
			paddingLeft: theme.spacing(3),
		},
	},
	table__content: {
		overflowY: 'auto',
		height: 'calc(100vh - 250px)',
		flexWrap: 'nowrap',
	},
}))

const CVTable = () => {
	const classes = useStyles()
	const [activeItem, setActiveItem] = useState('')
	return (
		<Grid
			container
			alignItems='stretch'
			className={classes.root}
			direction='column'
		>
			<Grid container className={classes.table__header}>
				<Grid item xs={5}>
					<strong>DATE</strong>
				</Grid>
				<Grid item xs={7}>
					<strong>TEXT</strong>
				</Grid>
			</Grid>
			<Box className={classes.table__content} direction='column'>
				{arr.map(item => (
					<CVTableItem
						key={item.id}
						hasCloseIcon={false}
						setActiveItem={setActiveItem}
						activeItem={activeItem}
						{...item}
					/>
				))}
			</Box>
		</Grid>
	)
}

export default CVTable
