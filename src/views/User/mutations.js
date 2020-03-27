import gql from 'graphql-tag'
import { USER } from './fragments'

const CREATE_USER = gql`
	mutation CreateUser($user: CreateUserInput!) {
		createUser(user: $user) {
			...User
		}
	}
	${USER}
`

const UPDATE_USER = gql`
	mutation UpdateUser($user: UpdateUserInput!) {
		updateUser(user: $user) {
			...User
		}
	}
	${USER}
`

const DELETE_USER = gql`
	mutation DeleteUser($id: ID!) {
		deleteUser(id: $id) {
			...User
		}
	}
	${USER}
`

const SET_USER_SEARCH_TEXT = gql`
	mutation SetUserSearchValue($searchValue: String!) {
		setUserSearchValue(searchValue: $searchValue) @client
	}
`

const SET_SELECTED_USER = gql`
	mutation SetSelectedUser($selectedUser: User!) {
		setSelectedUser(selectedUser: $selectedUser) @client {
			...User
		}
	}
	${USER}
`

export {
	CREATE_USER,
	UPDATE_USER,
	DELETE_USER,
	SET_USER_SEARCH_TEXT,
	SET_SELECTED_USER,
}
