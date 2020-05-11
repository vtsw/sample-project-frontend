import React, { useState } from 'react'

import { useMutation, useQuery } from '@apollo/react-hooks'

import { Box, Typography, makeStyles } from '@material-ui/core'

import {
	DeleteDialog,
	ModifyDialog,
	InfiniteTable,
	Loading,
} from '@views_components'

import { GET_SELECTED_USER_OF_MAIN } from '@views/Main/gql/query'
import { MESSAGE_LIST } from '@views/Message/gql/query'
import { DELETE_MESSAGE, UPDATE_MESSAGE } from '@views/Message/gql/mutation'
import { useDeleteMessage } from '@views/Message/gql/useMutation'

import { NETWORK_STATUS_FETCH_MORE, PAGE_LIMIT } from '@src/configs.local'

const useStyles = makeStyles(theme => ({
	root: {
		border: `1px solid ${theme.palette.common.border}`,
		marginLeft: theme.spacing(1.5),
		position: 'relative ',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	listtitle: {
		padding: theme.spacing(3),
		fontWeight: 700,
	},
	overlay: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		background: theme.palette.common.black,
		height: '100%',
		marginLeft: theme.spacing(1.5),
	},
}))

const tableHeaders = [
	{ headerLabel: 'DATE', xs: 5, headerVariable: 'lastModified' },
	{ headerLabel: 'CONTENT', xs: 7, headerVariable: 'content' },
]

const MessageList = () => {
	const classes = useStyles()

	const [modifyDialogVisible, setModifyDialogVisible] = useState(false)
	const [deleteDialogVisible, setDeleteDialogVisible] = useState(false)
	const [selectedMessage, setSelectedMessage] = useState('')

	const { data: selectedUserOfMainData } = useQuery(GET_SELECTED_USER_OF_MAIN)

	const messageListQueryVars = {
		query: {
			userId: selectedUserOfMainData?.selectedUserOfMain?.id,
			limit: PAGE_LIMIT,
		},
	}
	const { data: dataMsg, fetchMore, networkStatus, loading } = useQuery(
		MESSAGE_LIST,
		{
			variables: {
				query: {
					userId: selectedUserOfMainData?.selectedUserOfMain?.id,
					limit: PAGE_LIMIT,
				},
			},
			fetchPolicy: 'network-only',
			notifyOnNetworkStatusChange: true,
		}
	)

	const [deleteMessage] = useDeleteMessage(
		DELETE_MESSAGE,
		MESSAGE_LIST,
		messageListQueryVars
	)

	const [updateMessage] = useMutation(UPDATE_MESSAGE, {
		onError: err => alert(err),
	})

	const loadNextMessagePage = () => {
		try {
			fetchMore({
				variables: {
					query: {
						userId: selectedUserOfMainData?.selectedUserOfMain?.id,
						limit: PAGE_LIMIT,
						skip: dataMsg?.messageList?.items.length,
					},
				},
				updateQuery: (prev, { fetchMoreResult }) => {
					if (!fetchMoreResult) return prev
					const fetchedMessageList = fetchMoreResult.messageList
					let cacheMessageList = prev.messageList
					const items = [...cacheMessageList.items, ...fetchedMessageList.items]
					const hasNext = fetchedMessageList.hasNext

					return {
						messageList: {
							...cacheMessageList,
							items,
							hasNext,
						},
					}
				},
			})
		} catch (error) {
			alert(error.message)
		}
	}

	const handleOnSelectMessage = message => {
		setSelectedMessage(message)
		setModifyDialogVisible(true)
	}

	const handleOnDeleteMessage = message => {
		setDeleteDialogVisible(true)
		setSelectedMessage(message)
	}

	const handleOnAgreeDeleteMessage = () => {
		deleteMessage({ variables: { id: selectedMessage.id } }).then(() =>
			setDeleteDialogVisible(false)
		)
	}

	const handleOnAgreeModifyMessage = message => {
		updateMessage({
			variables: { message: { id: selectedMessage.id, content: message } },
		}).then(() => setModifyDialogVisible(false))
	}

	const valueDefault =
		dataMsg &&
		dataMsg.messageList.items.find(item => item.id === selectedMessage.id) &&
		dataMsg.messageList.items.find(item => item.id === selectedMessage.id)
			.content

	if (!selectedUserOfMainData?.selectedUserOfMain.id) {
		return (
			<Box className={classes.overlay}>
				<Typography variant='subtitle2' color='primary' gutterBottom>
					Select an item on the left.
				</Typography>
			</Box>
		)
	}

	return (
		<Box className={classes.root}>
			{loading && networkStatus !== NETWORK_STATUS_FETCH_MORE ? (
				<Loading open={true} msg={'Loading...'} />
			) : (
				<React.Fragment>
					<Typography variant='h5' className={classes.listtitle}>
						Total {dataMsg?.messageList?.items?.length}
					</Typography>

					<InfiniteTable
						items={dataMsg?.messageList?.items}
						onClickRow={handleOnSelectMessage}
						selectedRow={selectedMessage}
						columns={tableHeaders}
						isIconClose={true}
						handleDeleteRow={handleOnDeleteMessage}
						loadingMore={networkStatus === NETWORK_STATUS_FETCH_MORE}
						loadNextPage={loadNextMessagePage}
						hasNextPage={dataMsg?.messageList?.hasNext}
					/>
				</React.Fragment>
			)}

			<DeleteDialog
				open={deleteDialogVisible}
				onClose={() => {
					setDeleteDialogVisible(false)
				}}
				onAgree={handleOnAgreeDeleteMessage}
				onDisagree={() => {
					setDeleteDialogVisible(false)
				}}
			/>
			<ModifyDialog
				open={modifyDialogVisible}
				onClose={() => {
					setModifyDialogVisible(false)
				}}
				valueDefault={valueDefault}
				onAgree={handleOnAgreeModifyMessage}
				onDisagree={() => {
					setModifyDialogVisible(false)
				}}
			/>
		</Box>
	)
}

export default MessageList
