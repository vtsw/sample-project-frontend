import React from 'react'
import { Grid, makeStyles, Typography } from '@material-ui/core'
import User from '../User'

const arr = [
	{ id: 1, email: 'test@test.com', name: 'test' },
	{ id: 2, email: 'test@test.com', name: 'test' },
	{ id: 3, email: 'test@test.com', name: 'test' },
	{ id: 4, email: 'test@test.com', name: 'test' },
	{ id: 5, email: 'test@test.com', name: 'test' },
	{ id: 6, email: 'test@test.com', name: 'test' },
	{ id: 21, email: 'test@test.com', name: 'test' },
	{ id: 31, email: 'test@test.com', name: 'test' },
	{ id: 41, email: 'test@test.com', name: 'test' },
	{ id: 51, email: 'test@test.com', name: 'test' },
	{ id: 61, email: 'test@test.com', name: 'test' },
	{ id: 22, email: 'test@test.com', name: 'test' },
	{ id: 32, email: 'test@test.com', name: 'test' },
	{ id: 42, email: 'test@test.com', name: 'test' },
	{ id: 52, email: 'test@test.com', name: 'test' },
	{ id: 62, email: 'test@test.com', name: 'test' },
	{ id: 23, email: 'test@test.com', name: 'test' },
	{ id: 33, email: 'test@test.com', name: 'test' },
	{ id: 43, email: 'test@test.com', name: 'test' },
	{ id: 53, email: 'test@test.com', name: 'test' },
	{ id: 63, email: 'test@test.com', name: 'test' },
	{ id: 24, email: 'test@test.com', name: 'test' },
	{ id: 34, email: 'test@test.com', name: 'test' },
	{ id: 44, email: 'test@test.com', name: 'test' },
	{ id: 54, email: 'test@test.com', name: 'test' },
	{ id: 64, email: 'test@test.com', name: 'test' },
	{ id: 25, email: 'test@test.com', name: 'test' },
	{ id: 35, email: 'test@test.com', name: 'test' },
	{ id: 45, email: 'test@test.com', name: 'test' },
	{ id: 55, email: 'test@test.com', name: 'test' },
	{ id: 65, email: 'test@test.com', name: 'test' },
	{ id: 26, email: 'test@test.com', name: 'test' },
	{ id: 36, email: 'test@test.com', name: 'test' },
	{ id: 46, email: 'test@test.com', name: 'test' },
	{ id: 56, email: 'test@test.com', name: 'test' },
	{ id: 66, email: 'test@test.com', name: 'test' },
]

const useStyles = makeStyles(theme => ({
	header: {
		padding: '8px 16px',
		borderTop: `1px solid ${theme.palette.common.gray}`,
		borderBottom: `1px solid ${theme.palette.common.gray}`,
	},
	item: {
		padding: '6px 16px',
	},
	table: {
		overflowY: 'overlay',
		height: 'calc(100vh - 163px)',
		flexWrap: 'nowrap',
	},
	typography: {
		fontWeight: 'bold',
	},
}))

export default function ListUser({ itemChosen, setitemChosen }) {
	const classes = useStyles()
	return (
		<Grid
			container
			alignItems='stretch'
			// className={classes.column1}
		>
			<Grid container className={classes.header}>
				<Grid item xs>
					<Typography variant='caption' className={classes.typography}>
						EMAIL
					</Typography>
				</Grid>
				<Grid item xs>
					<Typography variant='caption' className={classes.typography}>
						NAME
					</Typography>
				</Grid>
			</Grid>
			<Grid
				container
				alignItems='stretch'
				className={classes.table}
				direction='column'
			>
				{arr.map(item => (
					<User
						key={item.id}
						{...item}
						onClick={() => setitemChosen(item)}
						itemChosen={itemChosen}
					/>
				))}
			</Grid>
		</Grid>
	)
}
