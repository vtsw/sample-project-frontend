import gql from 'graphql-tag'

const GET_SELECTED_USER_OF_CHAT = gql`
	query {
		selectedUserOfChat @client {
			id
			displayName
			avatar
		}
	}
`
const GET_DRAFT_LIST = gql`
	query {
		draftList @client {
			items {
				toInterestId
				message
			}
		}
	}
`

const GET_USER_INFO = gql`
	query {
		me {
			id
			name
			email
			image {
				link
				filename
			}
			followers {
				items {
					displayName
					id
					avatar
				}
			}
		}
	}
`

const GET_NEW_NOTI_MESSAGE_LIST = gql`
	query {
		newNotiMessageList @client {
			items {
				fromInterestedId
				numberNoti
				lastMessage
			}
		}
	}
`

const GET_ZALO_MESSAGE_LIST = gql`
	query ZaloMessageList($query: ZaloMessageListInput) {
		zaloMessageList(query: $query) {
			items {
				id
				type
				content
				from {
					displayName
					id
					avatar
				}
				attachments {
					type
					payload {
						thumbnail
						description
						title
						url
					}
				}
				to {
					displayName
					id
					avatar
				}
				timestamp
			}

			hasNext
			total
		}
	}
`

const GET_USER_SEARCH_TEXT = gql`
	query {
		userSearchValueOfChat @client
	}
`

const GET_MAP_ZALO_MESSAGE_ATTACHMENT = gql`
	query {
		zaloMessageAttachmentList @client {
			items {
				id
				url
			}
		}
	}
`

export {
	GET_SELECTED_USER_OF_CHAT,
	GET_DRAFT_LIST,
	GET_ZALO_MESSAGE_LIST,
	GET_USER_SEARCH_TEXT,
	GET_NEW_NOTI_MESSAGE_LIST,
	GET_USER_INFO,
	GET_MAP_ZALO_MESSAGE_ATTACHMENT,
}
