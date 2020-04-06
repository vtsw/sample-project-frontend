import gql from 'graphql-tag'

const USER = gql`
	fragment UserOfMain on UserOfMain {
		id
		name
		email
	}
`

export { USER }
