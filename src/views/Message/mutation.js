import gql from 'graphql-tag'

const DELETE_MESSAGE = gql`
	mutation DeleteMessage($id: ID!) {
		deleteMessage(id: $id) {
			id
			lastModified
			content
		}
	}
`
const UPDATE_MESSAGE = gql`
	mutation UpdateMessage($message: UpdateMessageInput!) {
		updateMessage(message: $message) {
			id
			lastModified
			content
		}
	}
`
const CREATE_MESSAGE = gql`
	mutation CreateMessage($message: CreateMessageInput!) {
		createMessage(message: $message) {
			id
			lastModified
			content
		}
	}
`

export { DELETE_MESSAGE, UPDATE_MESSAGE, CREATE_MESSAGE }
