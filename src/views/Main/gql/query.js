import gql from 'graphql-tag'

import { USER } from './fragment'

const GET_SELECTED_USER_OF_MAIN = gql`
	query {
		selectedUserOfMain @client {
			...User
		}
	}
	${USER}
`

const SET_SELECTED_USER_OF_MAIN = gql`
	mutation SetSelectedUserOfMain($selectedUser: User!) {
		setSelectedUserOfMain(selectedUser: $selectedUser) @client {
			...User
		}
	}
	${USER}
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
	SET_SELECTED_USER_OF_MAIN,
	GET_SELECTED_USER_OF_MAIN,
	GET_USER_SEARCH_TEXT,
	SET_USER_SEARCH_TEXT,
}
