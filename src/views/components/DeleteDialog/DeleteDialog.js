import React from 'react'
import {
	Dialog,
	DialogTitle,
	DialogActions,
	Button,
	Typography,
} from '@material-ui/core'
import {
	makeStyles,
	createMuiTheme,
	ThemeProvider,
} from '@material-ui/core/styles'
import teal from '@material-ui/core/colors/teal'

const useStyles = makeStyles(theme => ({
	root: {
		boxShadow: 'none',
		borderRadius: 'unset',
		width: 323,
	},
	button_confirm: {
		height: 56,
		padding: '0 16px',
		minWidth: '0px',
		boxShadow: 'none',
		textTransform: 'none',
	},
	button_cancel: {
		height: 56,
		padding: '0 16px',
		minWidth: 0,
		boxShadow: 'none',
		color: theme.palette.common.white,
		textTransform: 'none',
		background: theme.palette.common.greyButton,
		'&:hover': {
			background: theme.palette.common.greyButton,
			boxShadow: 'none',
		},
	},
	title: {
		fontWeight: 700,
	},
}))

const theme = createMuiTheme({
	palette: {
		primary: {
			main: teal[600],
		},
	},
})

const DeleteDialog = ({ open, onClose, onAgree, onDisagree }) => {
	const classes = useStyles()
	return (
		<ThemeProvider theme={theme}>
			<Dialog open={open} onClose={onClose} classes={{ paper: classes.root }}>
				<DialogTitle>
					<Typography className={classes.title} variant='h6'>
						Delete!
					</Typography>
				</DialogTitle>
				<DialogActions>
					<Button
						variant='contained'
						color='primary'
						className={classes.button_confirm}
						onClick={() => {
							onAgree && onAgree()
						}}
					>
						Yes
					</Button>
					<Button
						variant='contained'
						className={classes.button_cancel}
						onClick={() => {
							onDisagree && onDisagree()
						}}
					>
						No
					</Button>
				</DialogActions>
			</Dialog>
		</ThemeProvider>
	)
}

export default DeleteDialog
