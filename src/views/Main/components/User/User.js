import React from 'react'
import { Grid, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	container: ({ active }) => ({
		background: active && theme.palette.common.blue,
		padding: '8px 16px',
		height: '40px',
	}),
	item: {
		padding: '6px 16px',
		height: '40px',
	},
}))

export default function User({ itemChosen, onClick, id, email, name }) {
	const classes = useStyles({ active: itemChosen.id === id })
	return (
		<Grid container className={classes.container} onClick={onClick}>
			<Grid item xs>
				<Typography variant='caption'>{email}</Typography>
			</Grid>
			<Grid item xs>
				{name}
			</Grid>
		</Grid>
	)
}
