import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import LinkTo from '@storybook/addon-links/react'
import { action } from '@storybook/addon-actions'
import { text } from '@storybook/addon-knobs'

const useStyles = makeStyles(theme => ({
	root: {
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

const SignIn = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const classes = useStyles()

	const onSignIn = () => {
		handleSignIn({ email, password })
	}
	const mail = text('email', 'example@gmail.com')
	const pass = text('pass', '12345')

	const handleSignIn = ({ email, password }) => {
		action('Sign-in')({ email, password })

		if (!email) {
			alert('empty email')
			return
		}
		if (!password) {
			alert('empty password')
			return
		}

		if (mail === email && pass === password) alert('Logged in')
		else alert('Invalid email or password')
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
						variant='outlined'
						type='email'
						autoComplete='true'
						className={classes.input}
						onChange={e => setEmail(e.target.value)}
					/>
					<TextField
						value={password}
						label='PASSWORD'
						variant='outlined'
						type='password'
						autoComplete='true'
						className={classes.input}
						onChange={e => setPassword(e.target.value)}
					/>
				</div>
				<div className={classes.actions}>
					<Button
						data-cy='signin-button'
						variant='contained'
						color='primary'
						size='large'
						fullWidth
						className={classes.button}
						onClick={onSignIn}
					>
						Sign in
					</Button>{' '}
					<Typography
						data-cy='signup-text'
						variant='body2'
						className={classes.signuptext}
						// onClick={linkTo('SignUp', 'signUp')}
					>
						{' '}
						<LinkTo
							kind='component-api-signup'
							story='sign-up'
							// story='SignUp' // it only use when have more than 2 story in abcxyz.stories.js
							// // target='_blank'
							// style={{ color: '#1474f3' }}
						>
							sign up
						</LinkTo>
						<LinkTo
							kind='component-api-signup'
							story='sign-up'
							// story='SignUp' // it only use when have more than 2 story in abcxyz.stories.js
							// // target='_blank'
							// style={{ color: '#1474f3' }}
						>
							Reservation
						</LinkTo>
					</Typography>
				</div>
			</Box>
		</Box>
	)
}

export default SignIn

SignIn.propTypes = {
	history: PropTypes.object,
}

SignIn.defaultProps = {}
