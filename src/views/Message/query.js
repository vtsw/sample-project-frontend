import gql from 'graphql-tag'

const MESSAGE_LIST = gql`
	query MessageList($query: MessageListInput) {
		messageList(query: $query) {
			items {
				content
				id
				lastModified
			}
			hasNext
			total
		}
	}
`
const MESSAGE_LIST_WITHOUT_FILTER = gql`
	query {
		messageList(query: { limit: 100 }) {
			items {
				content
				id
				lastModified
			}
			hasNext
			total
		}
	}
`

export { MESSAGE_LIST, MESSAGE_LIST_WITHOUT_FILTER }
