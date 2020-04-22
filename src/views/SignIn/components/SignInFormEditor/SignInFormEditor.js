import React, { useState } from 'react'

import { Box, Button, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { validateEmail, validatePassword } from '@src/shares/utils'

const useStyles = makeStyles(theme => ({
	root: {
		height: '100vh',
		width: '100%',
		display: 'flex',
		alignItems: 'center',
	},
	container: {
		width: 381,
		margin: '20px auto',
		padding: theme.spacing(2),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	title: {
		color: theme.palette.primary.main,
		fontWeight: 600,
	},
	input: {
		width: '100%',
		marginTop: '18px',
	},
	cardcontent: {
		padding: 0,
	},
	actions: {
		padding: 0,
		width: '100%',
		'&>button': {
			marginTop: theme.spacing(2),
		},
	},
	button: {
		fontWeight: 600,
		textTransform: 'unset',
		padding: '18px 0',
	},
	signuptext: {
		marginTop: theme.spacing(2),
		cursor: 'pointer',
	},
}))

const SignInForm = props => {
	const { onSubmit, history } = props
	const classes = useStyles()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleOnSubmit = () => {
		const isValidEmail = validateEmail(email)
		const isValidPassword = validatePassword(password)

		if (isValidEmail && isValidPassword) {
			onSubmit(email, password)
			return
		} else {
			alert('Invalid email and password')
		}
	}

	const handlePressEnter = e => {
		if (e.keyCode === 13) {
			handleOnSubmit()
		}
	}

	return (
		<Box className={classes.root}>
			<Box className={classes.container}>
				<Typography variant='h5' className={classes.title}>
					Sign in
				</Typography>
				<div className={classes.cardContent}>
					<TextField
						value={email}
						label='EMAIL'
						placeholder='Email'
						variant='outlined'
						type='email'
						autoComplete='true'
						className={classes.input}
						onChange={e => setEmail(e.target.value)}
					/>
					<TextField
						value={password}
						label='PASSWORD'
						placeholder='Password'
						variant='outlined'
						type='password'
						autoComplete='true'
						className={classes.input}
						onChange={e => setPassword(e.target.value)}
						onKeyDown={handlePressEnter}
					/>
				</div>
				<div className={classes.actions}>
					<Button
						data-testid='signin-button'
						variant='contained'
						color='primary'
						size='large'
						fullWidth
						className={classes.button}
						onClick={handleOnSubmit}
					>
						Sign in
					</Button>
					<Typography
						data-testid='signup-text'
						variant='body2'
						className={classes.signuptext}
						onClick={() => history.push('/sign-up')}
					>
						sign up
					</Typography>
				</div>
			</Box>
		</Box>
	)
}

export default SignInForm
