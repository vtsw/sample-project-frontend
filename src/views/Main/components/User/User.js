import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
	container: ({ active }) => ({
		background: active && theme.palette.common.blue,
		padding: '8px 16px',
		height: 40,
	}),
	item: {
		padding: '6px 16px',
		height: 40,
	},
	typography: { fontWeight: 700 },
}))

export default function User({ itemChosen, onClick, id, email, name }) {
	const classes = useStyles({ active: itemChosen.id === id })
	return (
		<Grid container className={classes.container} onClick={onClick}>
			<Grid item xs>
				<Typography variant='caption' className={classes.typography}>
					{email}
				</Typography>
			</Grid>
			<Grid item xs>
				<Typography variant='caption' className={classes.typography}>
					{' '}
					{name}
				</Typography>
			</Grid>
		</Grid>
	)
}
