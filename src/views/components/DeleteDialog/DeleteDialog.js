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
		width: '323px',
	},
	buttonYes: {
		height: '56px',
		padding: '0 16px',
		minWidth: '0px',
		boxShadow: 'none',
		color: 'white',
		textTransform: 'none',
		background: theme.palette.common.green,
		'&:hover': {
			background: theme.palette.common.green,
			boxShadow: 'none',
		},
	},
	buttonNo: {
		height: '56px',
		padding: '0 16px',
		minWidth: '0px',
		boxShadow: 'none',
		color: 'white',
		textTransform: 'none',
		background: '#d8d8d8',
		'&:hover': {
			background: '#d8d8d8',
			boxShadow: 'none',
		},
	},
	title: {
		fontWeight: 'bold !important',
	},
}))

const DeleteDialog = props => {
	const { open, onClose, onAgree, onDissagree } = props
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
					className={classes.buttonYes}
				>
					Yes
				</Button>
				<Button
					variant='contained'
					onClick={() => {
						onDissagree && onDissagree()
					}}
					className={classes.buttonNo}
				>
					No
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default DeleteDialog
