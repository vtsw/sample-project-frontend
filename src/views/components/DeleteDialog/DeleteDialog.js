import React from 'react'
import clsx from 'clsx'
import {
	Dialog,
	DialogTitle,
	DialogActions,
	Button,
	Slide,
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
		padding: '24px 12px 12px 24px',
		margin: 0,
	},
	dialog_title: {
		marginBottom: 3,
		'&>h2': {
			lineHeight: 'initial',
			fontWeight: 700,
			fontSize: '1.5rem',
		},
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
	no_padding: {
		padding: 0,
	},
}))

const theme = createMuiTheme({
	palette: {
		primary: {
			main: teal[600],
		},
	},
})

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />
})

const DeleteDialog = props => {
	const { open, onClose, onAgree, onDisagree } = props
	const classes = useStyles()
	return (
		<ThemeProvider theme={theme}>
			<Dialog
				TransitionComponent={Transition}
				open={open}
				onClose={onClose}
				classes={{ paper: classes.root }}
			>
				<DialogTitle className={clsx(classes.no_padding, classes.dialog_title)}>
					Delete!
				</DialogTitle>
				<DialogActions className={classes.no_padding}>
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
