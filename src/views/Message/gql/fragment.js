import gql from 'graphql-tag'

const MESSAGE = gql`
	fragment Message on Message {
		id
		content
		lastModified
	}
`

export { MESSAGE }
