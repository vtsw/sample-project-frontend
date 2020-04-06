import gql from 'graphql-tag'

const RESET_CACHE = gql`
	mutation ResetCache($data: Data!) {
		resetCache(data: $data) @client {
			data
		}
	}
`

export { RESET_CACHE }
