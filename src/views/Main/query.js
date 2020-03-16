import gql from 'graphql-tag'

const USER_LIST = gql`
	query UserList($query: UserListInput) {
		userList(query: $query) {
			items {
				name
				email
				id
			}
			hasNext
			total
		}
	}
`

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

const USER_LIST_WITHOUT_FILTER = gql`
	query {
		userList(query: { limit: 100 }) {
			items {
				name
				email
				id
			}
			hasNext
			total
		}
	}
`

export { USER_LIST, USER_LIST_WITHOUT_FILTER, MESSAGE_LIST }
