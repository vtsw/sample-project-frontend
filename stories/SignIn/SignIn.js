import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { linkTo } from '@storybook/addon-links'

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

const SignIn = props => {
	const { handleSignIn } = props
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const classes = useStyles()

	const onSignIn = () => {
		handleSignIn({ email, password })
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
					</Button>
					<Typography
						data-cy='signup-text'
						variant='body2'
						className={classes.signuptext}
						onClick={linkTo('SignUp', 'signUp')}
					>
						sign up
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
