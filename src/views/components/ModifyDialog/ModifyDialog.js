import React from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	makeStyles,
	TextField,
	Typography,
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	paper: {
		boxShadow: 'none',
		borderRadius: 'unset',
		width: 376,
	},
	button_confirm: {
		height: 56,
		padding: `0px ${theme.spacing(2)}px`,
		minWidth: 0,
		boxShadow: 'none',
		color: theme.palette.common.white,
		textTransform: 'none',
		background: theme.palette.common.green,
		'&:hover': {
			background: theme.palette.common.green,
			boxShadow: 'none',
		},
	},
	button_cancel: {
		height: 56,
		padding: `0px ${theme.spacing(2)}px`,
		minWidth: '0px',
		boxShadow: 'none',
		color: theme.palette.common.white,
		textTransform: 'none',
		background: theme.palette.common.greyButton,
		'&:hover': {
			background: theme.palette.common.greyButton,
			boxShadow: 'none',
		},
	},
	textField: {
		width: '100%',
	},
	typography: {
		fontWeight: 700,
	},
}))

const ModifyDialog = props => {
	const { open, onClose, onAgree, onDisagree } = props
	const classes = useStyles()
	return (
		<Dialog open={open} onClose={onClose} classes={{ paper: classes.paper }}>
			<DialogTitle>
				<Typography className={classes.typography}>Modify!</Typography>
			</DialogTitle>
			<DialogContent>
				<TextField
					variant='outlined'
					placeholder='placeholder'
					className={classes.textField}
				/>
			</DialogContent>
			<DialogActions>
				<Button
					variant='contained'
					onClick={() => {
						onAgree && onAgree()
					}}
					className={classes.button_confirm}
				>
					Yes
				</Button>
				<Button
					variant='contained'
					onClick={() => {
						onDisagree && onDisagree()
					}}
					className={classes.button_cancel}
				>
					No
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default ModifyDialog
