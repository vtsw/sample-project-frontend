import gql from 'graphql-tag'

const FILE = gql`
	fragment File on File {
		filename
		link
	}
`

export { FILE }
