import gql from 'graphql-tag'

const DELETE_MESSAGE = gql`
	mutation DeleteMessage($id: ID!) {
		deleteMessage(id: $id) {
			id
			content
		}
	}
`
const UPDATE_MESSAGE = gql`
	mutation UpdateMessage($message: UpdateMessageInput!) {
		updateMessage(message: $message) {
			id
			content
		}
	}
`

export { DELETE_MESSAGE, UPDATE_MESSAGE }
