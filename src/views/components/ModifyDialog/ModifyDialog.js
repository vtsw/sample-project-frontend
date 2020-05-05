import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	makeStyles,
	TextField,
	Slide,
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	root: {
		boxShadow: 'none',
		borderRadius: 'unset',
		width: 376,
	},
	title: {
		'&>h2': {
			fontWeight: 700,
		},
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

	const handleOnKeyDown = e => {
		if (e.keyCode === 13) {
			handleUpdate()
		} else if (e.keyCode === 32) {
			handleCancel()
		}
	}

	return (
		<Dialog
			TransitionComponent={Transition}
			open={open}
			onClose={onClose}
			classes={{ paper: classes.root }}
		>
			<DialogTitle data-testid='modifydialog-title' className={classes.title}>
				Modify!
			</DialogTitle>
			<DialogContent>
				<TextField
					data-testid='modifydialog-input'
					autoFocus
					variant='outlined'
					placeholder='placeholder'
					defaultValue={valueDefault}
					onChange={e => setValue(e.target.value)}
					className={classes.textfield}
					onKeyDown={handleOnKeyDown}
				/>
			</DialogContent>
			<DialogActions>
				<Button
					data-testid='modifydialog-agreebutton'
					variant='contained'
					color='primary'
					onClick={handleUpdate}
					className={classes.button}
				>
					Yes
				</Button>
				<Button
					data-testid='modifydialog-disagreebutton'
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

ModifyDialog.propTypes = {
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onAgree: PropTypes.func.isRequired,
	onDisagree: PropTypes.func.isRequired,
	valueDefault: PropTypes.string,
}

ModifyDialog.defaultProps = {
	open: false,
	valueDefault: '',
}

export default ModifyDialog
