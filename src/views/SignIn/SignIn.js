import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Box, Button, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { setToken } from '@src/shares/utils'

const SIGN_IN = gql`
	mutation SignIn($user: LoginUserInput!) {
		login(user: $user) {
			token
		}
	}
`

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

// const theme = createMuiTheme({
// // 	palette: {
// // 		primary: {
// // 			main: teal[600],
// // 		},
// // 	},
// // })

const SignIn = props => {
	const { history } = props
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [signIn] = useMutation(SIGN_IN, {
		onError: err => {
			alert(err)
		},
	})

	const classes = useStyles()

	const onSignIn = () => {
		signIn({ variables: { user: { email, password } } })
			.then(
				({
					data: {
						login: { token },
					},
				}) => {
					setToken(token)
					history.push('/')
				}
			)
			.catch(error => console.error(error))
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
						onClick={() => history.push('/sign-up')}
					>
						sign up
					</Typography>
				</div>
			</Box>
		</Box>
	)
}

export default withRouter(SignIn)
