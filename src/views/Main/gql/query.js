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

const GET_USER_SEARCH_TEXT = gql`
	query {
		userSearchValueOfMain @client
	}
`

export { GET_SELECTED_USER_OF_MAIN, GET_USER_SEARCH_TEXT }
