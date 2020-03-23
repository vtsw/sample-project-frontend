import React, { useState, useEffect } from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	makeStyles,
	TextField,
	Typography,
	Slide,
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	root: {
		boxShadow: 'none',
		borderRadius: 'unset',
		width: 376,
	},
	title: {
		fontWeight: 700,
	},
	textfield: {
		width: '100%',
	},
	button: {
		height: 58,
		color: theme.palette.common.white,
		minWidth: 0,
		textTransform: 'none',
	},
}))

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />
})

const ModifyDialog = props => {
	const { open, onClose, onAgree, valueDefault = '', onDisagree } = props
	const classes = useStyles()
	const [value, setValue] = useState()

	useEffect(() => {
		setValue(valueDefault)
	}, [valueDefault])

	const handleUpdate = () => {
		if (valueDefault === value) {
			onDisagree && onDisagree()
		} else {
			onAgree && onAgree(value)
		}
	}

	const handleCancel = () => {
		onDisagree && onDisagree()
	}

	return (
		<Dialog
			TransitionComponent={Transition}
			open={open}
			onClose={onClose}
			classes={{ paper: classes.root }}
		>
			<DialogTitle>
				<Typography variant='h5' className={classes.title}>
					Modify!
				</Typography>
			</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					variant='outlined'
					placeholder='placeholder'
					defaultValue={valueDefault}
					onChange={e => setValue(e.target.value)}
					className={classes.textfield}
					onKeyDown={e => {
						if (e.keyCode === 13) {
							handleUpdate()
						}
						if (e.keyCode === 32) {
							handleCancel()
						}
					}}
				/>
			</DialogContent>
			<DialogActions>
				<Button
					variant='contained'
					color='primary'
					onClick={handleUpdate}
					className={classes.button}
				>
					Yes
				</Button>
				<Button
					variant='contained'
					onClick={handleCancel}
					className={classes.button}
				>
					No
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default ModifyDialog
