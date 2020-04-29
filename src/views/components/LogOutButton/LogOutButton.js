import React from 'react'

import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
	root: {
		color: theme.palette.common.white,
		width: 80,
		height: 80,
		cursor: 'pointer',
		padding: `28px 12px`,
		borderRadius: 0,
		position: 'absolute',
		bottom: 0,
		left: 0,
		textTransform: 'capitalize',
		'&>span': {
			fontWeight: theme.typography.fontWeightBold,
		},
	},
}))

const LogOutButton = props => {
	const { handleOnLogOut } = props
	const classes = useStyles()

	return (
		<Button
			data-testid='logoutbutton'
			color='primary'
			className={classes.root}
			onClick={handleOnLogOut}
		>
			Logout
		</Button>
	)
}

export default LogOutButton
