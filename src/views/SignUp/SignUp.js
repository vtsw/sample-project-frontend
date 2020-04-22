import React from 'react'
import { withRouter } from 'react-router-dom'

import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { useMutation } from '@apollo/react-hooks'

import { FormEditor } from '@views_components'

import { CREATE_USER } from '@views/User/gql/mutation'

const useStyles = makeStyles({
	root: {
		height: '100vh',
		width: '100%',
		display: 'flex',
		alignItems: 'center',
	},
})

const SignUp = props => {
	const { history } = props
	const classes = useStyles()

	const [createNewUser] = useMutation(CREATE_USER)

	const createUser = ({ email, name, password }) => {
		createNewUser({
			variables: { user: { email, name, password } },
		}).then(navigateToSignInPage)
	}

	const navigateToSignInPage = () => history.push('/sign-in')

	return (
		<Box className={classes.root}>
			<FormEditor
				onSubmit={createUser}
				onCancel={() => history.push('/sign-in')}
			/>
		</Box>
	)
}

export default withRouter(SignUp)
