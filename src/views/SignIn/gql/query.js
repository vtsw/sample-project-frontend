import gql from 'graphql-tag'

const SIGN_IN = gql`
	mutation SignIn($user: LoginUserInput!) {
		login(user: $user) {
			token
			user {
				name
				email
				image {
					filename
					link
				}
			}
		}
	}
`

export { SIGN_IN }
