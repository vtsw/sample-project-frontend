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
		width: '376px',
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
	textField: {
		width: '100%',
	},
	typography: {
		fontWeight: 'bold',
	},
}))

const ModifyDialog = props => {
	const { open, onClose, onAgree, onDissagree } = props
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

export default ModifyDialog
