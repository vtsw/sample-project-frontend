import React from 'react'
import {
	Dialog,
	DialogTitle,
	DialogActions,
	Button,
	makeStyles,
	Typography,
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	paper: {
		boxShadow: 'none',
		borderRadius: 'unset',
		width: 323,
	},
	button_confirm: {
		height: 56,
		padding: '0 16px',
		minWidth: '0px',
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

const DeleteDialog = props => {
	const { open, onClose, onAgree, onDisagree } = props
	const classes = useStyles()
	return (
		<Dialog open={open} onClose={onClose} classes={{ paper: classes.paper }}>
			<DialogTitle>
				<Typography className={classes.title} variant='h6'>
					Delete!
				</Typography>
			</DialogTitle>
			{/* <DialogContent>
				Are you sure delete? No rollback if item delete.
			</DialogContent> */}
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

export default DeleteDialog
