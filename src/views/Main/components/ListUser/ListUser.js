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
		// height: "calc(100vh - 150px)"
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
					<Typography variant='caption'>EMAIL</Typography>
				</Grid>
				<Grid item xs>
					<Typography variant='caption'>NAME</Typography>
				</Grid>
			</Grid>
			<Grid container alignItems='stretch' className={classes.table}>
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
