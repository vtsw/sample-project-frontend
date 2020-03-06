import React, { useState } from 'react'
import {
	makeStyles,
	createMuiTheme,
	ThemeProvider,
} from '@material-ui/core/styles'
import teal from '@material-ui/core/colors/teal'

// import { setToken } from '@src/shares/utils'

import { Box, Button, TextField } from '@material-ui/core'

const useStyles = makeStyles({
	root: {
		minWidth: 300,
		width: '70%',
		margin: '20px auto',
		padding: 16,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	title: {
		color: teal[600],
	},
	input: {
		width: '100%',
		marginTop: '18px',
	},
	cardContent: {
		padding: 0,
	},
	actions: {
		display: 'flex',
		flexDirection: 'column',
		padding: 0,
		width: '100%',
		'&>button': {
			marginTop: 16,
			marginLeft: 0,
			'&:not(:first-child)': {
				marginLeft: 0,
			},
		},
	},
	button: {
		color: '#ffffff',
		fontWeight: 600,
		textTransform: 'capitalize',
	},
})

const theme = createMuiTheme({
	palette: {
		primary: {
			main: teal[600],
		},
	},
})

// const LOG_IN = gql`
// 	mutation Login($email: String!, $password: String!) {
// 		login(email: $email, password: $password) {
// 			token
// 		}
// 	}
// `

const SignUp = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const { root, title, input, cardContent, actions, button } = useStyles()

	// const [login, authPayload] = useMutation(LOG_IN)

	// const signIn = () => {
	// 	login({
	// 		variables: { email, password },
	// 	})
	// 		.then(({ data: { login: token } }) => {
	// 			if (token) {
	// 				setToken(token.token)
	// 				history.push('/')
	// 			}
	// 		})
	// 		.catch(err => console.error(err))
	// }
	// if (authPayload.loading) return <div>Loading...</div>

	return (
		<ThemeProvider theme={theme}>
			<Box className={root}>
				<h2 className={title}>Sign up</h2>
				<div className={cardContent}>
					<TextField
						value={email}
						label='EMAIL'
						variant='outlined'
						type='email'
						autoComplete='true'
						onChange={e => setEmail(e.target.value)}
						className={input}
					/>
					<TextField
						value={password}
						label='NAME'
						variant='outlined'
						type='text'
						autoComplete='true'
						onChange={e => setPassword(e.target.value)}
						className={input}
					/>
					<TextField
						value={password}
						label='PASSWORD'
						variant='outlined'
						type='password'
						autoComplete='true'
						onChange={e => setPassword(e.target.value)}
						className={input}
					/>
					<TextField
						value={password}
						label='PASSWORD CONFIRM'
						variant='outlined'
						type='password'
						autoComplete='true'
						onChange={e => setPassword(e.target.value)}
						className={input}
					/>
				</div>
				<div className={actions}>
					<Button
						variant='contained'
						color='primary'
						size='large'
						fullWidth
						className={button}
					>
						Register
					</Button>
					<Button variant='contained' size='large' fullWidth className={button}>
						Cancel
					</Button>
				</div>
			</Box>
		</ThemeProvider>
	)
}

export default SignUp
