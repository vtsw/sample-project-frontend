import gql from 'graphql-tag'

const ON_ZALO_MESSAGE_RECEIVED = gql`
	subscription {
		onZaloMessageReceived {
			id
			type
			from {
				displayName
				id
				avatar
			}
			to {
				displayName
				id
				avatar
			}
			timestamp
			content
		}
	}
`
const ON_ZALO_MESSAGE_CREATED = gql`
	subscription onZaloMessageCreated($filter: OnZaloMessageCreatedInput!) {
		onZaloMessageCreated(filter: $filter) {
			id
			from {
				displayName
				id
				avatar
			}
			type
			to {
				displayName
				id
				avatar
			}
			timestamp
			content
			attachments {
				payload {
					thumbnail
					url
					description
				}
				type
			}
		}
	}
`
const ON_ZALO_MESSAGE_RECEIVED_FROM_USER = gql`
	subscription onZaloMessageReceived($filter: OnZaloMessageReceivedInput) {
		onZaloMessageReceived(filter: $filter) {
			id
			from {
				displayName
				id
				avatar
			}
			to {
				displayName
				id
				avatar
			}
			timestamp
			content
		}
	}
`

const ON_ZALO_MESSAGE_CREATED_TO_USER = gql`
	subscription onZaloMessageCreated($filter: OnZaloMessageCreatedInput) {
		onZaloMessageCreated(filter: $filter) {
			id
			from {
				displayName
				id
				avatar
			}
			type
			to {
				displayName
				id
				avatar
			}
			timestamp
			content
		}
	}
`

export {
	ON_ZALO_MESSAGE_RECEIVED,
	ON_ZALO_MESSAGE_CREATED,
	ON_ZALO_MESSAGE_RECEIVED_FROM_USER,
	ON_ZALO_MESSAGE_CREATED_TO_USER,
}
