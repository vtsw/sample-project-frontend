import gql from 'graphql-tag'

const USER_FIELDS = gql`
	fragment UserFields on User {
		id
		name
		email
	}
`

const CREATE_USER = gql`
	mutation CreateUser($user: CreateUserInput!) {
		createUser(user: $user) {
			...UserFields
		}
	}
	${USER_FIELDS}
`

const UPDATE_USER = gql`
	mutation UpdateUser($user: UpdateUserInput!) {
		updateUser(user: $user) {
			...UserFields
		}
	}
	${USER_FIELDS}
`

const DELETE_USER = gql`
	mutation DeleteUser($id: ID!) {
		deleteUser(id: $id) {
			...UserFields
		}
	}
	${USER_FIELDS}
`

const FETCH_USER_LIST = gql`
	query FetchUserList($query: UserListInput) {
		userList(query: $query) {
			items {
				...UserFields
			}
		}
	}
	${USER_FIELDS}
`

const GET_USER_SEARCH_TEXT = gql`
	query UserSearchValue {
		userSearchValue @client
	}
`

const SET_USER_SEARCH_TEXT = gql`
	mutation SetUserSearchValue($searchValue: String!) {
		setUserSearchValue(searchValue: $searchValue) @client
	}
`

export {
	CREATE_USER,
	UPDATE_USER,
	DELETE_USER,
	FETCH_USER_LIST,
	GET_USER_SEARCH_TEXT,
	SET_USER_SEARCH_TEXT,
}
