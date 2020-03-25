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

const GET_MESSAGE_SEARCH_TEXT = gql`
	query {
		messageSearchValueOfMessage @client
	}
`
const SET_MESSAGE_SEARCH_TEXT = gql`
	mutation SetMessageSearchValueOfMain($searchValue: String!) {
		setMessageSearchValueOfMain(searchValue: $searchValue) @client
	}
`

const GET_MESSAGE_CREATE_TEXT = gql`
	query {
		messageCreateValueOfMessage @client
	}
`

const SET_MESSAGE_CREATE_TEXT = gql`
	mutation SetMessageCreateValueOfMain($createValue: String!) {
		setMessageCreateValueOfMain(createValue: $createValue) @client
	}
`

export {
	MESSAGE_LIST,
	GET_MESSAGE_SEARCH_TEXT,
	SET_MESSAGE_SEARCH_TEXT,
	SET_MESSAGE_CREATE_TEXT,
	GET_MESSAGE_CREATE_TEXT,
}
