import React from 'react'
import { withRouter } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'

import { SignInFormEditor } from './components'

import { setToken } from '@src/shares/utils'
import { SIGN_IN } from './gql/mutation'
import { SET_UPLOADED_FILE } from '@views/File/gql/mutation'

const SignIn = props => {
	const { history } = props

	const [setUploadedFile] = useMutation(SET_UPLOADED_FILE, {
		onError: err => alert(err),
	})

	const [signIn] = useMutation(SIGN_IN, {
		onCompleted: ({ login: { token, user } }) =>
			handleOnSignInCompleted({ user, token }),
		onError: err => alert(err),
		fetchPolicy: 'no-cache',
	})

	const handleOnSubmit = (email, password) => {
		signIn({ variables: { user: { email, password } } })
	}

	const navigateToHomePage = () => history.push('/')

	const handleOnSignInCompleted = ({ user, token }) => {
		setUploadedFile({ variables: { file: user.image } })
		setToken(token)
		navigateToHomePage()
	}

	return <SignInFormEditor history={history} onSubmit={handleOnSubmit} />
}

export default withRouter(SignIn)
