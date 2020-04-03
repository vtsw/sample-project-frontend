import gql from 'graphql-tag'

const USER = gql`
	fragment User on User {
		id
		name
		email
	}
`

export { USER }
