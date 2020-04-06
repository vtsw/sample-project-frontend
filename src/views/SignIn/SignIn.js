import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'

import { Box, Button, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { setToken } from '@src/shares/utils'
import { SIGN_IN } from './gql/query'
import { SET_UPLOADED_FILE } from '@views/File/gql/mutation'

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

const SignIn = props => {
	const { history } = props
	const classes = useStyles()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [setUploadedFile] = useMutation(SET_UPLOADED_FILE, {
		onError: err => alert(err),
	})

	const [signIn] = useMutation(SIGN_IN, {
		onCompleted: ({ login: { token, user } }) => {
			setUploadedFile({ variables: { file: user.image } })
			setToken(token)
			history.push('/')
		},
		onError: err => alert(err),
		fetchPolicy: 'network-only',
	})

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
						onClick={() => signIn({ variables: { user: { email, password } } })}
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
