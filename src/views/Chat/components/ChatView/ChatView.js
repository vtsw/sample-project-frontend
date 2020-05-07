import React, { useEffect, useRef } from 'react'
import { makeStyles, Box } from '@material-ui/core'
import Header from './components/Header'
import ViewMessage from './components/ViewMessage'
import EditorChat from './components/EditorChat/EditorChat'
import { useQuery, useSubscription } from '@apollo/react-hooks'
import { GET_ZALO_MESSAGE_LIST } from '../../gql/query'
import { ON_ZALO_MESSAGE_CREATED } from '../../gql/subscription'

import { NETWORK_STATUS_FETCH_MORE } from '@src/configs.local'
import gql from 'graphql-tag'

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

const GET_USER_INFO = gql`
	query {
		me {
			id
		}
	}
`

export default function ChatView({ selectedUserOfChat }) {
	const childRef = useRef()
	const classes = useStyles()
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
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) return prev

				if (me.id === subscriptionData.data.onZaloMessageCreated.from.id) {
					childRef.current.handleEndOfTable()
				} else {
					childRef.current.handleShowButtonScrollNewMessage()
				}

				const newMessage = subscriptionData.data.onZaloMessageCreated

				return Object.assign({}, prev, {
					zaloMessageList: {
						...prev.zaloMessageList,
						items: [newMessage, ...prev.zaloMessageList.items],
					},
				})
			},
		})
	}, [subscribeToMore, selectedUserOfChat])

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
					ref={childRef}
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
