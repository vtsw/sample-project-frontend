import gql from 'graphql-tag'
import { ZALO_MESSAGE } from './fragment'

const SET_SELECTED_USER_OF_CHAT = gql`
	mutation SetSelectedUserOfChat($selectedUser: User!) {
		setSelectedUserOfChat(selectedUser: $selectedUser) @client {
			id
			name
		}
	}
`
const SET_DRAFT_LIST = gql`
	mutation SetDraftList($draft: Draft!) {
		setDraftList(draft: $draft) @client {
			toInterestId
			message
		}
	}
`
const SET_STATUS_READED_MESSAGE = gql`
	mutation SetStatusReadedMessage($readedMessage: ReadedMessage!) {
		setStatusReadedMessage(readedMessage: $readedMessage) @client {
			fromInterestedId
			numberNoti
			lastMessage
		}
	}
`

const SET_USER_SEARCH_TEXT = gql`
	mutation SetUserSearchValueOfChat($searchValue: String!) {
		setUserSearchValueOfChat(searchValue: $searchValue) @client
	}
`

const CREATE_ZALO_MESSAGE = gql`
	mutation CreateZaloMessage($message: CreateZaloMessageInput!) {
		createZaloMessage(message: $message) {
			...ZaloMessage
		}
	}
	${ZALO_MESSAGE}
`

const CREATE_ZALO_MESSAGE_ATTACHMENT = gql`
	mutation CreateZaloMessageAttachment(
		$file: CreateZaloMessageAttachmentInput!
	) {
		createZaloMessageAttachment(message: $file) {
			attachments {
				type
				payload {
					thumbnail
					description
					url
					name
				}
			}
			...ZaloMessage
		}
	}
	${ZALO_MESSAGE}
`

const SET_CREATE_ZALO_MESSAGE_ATTACHMENT = gql`
	mutation SetCreateZaloMessageAttachment($message: AttachmentMessage!) {
		setCreateZaloMessageAttachment(message: $message) @client
	}
`

export {
	SET_SELECTED_USER_OF_CHAT,
	SET_DRAFT_LIST,
	SET_STATUS_READED_MESSAGE,
	SET_USER_SEARCH_TEXT,
	CREATE_ZALO_MESSAGE,
	CREATE_ZALO_MESSAGE_ATTACHMENT,
	SET_CREATE_ZALO_MESSAGE_ATTACHMENT,
}
