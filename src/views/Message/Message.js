import React, { useState } from 'react'

import { useMutation, useQuery } from '@apollo/react-hooks'

import { Box, Grid, makeStyles } from '@material-ui/core'

import {
	Loading,
	InfiniteTable,
	DeleteDialog,
	ModifyDialog,
} from '@views_components'
import { CreateMessageBox, SearchMessageBox } from './components'

import {
	MESSAGE_LIST,
	GET_MESSAGE_SEARCH_TEXT,
	SET_MESSAGE_SEARCH_TEXT,
	SET_MESSAGE_CREATE_TEXT,
} from './gql/query'
import { CREATE_MESSAGE, DELETE_MESSAGE, UPDATE_MESSAGE } from './gql/mutation'
import { useCreateMessage, useDeleteMessage } from './gql/useMutation'

import { NETWORK_STATUS_FETCH_MORE, PAGE_LIMIT } from '@src/configs.local'

const useStyle = makeStyles(theme => ({
	root: {
		width: 'calc(100% - 80px)',
		height: '100vh',
		padding: theme.spacing(3),
		position: 'relative',
	},
	container: {
		border: `1px solid ${theme.palette.common.border}`,
		height: '100%',
	},
	item__actionbox: {
		padding: theme.spacing(2),
	},
	divider: {
		borderTop: `1px solid ${theme.palette.common.border}`,
	},
}))

const tableHeaders = [
	{ headerLabel: 'DATE', xs: 5, headerVariable: 'lastModified' },
	{ headerLabel: 'CONTENT', xs: 7, headerVariable: 'content' },
]

const Message = () => {
	const classes = useStyle()

	const [deleteDialogVisible, setDeleteDialogVisible] = useState(false)
	const [confirmDialogVisible, setConfirmDialogVisible] = useState(false)

	const [selectedMessage, setSelectedMessage] = useState(false)

	const {
		data: { messageSearchValueOfMessage },
	} = useQuery(GET_MESSAGE_SEARCH_TEXT)

	const { loading, error, data, fetchMore, networkStatus } = useQuery(
		MESSAGE_LIST,
		{
			variables: { query: { limit: PAGE_LIMIT } },
			notifyOnNetworkStatusChange: true,
			onError: err => alert(err),
		}
	)

	const [setMessageSearchValueOfMain] = useMutation(SET_MESSAGE_SEARCH_TEXT)
	const [setMessageCreateValueOfMain] = useMutation(SET_MESSAGE_CREATE_TEXT)

	const [createMessage] = useCreateMessage(CREATE_MESSAGE, MESSAGE_LIST, {
		query: { limit: PAGE_LIMIT },
	})

	const [deleteMessage] = useDeleteMessage(DELETE_MESSAGE, MESSAGE_LIST, {
		query: { limit: PAGE_LIMIT },
	})

	const [updateMessage] = useMutation(UPDATE_MESSAGE, {
		onError: err => alert(err),
	})

	const handleCreateMessage = createVal => {
		createMessage({
			variables: { message: { content: createVal } },
		}).then(() =>
			setMessageCreateValueOfMain({ variables: { createValue: '' } })
		)
	}

	const handleSearch = value => {
		setMessageSearchValueOfMain({ variables: { searchValue: value } })
		if (value === messageSearchValueOfMessage) {
			return false
		} else {
			try {
				fetchMore({
					variables: {
						query: {
							limit: PAGE_LIMIT,
							searchText: value,
						},
					},
					updateQuery: (prev, { fetchMoreResult }) => {
						if (!fetchMoreResult) return prev
						const fetchedMessageList = fetchMoreResult.messageList
						let cacheMessageList = prev.messageList
						const hasNext = fetchedMessageList.hasNext

						return {
							messageList: {
								...cacheMessageList,
								items: fetchedMessageList.items,
								hasNext,
							},
						}
					},
				})
			} catch (error) {
				alert(error.message)
			}
		}
	}

	const loadNextMessagePage = () => {
		try {
			fetchMore({
				variables: {
					query: {
						limit: PAGE_LIMIT,
						skip: data.messageList.items.length,
						searchText: messageSearchValueOfMessage,
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
		setConfirmDialogVisible(true)
		setSelectedMessage(message)
	}

	const handleOnDeleteMessage = message => {
		setDeleteDialogVisible(true)
		setSelectedMessage(message)
	}

	const handleOnAgreeDeleteMessage = () => {
		setDeleteDialogVisible(false)
		deleteMessage({ variables: { id: selectedMessage.id } })
	}

	const handleOnAgreeModifyMessage = message => {
		updateMessage({
			variables: { message: { id: selectedMessage.id, content: message } },
		})
	}

	if (error) return <p>Error :(</p>

	return (
		<Box className={classes.root}>
			<Grid container direction='column' className={classes.container}>
				<Grid item className={classes.item__actionbox}>
					<CreateMessageBox
						width={328}
						placeholder='text...'
						onSubmit={handleCreateMessage}
					/>
				</Grid>
				<div className={classes.divider} />
				<Grid item className={classes.item__actionbox}>
					<SearchMessageBox
						width={328}
						placeholder='search...'
						type='search'
						defaultValue={messageSearchValueOfMessage}
						onSubmit={handleSearch}
					/>
				</Grid>

				{loading && networkStatus !== NETWORK_STATUS_FETCH_MORE ? (
					<Loading open={true} msg={'Loading...'} />
				) : (
					<InfiniteTable
						items={data.messageList.items}
						onClickRow={handleOnSelectMessage}
						handleDeleteRow={handleOnDeleteMessage}
						selectedRow={selectedMessage}
						columns={tableHeaders}
						loadingMore={networkStatus === NETWORK_STATUS_FETCH_MORE}
						isIconClose={true}
						loadNextPage={loadNextMessagePage}
						hasNextPage={data.messageList.hasNext}
					/>
				)}
			</Grid>

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
				open={confirmDialogVisible}
				onClose={() => {
					setConfirmDialogVisible(false)
				}}
				valueDefault={selectedMessage.content}
				onAgree={handleOnAgreeModifyMessage}
				onDisagree={() => {
					setConfirmDialogVisible(false)
				}}
			/>
		</Box>
	)
}

export default Message
