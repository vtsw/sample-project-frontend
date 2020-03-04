import React from 'react'
import { Grid, makeStyles, Typography } from '@material-ui/core'
import CancelRoundedIcon from '@material-ui/icons/CancelRounded'

const useStyles = makeStyles(theme => ({
	container: ({ active }) => ({
		background: active && theme.palette.common.gray,
		padding: '8px 16px',
		height: '40px',
	}),
	item: {
		padding: '6px 8px',
		height: '40px',
	},
	typography: {
		marginLeft: '12px',
	},
	icon: {
		fontSize: '18px',
		color: theme.palette.common.gray,
		cursor: 'pointer',
	},
	container__icon__typography: {},
}))

const DetailUser = ({ onClick, email, name }) => {
	// const classes = useStyles({ active: itemChosen.id === id });
	const classes = useStyles()
	return (
		<Grid container className={classes.container} onClick={onClick}>
			<Grid item xs={5}>
				<Grid container className={classes.container__icon__typography}>
					<CancelRoundedIcon className={classes.icon} />
					<Typography variant='caption' className={classes.typography}>
						{email}
					</Typography>
				</Grid>
			</Grid>
			<Grid item xs={7}>
				{name}
			</Grid>
		</Grid>
	)
}

export default DetailUser
