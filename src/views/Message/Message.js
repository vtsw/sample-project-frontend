import React, { useState, useEffect } from 'react'

import { useMutation, useQuery } from '@apollo/react-hooks'

import { Box, Grid, makeStyles } from '@material-ui/core'

import {
	Loading,
	LargeTable,
	DeleteDialog,
	ModifyDialog,
	ActionInputBox,
} from '@views_components'

import { CreateInputBox } from './components'

import {
	MESSAGE_LIST,
	GET_MESSAGE_SEARCH_TEXT,
	SET_MESSAGE_SEARCH_TEXT,
	SET_MESSAGE_CREATE_TEXT,
} from './query'
import { CREATE_MESSAGE, DELETE_MESSAGE, UPDATE_MESSAGE } from './mutation'
import { NETWORK_STATUS_FETCH_MORE } from '@src/configs.local'

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

const Message = () => {
	const classes = useStyle()
	const [contents, setContents] = useState({})

	const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
	const [openConfirmModify, setOpenConfirmModify] = useState(false)

	const [selectedMessage, setSelectedMessage] = useState(false)

	const {
		data: { messageSearchValueOfMessage },
	} = useQuery(GET_MESSAGE_SEARCH_TEXT)

	const { loading, error, data, fetchMore, networkStatus } = useQuery(
		MESSAGE_LIST,
		{
			variables: { query: { limit: 20 } },
			notifyOnNetworkStatusChange: true,
		}
	)

	const [setMessageSearchValueOfMain] = useMutation(SET_MESSAGE_SEARCH_TEXT)
	const [setMessageCreateValueOfMain] = useMutation(SET_MESSAGE_CREATE_TEXT)

	const [createMessage] = useMutation(CREATE_MESSAGE, {
		onCompleted: data => {
			const update = {
				...contents,
				items: [data.createMessage, ...contents.items],
			}
			setContents(update)
		},
		onError: err => {
			alert(err)
		},
	})

	const [deleteMessage] = useMutation(DELETE_MESSAGE, {
		onCompleted: data => {
			const update = {
				...contents,
				items: contents.items.filter(item => item.id !== data.deleteMessage.id),
			}
			setContents(update)
		},
		onError: err => {
			alert(err)
		},
	})

	const [updateMessage] = useMutation(UPDATE_MESSAGE, {
		onCompleted: ({ updateMessage }) => {
			const update = {
				...contents,
				items: contents.items.map(item => {
					if (item.id === updateMessage.id)
						return { ...item, content: updateMessage.content }
					return item
				}),
			}
			setContents(update)
		},
		onError: err => {
			alert(err)
		},
	})

	const handleDeleteMessage = id => {
		deleteMessage({ variables: { id } })
	}

	const handleUpdateMessage = value => {
		updateMessage({
			variables: { message: { id: selectedMessage.id, content: value } },
		})
	}

	const handleCreateMessage = createVal => {
		createMessage({
			variables: { message: { content: createVal } },
		})
		setMessageCreateValueOfMain({ variables: { createValue: '' } })
	}

	const handleSearch = value => {
		setMessageSearchValueOfMain({ variables: { searchValue: value } })
		if (value === messageSearchValueOfMessage) {
			return false
		} else {
			fetchMore({
				variables: {
					query: {
						limit: 20,
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
		}
	}

	const loadNextMessagePage = () => {
		const startFetchTime = Date.now()
		fetchMore({
			variables: {
				query: {
					limit: 10,
					skip: contents.items.length,
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
	}

	useEffect(() => {
		if (data && data.messageList) {
			setContents(data.messageList)
		}
	}, [data])

	if (error) return <p>Error :(</p>

	const columns = [
		{ headerLabel: 'DATE', xs: 5, headerVariable: 'lastModified' },
		{ headerLabel: 'CONTENT', xs: 7, headerVariable: 'content' },
	]

	return (
		<Box className={classes.root}>
			<Loading
				open={loading && networkStatus !== NETWORK_STATUS_FETCH_MORE}
				msg={'Loading...'}
			/>
			<Grid container direction='column' className={classes.container}>
				<Grid item className={classes.item__actionbox}>
					<CreateInputBox width={328} onSubmit={handleCreateMessage} />
				</Grid>
				<div className={classes.divider} />
				<Grid item className={classes.item__actionbox}>
					<ActionInputBox
						width={328}
						placeholder='search...'
						type='search'
						defaultValue={messageSearchValueOfMessage}
						onSubmit={handleSearch}
					/>
				</Grid>
				{contents && contents.items && (
					<LargeTable
						items={contents.items}
						onClickRow={object => {
							setOpenConfirmModify(true)
							setSelectedMessage(object)
						}}
						handleDeleteRow={object => {
							setOpenConfirmDelete(true)
							setSelectedMessage(object)
						}}
						selectedRow={selectedMessage}
						columns={columns}
						loadingMore={networkStatus === NETWORK_STATUS_FETCH_MORE}
						isIconClose={true}
						loadNextPage={loadNextMessagePage}
						hasNextPage={contents.hasNext}
					/>
				)}
			</Grid>

			<DeleteDialog
				open={openConfirmDelete}
				onClose={() => {
					setOpenConfirmDelete(false)
				}}
				onAgree={() => {
					setOpenConfirmDelete(false)
					handleDeleteMessage(selectedMessage.id)
				}}
				onDisagree={() => {
					setOpenConfirmDelete(false)
				}}
			/>
			<ModifyDialog
				open={openConfirmModify}
				onClose={() => {
					setOpenConfirmModify(false)
				}}
				valueDefault={selectedMessage.content}
				onAgree={value => {
					setOpenConfirmModify(false)
					handleUpdateMessage(value)
				}}
				onDisagree={() => {
					setOpenConfirmModify(false)
				}}
			/>
		</Box>
	)
}

export default Message
