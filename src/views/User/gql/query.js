import gql from 'graphql-tag'
import { USER } from './fragment'

const FETCH_USER_LIST = gql`
	query FetchUserList($query: UserListInput) {
		userList(query: $query) {
			items {
				...User
			}
			hasNext
		}
	}
	${USER}
`

const GET_USER_SEARCH_TEXT = gql`
	query UserSearchValue {
		userSearchValue @client
	}
`

const GET_SELECTED_USER = gql`
	query GetSelectedUser {
		selectedUser @client {
			...User
		}
	}
	${USER}
`

export { FETCH_USER_LIST, GET_USER_SEARCH_TEXT, GET_SELECTED_USER }
