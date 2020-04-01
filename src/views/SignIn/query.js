import gql from 'graphql-tag'

const SIGN_IN = gql`
	mutation SignIn($user: LoginUserInput!) {
		login(user: $user) {
			token
		}
	}
`

export { SIGN_IN }
