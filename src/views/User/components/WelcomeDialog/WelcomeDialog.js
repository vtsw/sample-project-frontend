import React from 'react'

import { Box, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
	root: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
		zIndex: 10,
		transition: `opacity 225ms ${theme.transitions.easing.easeInOut} 0ms`,
	},
	welcometext: {
		color: theme.palette.primary.main,
		marginBottom: theme.spacing(1),
		fontWeight: 600,
	},
	button: {
		textTransform: 'unset',
		color: theme.palette.primary.main,
		fontWeight: 700,
	},
}))

const WelcomeDialog = props => {
	const { onCreateUser } = props
	const classes = useStyles()

	return (
		<Box className={classes.root}>
			<Box className={classes.signup__dialog__container}>
				<Typography variant='subtitle1' className={classes.welcometext}>
					Welcome to Vatech !!!
				</Typography>
				<Button
					data-cy='create-user-button'
					variant='contained'
					fullWidth
					className={classes.button}
					onClick={onCreateUser}
				>
					Create user
				</Button>
			</Box>
		</Box>
	)
}

export default WelcomeDialog
