import gql from 'graphql-tag'

const USER = gql`
	fragment User on UserOfMain {
		id
		name
		email
	}
`

const MESSAGE = gql`
	fragment Message on Message {
		id
		content
		lastModified
	}
`

export { USER, MESSAGE }
