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
			classes={{ paper: classes.paper }}
		>
			<DialogTitle>
				<Typography className={classes.typography}>Modify!</Typography>
			</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					variant='outlined'
					placeholder='placeholder'
					defaultValue={valueDefault}
					onChange={e => setValue(e.target.value)}
					className={classes.textField}
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
					onClick={handleUpdate}
					className={classes.button_confirm}
				>
					Yes
				</Button>
				<Button
					variant='contained'
					onClick={handleCancel}
					className={classes.button_cancel}
				>
					No
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default ModifyDialog
