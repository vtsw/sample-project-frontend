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

const GET_SELECTED_USER_OF_MAIN = gql`
	query {
		selectedUserOfMain @client {
			id
			name
			email
		}
	}
`

const SET_SELECTED_USER_OF_MAIN = gql`
	mutation SetSelectedUserOfMain($selectedUser: User!) {
		setSelectedUserOfMain(selectedUser: $selectedUser) @client {
			id
			name
			email
		}
	}
`

const GET_USER_SEARCH_TEXT = gql`
	query {
		userSearchValueOfMain @client
	}
`

const SET_USER_SEARCH_TEXT = gql`
	mutation SetUserSearchValueOfMain($searchValue: String!) {
		setUserSearchValueOfMain(searchValue: $searchValue) @client
	}
`

export {
	USER_LIST,
	MESSAGE_LIST,
	SET_SELECTED_USER_OF_MAIN,
	GET_SELECTED_USER_OF_MAIN,
	GET_USER_SEARCH_TEXT,
	SET_USER_SEARCH_TEXT,
}
