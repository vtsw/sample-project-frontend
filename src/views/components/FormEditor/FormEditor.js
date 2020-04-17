import React, { useState, useEffect } from 'react'

import { Box, Button, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
	root: {
		width: 381,
		margin: '20px auto',
		padding: theme.spacing(2),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	formtitle: {
		color: theme.palette.primary.main,
		fontWeight: 600,
	},
	forminput: {
		width: '100%',
		marginTop: 18,
	},
	formcontent: {
		padding: 0,
	},
	formbuttons: {
		display: 'flex',
		flexDirection: 'column',
		padding: 0,
		width: '100%',
		'&>button': {
			marginTop: theme.spacing(2),
			marginLeft: 0,
			'&:not(:first-child)': {
				marginLeft: 0,
			},
		},
	},
	formbutton: {
		color: theme.palette.common.white,
		fontWeight: 600,
		textTransform: 'capitalize',
		padding: '18px 0',
	},
}))

const FormEditor = props => {
	const { selectedUser = {}, onSubmit, onCancel, onDelete } = props
	const classes = useStyles()

	const [email, setEmail] = useState('')
	const [name, setName] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	useEffect(() => {
		setEmail(selectedUser.email)
		setName(selectedUser.name)
	}, [selectedUser])

	const validateForm = (email, name, password, confirmPassword) => {
		const emailRegex = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/gm
		const isValidEmail = email.match(emailRegex)

		if (isValidEmail === null || password !== confirmPassword || !name) {
			return false
		}
		return true
	}

	const resetForm = () => {
		if (!selectedUser.id) {
			setEmail('')
			setName('')
		}
		setPassword('')
		setConfirmPassword('')
	}

	const handleOnSubmit = () => {
		const isValidatedForm = validateForm(email, name, password, confirmPassword)

		if (isValidatedForm) {
			onSubmit({ id: selectedUser.id, email, name, password })
			resetForm()
		} else {
			alert('Form is not valid!!!')
		}
	}

	const handleOnCancel = () => {
		onCancel()
		resetForm()
	}

	return (
		<Box className={classes.root}>
			<Typography
				data-testid='formeditor-title'
				variant='h5'
				className={classes.formtitle}
			>
				{selectedUser.id ? 'Modify' : 'Sign up'}
			</Typography>
			<div className={classes.formcontent}>
				<TextField
					data-testid='formeditor-email-input'
					value={email}
					label='EMAIL'
					placeholder='Email'
					variant='outlined'
					type='email'
					className={classes.forminput}
					onChange={e => setEmail(e.target.value.toLowerCase())}
				/>
				<TextField
					data-testid='formeditor-name-input'
					value={name}
					label='NAME'
					placeholder='Name'
					variant='outlined'
					type='text'
					autoComplete='true'
					className={classes.forminput}
					onChange={e => setName(e.target.value)}
				/>
				<TextField
					data-testid='formeditor-password-input'
					value={password}
					label='PASSWORD'
					placeholder='Password'
					variant='outlined'
					type='password'
					autoComplete='true'
					className={classes.forminput}
					onChange={e => setPassword(e.target.value)}
				/>
				<TextField
					data-testid='formeditor-password-confirm-input'
					value={confirmPassword}
					label='PASSWORD CONFIRM'
					placeholder='Password Confirm'
					variant='outlined'
					type='password'
					autoComplete='true'
					className={classes.forminput}
					onChange={e => setConfirmPassword(e.target.value)}
				/>
			</div>
			<div className={classes.formbuttons}>
				<Button
					data-testid='formeditor-submit-button'
					color='primary'
					variant='contained'
					size='large'
					fullWidth
					className={classes.formbutton}
					onClick={handleOnSubmit}
				>
					{selectedUser.id ? 'Save' : 'Register'}
				</Button>
				{selectedUser.id ? (
					<Button
						data-testid='formeditor-delete-button'
						variant='contained'
						size='large'
						fullWidth
						className={classes.formbutton}
						onClick={onDelete}
					>
						Delete
					</Button>
				) : null}
				<Button
					data-testid='formeditor-cancel-button'
					variant='contained'
					size='large'
					fullWidth
					className={classes.formbutton}
					onClick={handleOnCancel}
				>
					Cancel
				</Button>
			</div>
		</Box>
	)
}

export default FormEditor
