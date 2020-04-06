import gql from 'graphql-tag'

import { USER } from './fragment'

const SET_SELECTED_USER_OF_MAIN = gql`
	mutation SetSelectedUserOfMain($selectedUser: User!) {
		setSelectedUserOfMain(selectedUser: $selectedUser) @client {
			...UserOfMain
		}
	}
	${USER}
`

const SET_USER_SEARCH_TEXT = gql`
	mutation SetUserSearchValueOfMain($searchValue: String!) {
		setUserSearchValueOfMain(searchValue: $searchValue) @client
	}
`

export { SET_SELECTED_USER_OF_MAIN, SET_USER_SEARCH_TEXT }
