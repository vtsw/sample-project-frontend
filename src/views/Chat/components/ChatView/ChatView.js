import React, { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'

import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { Header, ViewMessage, EditorChat } from './components'

import {
	GET_USER_INFO,
	GET_ZALO_MESSAGE_LIST,
	GET_MAP_ZALO_MESSAGE_ATTACHMENT,
} from '@views/Chat/gql/query'
import { ON_ZALO_MESSAGE_CREATED } from '@views/Chat/gql/subscription'

import { NETWORK_STATUS_FETCH_MORE } from '@src/configs.local'

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		borderRight: '1px solid #e5e5e9',
		height: '100vh',
	},
	root__nodata: {
		display: 'flex',
		flex: 1,
		width: '100%',
		backgroundColor: '#e5e5e9',
		alignItems: 'center',
		justifyContent: 'center',
	},
}))

const ChatView = props => {
	const { selectedUserOfChat } = props
	const classes = useStyles()
	const { data: zaloAttachmentMessageData } = useQuery(
		GET_MAP_ZALO_MESSAGE_ATTACHMENT
	)
	const { data, loading, subscribeToMore, fetchMore, networkStatus } = useQuery(
		GET_ZALO_MESSAGE_LIST,
		{
			notifyOnNetworkStatusChange: true,
			variables: {
				query: {
					limit: 15,
					interestedUserId: selectedUserOfChat.id,
				},
			},
		}
	)
	const {
		data: { me },
		loading: loadingMe,
	} = useQuery(GET_USER_INFO)

	useEffect(() => {
		subscribeToMore({
			document: ON_ZALO_MESSAGE_CREATED,
			variables: { filter: { interestedUserId: selectedUserOfChat.id } },
			shouldResubscribe: true,
			updateQuery: (prev, { subscriptionData }) => {
				const zaloAttachmentMessages =
					zaloAttachmentMessageData.zaloMessageAttachmentList.items
				let newMessage = subscriptionData.data.onZaloMessageCreated
				if (!subscriptionData.data) return prev

				if (newMessage.attachments && newMessage.attachments.length) {
					const messageIndex = zaloAttachmentMessages.findIndex(
						item => item.id === newMessage.id
					)

					if (messageIndex === -1) return
					if (
						newMessage.attachments[0].type === 'image' ||
						newMessage.attachments[0].type === 'gif'
					) {
						newMessage.attachments[0].payload.url =
							zaloAttachmentMessages[messageIndex].url
					}
				}

				return Object.assign({}, prev, {
					zaloMessageList: {
						...prev.zaloMessageList,
						items: [newMessage, ...prev.zaloMessageList.items],
					},
				})
			},
		})
	}, [subscribeToMore, selectedUserOfChat, zaloAttachmentMessageData])

	if (loadingMe) return 'loading'
	const handleFetchMore = () => {
		fetchMore({
			variables: {
				query: {
					limit: 10,
					interestedUserId: selectedUserOfChat.id,
					skip: data.zaloMessageList.items.length,
				},
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				if (!fetchMoreResult) return prev
				const fetchedMessageList = fetchMoreResult.zaloMessageList
				let cacheMessageList = prev.zaloMessageList
				const items = [...cacheMessageList.items, ...fetchedMessageList.items]
				const hasNext = fetchedMessageList.hasNext
				return {
					zaloMessageList: {
						...cacheMessageList,
						items,
						hasNext,
					},
				}
			},
		})
	}
	return (
		<Box className={classes.root}>
			<Header selectedUserOfChat={selectedUserOfChat} />
			{loading && networkStatus !== NETWORK_STATUS_FETCH_MORE ? (
				<Box className={classes.root__nodata}>Loading</Box>
			) : data && data.zaloMessageList.items.length > 0 ? (
				<ViewMessage
					me={me}
					selectedUserOfChatId={selectedUserOfChat.id}
					items={data.zaloMessageList.items}
					hasNext={data.zaloMessageList.hasNext}
					handleFetchMore={handleFetchMore}
					loadMore={networkStatus === NETWORK_STATUS_FETCH_MORE}
				/>
			) : (
				<Box className={classes.root__nodata}>Chưa có cuộc hội thoại nào</Box>
			)}

			<EditorChat idUser={selectedUserOfChat.id} />
		</Box>
	)
}

export default ChatView
