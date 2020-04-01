import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from '@material-ui/core'
import FormEditor from './FormEditor'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

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

const SignUp = props => {
	const { handleSignIn } = props
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const classes = useStyles()

	const onSignIn = () => {
		handleSignIn({ email, password })
	}
	return <FormEditor />
}

export default SignUp

SignUp.propTypes = {
	history: PropTypes.object,
}

SignUp.defaultProps = {}
