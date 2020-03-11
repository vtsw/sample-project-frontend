import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { Box } from '@material-ui/core'
import FormEditor from '@views_components/FormEditor'

const useStyles = makeStyles({
	root: {
		height: '100vh',
		width: '100%',
		display: 'flex',
		alignItems: 'center',
	},
})

const SignUp = () => {
	const [email, setEmail] = useState('')
	const [name, setName] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const classes = useStyles()
	return (
		<Box className={classes.root}>
			<FormEditor
				name={name}
				email={email}
				password={password}
				confirmPassword={confirmPassword}
				setName={setName}
				setEmail={setEmail}
				setPassword={setPassword}
				setConfirmPassword={setConfirmPassword}
			/>
		</Box>
	)
}

export default SignUp
