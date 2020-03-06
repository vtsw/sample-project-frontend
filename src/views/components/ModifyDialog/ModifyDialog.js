import React from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	makeStyles,
	TextField,
} from '@material-ui/core'

import './style.css'

const useStyles = makeStyles(() => ({
	root: {
		boxShadow: 'none',
	},
}))

const ModifyDialog = props => {
	const { open, onClose, onAgree, onDissagree } = props
	const classes = useStyles()
	return (
		<Dialog open={open} onClose={onClose} classes={{ root: classes.root }}>
			<DialogTitle>Modify!</DialogTitle>
			<DialogContent>
				<TextField variant='outlined' placeholder='placeholder' />
			</DialogContent>
			<DialogActions>
				<Button
					variant='contained'
					onClick={() => {
						onAgree && onAgree()
					}}
				>
					Yes
				</Button>
				<Button
					variant='contained'
					onClick={() => {
						onDissagree && onDissagree()
					}}
				>
					No
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default ModifyDialog
