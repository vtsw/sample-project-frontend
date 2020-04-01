import gql from 'graphql-tag'

import { MESSAGE } from './fragment'

const DELETE_MESSAGE = gql`
	mutation DeleteMessage($id: ID!) {
		deleteMessage(id: $id) {
			...Message
		}
	}
	${MESSAGE}
`
const UPDATE_MESSAGE = gql`
	mutation UpdateMessage($message: UpdateMessageInput!) {
		updateMessage(message: $message) {
			...Message
		}
	}
	${MESSAGE}
`

export { DELETE_MESSAGE, UPDATE_MESSAGE }
