import React from 'react'
import { Dialog, DialogTitle, DialogActions, Button } from '@material-ui/core'

const DeleteDialog = props => {
	const { open, onClose, onAgree, onDissagree } = props
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Delete!</DialogTitle>
			{/* <DialogContent>
				Are you sure delete? No rollback if item delete.
			</DialogContent> */}
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

export default DeleteDialog
