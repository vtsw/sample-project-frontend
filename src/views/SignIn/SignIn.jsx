import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import {
	makeStyles,
	createMuiTheme,
	ThemeProvider,
} from '@material-ui/core/styles'
import teal from '@material-ui/core/colors/teal'

import { Box, Button, TextField, Typography } from '@material-ui/core'

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
		padding: 16,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	title: {
		color: teal[600],
		fontWeight: 600,
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
		textTransform: 'unset',
		padding: '18px 0',
	},
	sign_up_text: {
		marginTop: theme.spacing(2),
		cursor: 'pointer',
	},
}))

const theme = createMuiTheme({
	palette: {
		primary: {
			main: teal[600],
		},
	},
})

const SignIn = ({ history }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const classes = useStyles()

	return (
		<ThemeProvider theme={theme}>
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
							onChange={e => setEmail(e.target.value)}
							className={classes.input}
						/>
						<TextField
							value={password}
							label='PASSWORD'
							variant='outlined'
							type='password'
							autoComplete='true'
							onChange={e => setPassword(e.target.value)}
							className={classes.input}
						/>
					</div>
					<div className={classes.actions}>
						<Button
							variant='contained'
							color='primary'
							size='large'
							fullWidth
							className={classes.button}
						>
							Sign in
						</Button>
						<Typography
							variant='body2'
							className={classes.sign_up_text}
							onClick={() => history.push('/sign-up')}
						>
							sign up
						</Typography>
					</div>
				</Box>
			</Box>
		</ThemeProvider>
	)
}

export default withRouter(SignIn)
