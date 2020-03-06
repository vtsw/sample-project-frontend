import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { Box } from '@material-ui/core'
import FormEditor from '@components/FormEditor'

const useStyles = makeStyles({
	root: {
		height: '100vh',
		width: '100%',
		display: 'flex',
		alignItems: 'center',
	},
})

const SignUp = () => {
	const classes = useStyles()
	return (
		<Box className={classes.root}>
			<FormEditor />
		</Box>
	)
}

export default SignUp
