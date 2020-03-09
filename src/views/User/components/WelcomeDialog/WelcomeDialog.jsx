import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Typography } from '@material-ui/core'
import {
	makeStyles,
	createMuiTheme,
	ThemeProvider,
} from '@material-ui/core/styles'

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
	welcome_text: {
		marginBottom: theme.spacing(1),
		fontWeight: 600,
	},
	create_user_button: {
		textTransform: 'unset',
		fontWeight: 500,
	},
}))

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#00897b',
		},
	},
})

const WelcomeDialog = ({ setDialogVisible }) => {
	const classes = useStyles()

	return (
		<ThemeProvider theme={theme}>
			<Box className={classes.root}>
				<Box className={classes.signup__dialog__container}>
					<Typography
						variant='subtitle1'
						color='primary'
						className={classes.welcome_text}
					>
						Welcome to Vatech !!!
					</Typography>
					<Button
						color='primary'
						variant='contained'
						fullWidth
						className={classes.create_user_button}
						onClick={() => setDialogVisible(false)}
					>
						Create user
					</Button>
				</Box>
			</Box>
		</ThemeProvider>
	)
}

WelcomeDialog.propsTypes = {
	setDialogVisible: PropTypes.func,
}

export default WelcomeDialog
