import gql from 'graphql-tag'

const ZALO_MESSAGE = gql`
	fragment ZaloMessage on ZaloMessage {
		id
		content
		from {
			displayName
			id
			avatar
		}
		timestamp
		to {
			displayName
			id
			avatar
		}
		type
	}
`

export { ZALO_MESSAGE }
