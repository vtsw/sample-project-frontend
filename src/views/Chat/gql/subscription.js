import gql from 'graphql-tag'
import { ZALO_MESSAGE } from './fragment'

const ON_ZALO_MESSAGE_RECEIVED = gql`
	subscription {
		onZaloMessageReceived {
			...ZaloMessage
		}
	}
	${ZALO_MESSAGE}
`
const ON_ZALO_MESSAGE_CREATED = gql`
	subscription onZaloMessageCreated($filter: OnZaloMessageCreatedInput!) {
		onZaloMessageCreated(filter: $filter) {
			attachments {
				payload {
					thumbnail
					title
					url
					description
					name
				}
				type
			}
			...ZaloMessage
		}
	}
	${ZALO_MESSAGE}
`
const ON_ZALO_MESSAGE_RECEIVED_FROM_USER = gql`
	subscription onZaloMessageReceived($filter: OnZaloMessageReceivedInput) {
		onZaloMessageReceived(filter: $filter) {
			...ZaloMessage
		}
	}
	${ZALO_MESSAGE}
`

const ON_ZALO_MESSAGE_CREATED_TO_USER = gql`
	subscription onZaloMessageCreated($filter: OnZaloMessageCreatedInput) {
		onZaloMessageCreated(filter: $filter) {
			...ZaloMessage
		}
	}
	${ZALO_MESSAGE}
`

export {
	ON_ZALO_MESSAGE_RECEIVED,
	ON_ZALO_MESSAGE_CREATED,
	ON_ZALO_MESSAGE_RECEIVED_FROM_USER,
	ON_ZALO_MESSAGE_CREATED_TO_USER,
}
